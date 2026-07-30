import axios from "axios";
import type { CreateCasePayload } from "@/types/types";

export const CreateCase = async (caseData: CreateCasePayload) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/create/cases/`,
      caseData
    );
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
