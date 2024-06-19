import { useMutation } from "react-query";
import ManageHotelForm, { HotelFormData } from "../form/ManageHotelForm"
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";


const AddHotel = () => {
    const {showToast} = useAppContext()
    const {mutate, isLoading}=useMutation(apiClient.addHotel, {
        onSuccess:()=>{
            showToast({message:"Add Hotel successfully", type:"SUCCESS"})
        },
        onError:(error: Error)=>{
            showToast({message:error.message, type:"ERROR"})
        }

    })
    const handleAddHotel=(hotelFormData:FormData)=>{
        mutate(hotelFormData)
    }

  return (
    <div>
        <ManageHotelForm onSave={handleAddHotel} isLoading={isLoading}/>
      
    </div>
  )
}

export default AddHotel;
