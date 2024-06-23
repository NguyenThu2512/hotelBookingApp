import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import React from "react";

const ImageSection = () => {
    const {register, formState: {errors}, watch, setValue} = useFormContext<HotelFormData>();
    const existingImageUrls= watch("imageUrls")

    const handleDeleteImage=(event:React.MouseEvent<HTMLButtonElement, MouseEvent>, imageUrl:string)=>{
      event.preventDefault();
      setValue("imageUrls",existingImageUrls.filter(img=>img!==imageUrl) )
      
    }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <div className="grid grid-cols-6 gap-4  ">
            {existingImageUrls && existingImageUrls.map((image, index)=>(
              <div className="relative">
                <img src={image} alt="hotel image" className="min-h-28  object-cover  " />
                <button onClick={(event)=>handleDeleteImage(event,image)} className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-gray-300 opacity-0 hover:opacity-100">Delete</button>
              </div>
            ))}
            
          </div>
        
        <input type="file" multiple accept="image/*" 
        className="w-full text-gray-700 font-normal"
        {...register("imageFiles", {
            validate: (imageFiles) =>{
                const totalLength= imageFiles.length + (existingImageUrls?.length || 0);
                if(totalLength===0){
                    return "At least one image should be added"
                }
                if(totalLength>6){
                    return "Total number of images cannot be more than 6"
                }
            }
        })}/>

      </div>
      {errors.imageFiles &&(
        <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
      ) }
    </div>
  )
}

export default ImageSection
