import express, {Request, Response} from 'express';
import Hotel, { BookingType, HotelType } from '../models/hotel';
import { param, validationResult } from 'express-validator';
import verifyToken from '../middleware/auth';

const router= express.Router();

export type HotelSearchResponse={
    data:HotelType[];
    pagination:{
        total: number;
        page: number;
        pages:number;
    }
}

router.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error fetching hotels" });
  }
});

router.get('/search', async(req:Request, res:Response) => {
    try {
        const query = constructSearchQuery(req.query);

        let sortOptions = {};
        switch (req.query.sortOption) {
            case "starRating":
                sortOptions = { starRating: -1 };
                break;
            case "pricePerNightAsc":
                sortOptions = { pricePerNight: 1 };
                break;
            case "pricePerNightDesc":
                sortOptions = { pricePerNight: -1 };
                break;
        }
        const pageSize=5;
        const pageNumber= parseInt(req.query.page? req.query.page.toString() : "1")
        const skip = (pageNumber-1)*pageSize; //ví dụ total là 20:  0-4; 5-9; 10-14; 15-19
        const hotels= await Hotel.find(query).sort(sortOptions).skip(skip).limit(pageSize);
        const total= await Hotel.countDocuments(query);
        const response:HotelSearchResponse={
            data: hotels,
            pagination:{
                total,
                page: pageNumber,
                pages: Math.ceil(total/pageSize),
            }
        };
        res.json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Something went wrong"})
    }
})


router.get("/:id",
  [param("id").notEmpty().withMessage("Hotel ID is required")], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.params.id.toString();

    try {
      const hotel = await Hotel.findById(id);
      res.json(hotel);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error fetching hotel" });
    }
  }
);
router.post("/:hotelId/bookings", verifyToken, async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId
  const bookingData= req.body
  try {
    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId,
    };
    console.log(newBooking);

    const hotel = await Hotel.findOneAndUpdate(
      { _id:hotelId },
      {
        $push: { bookings: newBooking },
      }
    );

    if (!hotel) {
      return res.status(400).json({ message: "hotel not found" });
    }

    await hotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});



const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };

export default router;

