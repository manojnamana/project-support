import axios from "axios";
import type { StaffLoginResponse, StaffUser } from "@/types/types";

export const AUTH_COOKIE = "auth_token";
export const REFRESH_COOKIE = "refresh_token";
const USER_STORAGE_KEY = "staff_user";

/** Access token lifetime: 60 minutes (matches backend). */
export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60;
/** Refresh token lifetime: 7 days. */
export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;
/** Refresh a minute before access token expiry. */
const ACCESS_EXPIRY_BUFFER_MS = 60 * 1000;

function getApiBase() {
  return (
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    ""
  ).replace(/\/$/, "");
}

export const loginStaffFun = async (
  email: string,
  password: string
): Promise<StaffLoginResponse> => {
  try {
    const response = await axios.post(`${getApiBase()}/staff/login/`, {
      email,
      password,
    });
    return response.data as StaffLoginResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const registerStaffFun = async (payload: unknown) => {
  try {
    const response = await axios.post(
      `${getApiBase()}/accounts/register/`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** Pull the access token from the staff login / refresh response. */
export function extractAuthToken(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;

  const tokens =
    body.tokens && typeof body.tokens === "object"
      ? (body.tokens as Record<string, unknown>)
      : null;

  const nested =
    body.data && typeof body.data === "object"
      ? (body.data as Record<string, unknown>)
      : null;

  const nestedTokens =
    nested?.tokens && typeof nested.tokens === "object"
      ? (nested.tokens as Record<string, unknown>)
      : null;

  const candidates = [
    tokens?.access,
    body.access,
    body.token,
    body.access_token,
    nestedTokens?.access,
    nested?.access,
    nested?.token,
    nested?.access_token,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export function extractRefreshToken(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;
  const tokens =
    body.tokens && typeof body.tokens === "object"
      ? (body.tokens as Record<string, unknown>)
      : null;

  const candidates = [tokens?.refresh, body.refresh];
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

export function extractStaffUser(payload: unknown): StaffUser | null {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;
  const user = body.user;
  if (!user || typeof user !== "object") return null;
  return user as StaffUser;
}

function setCookie(name: string, value: string, maxAgeSeconds: number) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function setAuthCookie(token: string) {
  setCookie(AUTH_COOKIE, token, ACCESS_TOKEN_MAX_AGE_SECONDS);
}

export function setRefreshCookie(token: string) {
  setCookie(REFRESH_COOKIE, token, REFRESH_TOKEN_MAX_AGE_SECONDS);
}

export function clearAuthCookie() {
  clearCookie(AUTH_COOKIE);
  clearCookie(REFRESH_COOKIE);
}

/** Persist tokens + user from a successful staff login response. */
export function saveAuthSession(response: StaffLoginResponse): boolean {
  const access = extractAuthToken(response);
  const refresh = extractRefreshToken(response);
  const user = extractStaffUser(response);

  if (!access || !user) return false;

  setAuthCookie(access);
  if (refresh) setRefreshCookie(refresh);

  if (typeof window !== "undefined") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }
  return true;
}

export function getStaffUser(): StaffUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StaffUser;
  } catch {
    return null;
  }
}

export function getStaffDisplayName(user: StaffUser | null): string {
  if (!user) return "Staff";
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
  return name || user.email || "Staff";
}

/** Clear cookies + stored user profile. */
export function clearAuthSession() {
  clearAuthCookie();
  if (typeof window !== "undefined") {
    localStorage.removeItem(USER_STORAGE_KEY);
  }
}

/** Read the staff access token from the auth cookie (client-side). */
export function getStaffAccessToken(): string | null {
  return readCookie(AUTH_COOKIE);
}

export function getStaffRefreshToken(): string | null {
  return readCookie(REFRESH_COOKIE);
}

function decodeJwtExpMs(token: string): number | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "="
    );
    const json = JSON.parse(atob(padded)) as { exp?: number };
    return typeof json.exp === "number" ? json.exp * 1000 : null;
  } catch {
    return null;
  }
}

/** True when access token is missing or within the expiry buffer. */
export function isAccessTokenExpired(
  token: string | null,
  bufferMs = ACCESS_EXPIRY_BUFFER_MS
): boolean {
  if (!token) return true;
  const expMs = decodeJwtExpMs(token);
  // Non-JWT tokens (e.g. demo) — treat as valid until cookie clears.
  if (expMs == null) return false;
  return Date.now() >= expMs - bufferMs;
}

let refreshInFlight: Promise<string | null> | null = null;

/**
 * Exchange the refresh token for a new access token.
 * Uses SimpleJWT-style `POST /token/refresh/` with `{ refresh }`.
 */
export async function refreshAccessToken(): Promise<string | null> {
  const refresh = getStaffRefreshToken();
  if (!refresh) return null;

  try {
    const response = await axios.post(`${getApiBase()}/token/refresh/`, {
      refresh,
    });
    const access = extractAuthToken(response.data);
    const nextRefresh = extractRefreshToken(response.data);

    if (!access) return null;

    setAuthCookie(access);
    if (nextRefresh) setRefreshCookie(nextRefresh);
    return access;
  } catch (error) {
    console.error(error);
    clearAuthSession();
    return null;
  }
}

/**
 * Return a usable access token, refreshing with the refresh token when expired.
 * Concurrent callers share one in-flight refresh request.
 */
export async function getValidAccessToken(): Promise<string | null> {
  const access = getStaffAccessToken();
  if (access && !isAccessTokenExpired(access)) return access;

  if (!getStaffRefreshToken()) return null;

  if (!refreshInFlight) {
    refreshInFlight = refreshAccessToken().finally(() => {
      refreshInFlight = null;
    });
  }

  return refreshInFlight;
}
