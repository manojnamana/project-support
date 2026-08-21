import apiClient from "./apiClient";

export const DeleteCase = async (caseId: string, pin: string) => {
  try {
    const response = await apiClient.delete(`/cases/${caseId}/delete/`,{data: {
        case_pin: pin
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};  