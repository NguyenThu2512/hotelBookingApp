import { FormProvider, useForm } from "react-hook-form";
import DetailHotelSection from "./DetailHotelSection";
import HotelTypeSection from "./HotelTypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";
import ImageSection from "./ImageSection";
import { HotelType } from "../../../backend/src/models/hotel";
import { useEffect } from "react";

export type HotelFormData={
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number; 
    childCount: number;
    facilities:string[];
    pricePerNight: number;
    starRating: number;
    imageFiles: FileList;
    imageUrls: string[];
}

 type Props={
    onSave: (formData: FormData)=>void;
    isLoading: boolean;
    hotel:HotelType;
}
const ManageHotelForm = ({onSave, isLoading, hotel}:Props) => {
    const formMethods= useForm<HotelFormData>();
    const {handleSubmit, reset} = formMethods;
    useEffect(()=>{
        reset(hotel);
    }, [hotel, reset])

    const onSubmit= handleSubmit((formDataJson: HotelFormData)=>{
        console.log("check data:", formDataJson)
        const formData= new FormData();
        if(hotel){
            formData.append("hotelId", hotel._id)
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country)
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());
        
        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((image, index)=>{
                formData.append(`imageUrls[${index}]`, image)
            })
        }
        

        formDataJson.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`, facility)
        })
        Array.from(formDataJson.imageFiles).forEach((imageFile)=>{
            formData.append(`imageFiles`, imageFile)
        })
        onSave(formData)
        console.log("form data", formData);
        
    })
  return (
    <FormProvider {...formMethods}>
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <DetailHotelSection/>
            <HotelTypeSection/>
            <FacilitiesSection/>
            <GuestSection/>
            <ImageSection/>
            <span className="flex justify-end">
                <button type="submit" disabled={isLoading} className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    {isLoading ? "Saving...":"Save"}
                </button>
            </span>
        </form>
    </FormProvider>
  )
}

export default ManageHotelForm
