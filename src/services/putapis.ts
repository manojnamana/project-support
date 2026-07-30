import axios from "axios";
import { getStaffAccessToken } from "./auth";

export const UpdateCaseStatus = async (
  caseNumber: string,
  status: string,
  remarks: string
) => {
  try {
    const token = getStaffAccessToken();
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/cases/${caseNumber}/status/`,
      { status, remarks },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
