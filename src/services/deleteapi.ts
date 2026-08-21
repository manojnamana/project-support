import axios from "axios";
import apiClient from "./apiClient";

export const DeleteCase = async (caseId: string, pin: string) => {
  try {
    const response = await apiClient.delete(`/cases/${caseId}/delete/`, {
      data: { case_pin: pin },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const DeletePublicCase = async (caseId: string, pin: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cases/${caseId}/delete/`,
      { data: { case_pin: pin } }
    );
    return response;
  } catch (error) {
    return error;
  }
};
