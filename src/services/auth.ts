import axios from "axios";
import type { StaffLoginResponse, StaffUser } from "@/types/types";

export const AUTH_COOKIE = "auth_token";
const REFRESH_COOKIE = "refresh_token";
const USER_STORAGE_KEY = "staff_user";
const AUTH_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

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

/** Pull the access token from the staff login response (`tokens.access`). */
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
  const value = tokens?.refresh;
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export function extractStaffUser(payload: unknown): StaffUser | null {
  if (!payload || typeof payload !== "object") return null;
  const body = payload as Record<string, unknown>;
  const user = body.user;
  if (!user || typeof user !== "object") return null;
  return user as StaffUser;
}

function setCookie(name: string, value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${AUTH_MAX_AGE_SECONDS}; SameSite=Lax`;
}

function clearCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

export function setAuthCookie(token: string) {
  setCookie(AUTH_COOKIE, token);
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
  if (refresh) setCookie(REFRESH_COOKIE, refresh);

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
