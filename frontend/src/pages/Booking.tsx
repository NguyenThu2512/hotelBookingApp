import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import BookingForm from "../form/BookingForm";

const Booking = () => {
//   const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
        const nights =Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
            (1000 * 60 * 60 * 24);
        const nightFormat= Math.ceil(nights)
        setNumberOfNights(nightFormat);

        const pricePerNight= hotel?.pricePerNight || 1;
        const tCost= nightFormat * pricePerNight;
        setTotalCost(tCost);
    }
  }, [search.checkIn, search.checkOut, hotel]);

 

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr]">
      <BookingDetailsSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser &&  (
        <BookingForm currentUser={currentUser} totalCost={totalCost}/>
      )}
    </div>
  );
};

export default Booking;
