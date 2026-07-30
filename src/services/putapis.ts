import apiClient from "./apiClient";

export const UpdateCaseStatus = async (
  caseNumber: string,
  status: string,
  remarks: string
) => {
  try {
    const response = await apiClient.patch(`/cases/${caseNumber}/status/`, {
      status,
      remarks,
    });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
