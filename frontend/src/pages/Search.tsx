import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from '../api-client'
import { useState } from "react";
import SearchResultCards from "../components/SearchResultCards";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
    const search= useSearchContext();
    console.log({search})
    const [page, setPage]= useState<number>(1)
    const [selectedStar, setSelectedStar]= useState<string[]>([])
    const [selectedHotelType, setSelectedHotelType]= useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities]= useState<string[]>([]);
    const [selectedPrice, setSelectedPrice]= useState<number | undefined>();
    const [sortOption, setSortOption]= useState<string>("")
    const searchParams={
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStar,
        facilities: selectedFacilities,
        types: selectedHotelType,
        maxPrice: selectedPrice?.toString(),
        sortOption: sortOption
    }
    // load data
    const {data: hotelData, refetch}= useQuery(["fetchHotelData", searchParams],()=>
    apiClient.SearchHotel(searchParams) )
    
    // Lưu ý: phần ["fetchHotelData", searchParams], nó sẽ tự động refresh data khi option thay đổi, nếu làm như thường just "fetchHotelData" thì sẽ k tự động refresh
    
    const handleStarChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating= event.target.value;
        setSelectedStar((prevStar)=>
        event.target.checked?[...prevStar, starRating]: prevStar.filter((star)=> star!== starRating))
    }
    const handleHotelTypeChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const hotelType= event.target.value;
        setSelectedHotelType((prevHotelType)=>event.target.checked?[...prevHotelType, hotelType]:
        prevHotelType.filter((type)=>type!==hotelType))
    }
    const handleFacilitiesChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const hotelFacility= event.target.value;
        setSelectedFacilities((prevFacilities)=>event.target.checked?[...prevFacilities, hotelFacility]:
        prevFacilities.filter((facility)=>facility!==hotelFacility))
    }
    const handlePriceChange=(value: number | undefined) => {
        setSelectedPrice(value)
    }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
            <div className="space-y-5">
                <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                    Filter by:
                </h3>
                <StarRatingFilter selectedStars={selectedStar} onChange={handleStarChange}/>
                <HotelTypeFilter selectedHotelType={selectedHotelType} onChange={handleHotelTypeChange}/>
                <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilitiesChange}/>
                <PriceFilter selectedPrice={selectedPrice} onChange={handlePriceChange}/>
            </div>
        </div>
        <div className="flex flex-col gap-5 ">
            <div className="flex justify-between items-center ">
                <span className="text-xl font-bold">
                   {hotelData?.pagination.total} Hotels found
                   {search.destination ? ` in ${search.destination}` : ""}
                </span>
                <span>
                    <select className="border rounded-md p-2" value={sortOption} onChange={(event)=> setSortOption(event.target.value)}>
                        <option value="">Sort By</option>
                        <option value="starRating">Star Rating</option>
                        <option value="pricePerNightAsc">Price Per Night ( love to high)</option>
                        <option value="pricePerNightDes">Price Per Night (high to low)</option>
                    </select>
                </span>
            </div>
            {hotelData?.data.map((hotel)=>(
                <SearchResultCards hotel={hotel}/>
            ))}
            <div>
                <Pagination page={hotelData?.pagination.page} pages={hotelData?.pagination.pages} onPageChange={(page)=>setPage(page || 1)} refetch={refetch}/>
            </div>

        </div>
    </div>
  )
}

export default Search
 