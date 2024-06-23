import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client'
import ManageHotelForm from "../form/ManageHotelForm";

const EditHotel = () => {
    const {hotelId}= useParams();
    const {data: hotelData}= useQuery("fetchHotelById",()=>apiClient.fetchHotelDataById(hotelId || ""), {
        enabled: !!hotelId, 
        // if hotelId null or undefined, the query will not done
    } )
    const {mutate, isLoading} = useMutation(apiClient.updateHotelData, {
      onSuccess:()=>{},
      onError:()=>{},
    })
    const handleSave=(hotelFormData: FormData) => {
      mutate(hotelFormData)
    }
  return (
    <div>
      <ManageHotelForm hotel={hotelData} onSave={handleSave} isLoading={isLoading}/>
    </div>
  )
}

export default EditHotel
