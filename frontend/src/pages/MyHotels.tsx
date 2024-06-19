import { useQuery } from "react-query"
import { Link } from "react-router-dom"
import * as apiClient from '../api-client'
import { BsMap } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import { BiMoney } from "react-icons/bi";
import { BiHotel } from "react-icons/bi";
import { BiStar } from "react-icons/bi";

const MyHotels = () => {
    const {data: hotelData}= useQuery("fetchHotelData", apiClient.fetchHotelsData, {
        onError: ()=>{

        }
    })
    if(!hotelData){
        return <span>No Hotels found</span>
    }
  return (
    <div className="space-y-5">
        <span className="flex justify-between">
            <h1 className="font-bold text-3xl">My Hotels</h1>
            <Link to="/add-hotel" 
                className="flex px-3 py-1 bg-blue-600 text-white text-xl font-bold hover:bg-blue-500">
                Add Hotel
            </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
            {hotelData.map((hotel, index)=>(
                <div key={index} className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 ">
                    <h2 className="text-2xl font-bold">{hotel.name}</h2>
                    <div className="whitespace=pre-line">{hotel.description}</div>
                    <div className="grid grid-cols-5 gap-2">
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsMap /> &nbsp;
                            {hotel.city}, {hotel.country}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BsBuilding /> &nbsp;
                            {hotel.type}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiMoney /> &nbsp;
                            {hotel.pricePerNight}
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiHotel /> &nbsp;
                            {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                            <BiStar /> &nbsp;
                            {hotel.starRating} Star Rating
                        </div>
                    </div>
                    <span className="flex justify-end">
                        <Link to={`/edit-hotel/${hotel._id}`} className="flex px-3 py-1 bg-blue-600 text-white  hover:bg-blue-500">View Details</Link>
                    </span>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyHotels
