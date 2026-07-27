import axios from "axios";

export const GetPublicSchools = async ()=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/schools`);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const GetPublicConcerns= async ()=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/concerns`);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}

export const GetQuestionsBasedOnConcern = async (concern: string)=>{
    try{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/public/concern/${concern}/questions`);
        return response.data;
    }
    catch(error){
        console.log(error);
        return error;
    }
}