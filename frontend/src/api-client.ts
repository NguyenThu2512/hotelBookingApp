import { HotelType } from './../../backend/src/models/hotel';
import { HotelFormData } from "./form/ManageHotelForm";
import { SignInFormData } from "./pages/Login";
import { RegisterFormData } from "./pages/Register";
import {HotelSearchResponse} from './../../backend/src/routes/hotels'

const API_BASE_URL= import.meta.env.VITE_API_BASE_URL;

export const register=async(formData: RegisterFormData)=>{
    const response= await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: "include",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
    })
    const result= await response.json();
    if(result.error){
        throw new Error(result.error)
    }
}

export const validateToken= async()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        method: 'GET',
        credentials: "include",
        headers: {"Content-Type": "application/json",}
    })
    console.log("token:",response)
    if(!response.ok){
        throw new Error("token not valid")
    }
    return response.json()
    // if(result.error){
    //     throw new Error(result.error)
    // }
    // return result;
}
export const signIn=async(formData: SignInFormData)=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/login`, {
        method:"POST",
        credentials:"include",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(formData)
    })
    const result= await response.json();
    console.log("result of sign in", result)

    if(result.error){
        throw new Error(result.error)
    }
    return result;
}

export const logOut=async()=>{
    const response= await fetch(`${API_BASE_URL}/api/auth/log-out`,{
        method:"POST",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Something wrong in sign out!")
    }
    const result= await response.json();
    return result;
}

export const addHotel= async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: 'POST',
        credentials:'include',
        body: hotelFormData,
    })
    console.log("response of addHotel",response)
    if(!response.ok){
        throw new Error("Something went wrong in add hotel")
    }
    const result= await response.json()
    return result;
}

export const fetchHotelsData=async():Promise<HotelType[]>=>{
    const response= await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Something went wrong in getting Hotel Data")
    }
    const result= await response.json();
    return result;
}

export const fetchHotelDataById=async(hotelId:string)=>{
    const response= await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Something went wrong in getting detail data of hotel")
    }
    const result = await response.json();
    return result;

}
export const updateHotelData= async(hotelFormData: FormData)=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        body: hotelFormData,
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Fail in updating hotel")
    }
    const result = await response.json();
    return result;
}

type searchParams={
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?:string;
    facilities?: string[];
    types?: string[];
    stars?: string[];
    maxPrice?: string;
    sortOption?: string;
}
 export const SearchHotel=async(searchParams:searchParams): Promise<HotelSearchResponse>=>{
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOption", searchParams.sortOption || "");

    searchParams.facilities?.forEach((facility) =>
        queryParams.append("facilities", facility)
    );
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));


    const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);
    if(!response.ok){
        throw new Error("Fail getting hotel data")
    }
    return response.json();
 }