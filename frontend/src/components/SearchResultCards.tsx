import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/models/hotel"
import { AiFillStar } from "react-icons/ai";

type Props={
    hotel: HotelType
}
const SearchResultCards = ({hotel}:Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 ">
        <div className="w-full h-[300px]">
            <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" />
        </div>
        <div className="grid grid-rows-[1fr_2fr_1fr] gap-2 p-5">
            <div>
                <div className="flex items-center">
                    <span className="flex">
                        {Array.from({length:hotel.starRating}).map(()=>(
                           <span className="text-yellow-400 mr-2" > <AiFillStar /></span>
                        ))}
                    </span>
                    <span className="ml-1 text-sm">{hotel.type}</span>
                </div>
                <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">{hotel.name}</Link>
            </div>
            <div className="">
                <div className="line-clamp-4">
                    {hotel.description}
                </div>
            </div>
            <div className="grid grid-cols-2 items-end whitespace-nowrap">
                <div className="flex gap-1 items-center">
                    {hotel.facilities.slice(0,3).map((facility)=>(
                        <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                            {facility}
                        </span>
                    ))}
                    <span className="text-sm">
                        {hotel.facilities.length>3 && `+${hotel.facilities.length-3} more`}
                    </span>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <span className="font-bold">
                        ${hotel.pricePerNight} per night
                    </span>
                    <Link to={`/detail/${hotel._id}`} className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-400">View more</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SearchResultCards
