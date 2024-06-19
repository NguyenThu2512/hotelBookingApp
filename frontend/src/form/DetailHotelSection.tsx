import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailHotelSection = () => {
    const {register,formState: {errors} } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-3">
            Add Hotel
        </h1>
        <div className="flex-1">
            <label  className="font-semibold text-gray-700 text-sm">
                <span  className="">Name</span>
            </label>
            <input type="text" className="w-full px-2 py-2 border" {...register("name", {required: "This field is required"})} />
            {errors.name && (
                <span className='text-red-500'>{errors.name.message}</span>
            )}
        </div>
        <div className="flex gap-4">
            <div>
                <label  className="font-semibold text-gray-700 text-sm">
                    <span  className="">City</span>
                </label>
                <input type="text" className="w-full px-2 py-2 border" {...register("city", {required: "This field is required"})} />
                {errors.city && (
                    <span className='text-red-500'>{errors.city.message}</span>
                )}
            </div>
            <div>
                <label  className="font-semibold text-gray-700 text-sm">
                    <span  className="">Country</span>
                </label>
                <input type="text" className="w-full px-2 py-2 border" {...register("country", {required: "This field is required"})} />
                {errors.country && (
                    <span className='text-red-500'>{errors.country.message}</span>
                )}
            </div>
        </div>
        <div>
            <label  className="font-semibold text-gray-700 text-sm">
                <span  className="">Description</span>
            </label>
            <textarea rows={5} className="w-full px-2 py-2 border" {...register("description", {required: "This field is required"})} />
            {errors.description && (
                <span className='text-red-500'>{errors.description.message}</span>
            )}
        </div>
        <div className="">
            <label  className="font-semibold text-gray-700 text-sm">
                <span  className="">Price Per Night</span>
            </label>
            <input type="number" min={1} className="w-full px-2 py-2 border" {...register("pricePerNight", {required: "This field is required"})} />
            {errors.pricePerNight && (
                <span className='text-red-500'>{errors.pricePerNight.message}</span>
            )}
        </div>
        <div className="">
            <label  className="font-semibold text-gray-700 text-sm">
                <span  className="">Star Rating</span>
            </label>
            <select className="w-full px-2 py-2 border" {...register("starRating", {required: "This field is required"})} >
                <option value="" className="text-sm font-bold">Select as Rating</option>
                {
                    [1,2,3,4,5].map((num)=>(
                        <option value={num}>{num}</option>
                    ))
                }
            </select>
            {errors.starRating && (
                <span className='text-red-500'>{errors.starRating.message}</span>
            )}
        </div>

      
    </div>
  )
}

export default DetailHotelSection
