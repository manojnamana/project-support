import axios from "axios";

    export const loginStaffFun = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/staff/login/`, { email, password });
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    export const registerStaffFun = async (payload: any) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/accounts/register/`, payload);
            return response.data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }