import { RegisterFormData } from "./pages/Register";


const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

export const register=async(formData: RegisterFormData)=>{
    const response= await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
    const result= await response.json();
    console.log("mutata:", {result});
    if(result.error){
        throw new Error(result.error)
    }
}

export const validateToken= async()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials:"include"
    })
    const result= await response.json();
    if(result.error){
        throw new Error(result.error)
    }
    console.log({result});
    return result;


}