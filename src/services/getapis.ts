import axios from "axios";
import { getStaffAccessToken } from "./auth";

export const GetPublicSchools = async ()=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/schools`);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const GetPublicConcerns= async ()=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/concerns`);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const GetQuestionsBasedOnConcern = async (concern: string)=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/concerns/${concern}/questions`);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
}


export const GetCaseStatus = async (caseNumber: string,pin: string)=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cases/status/?case_number=${caseNumber}&pin=${pin}`);
        return response;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const GetDashboardData = async (
  status: string,
  severity: string,
  page: number,
  search: string
) => {
  try {
    const token = getStaffAccessToken();
    const params = new URLSearchParams({
      status: status === "all" ? "" : status,
      severity: severity === "all" ? "" : severity,
      page: String(page),
      search: search.trim(),
    });
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/?${params.toString()}`,
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