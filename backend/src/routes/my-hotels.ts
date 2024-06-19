import { validateToken } from './../../../frontend/src/api-client';
import express, {Response, Request} from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router= express.Router();
// const storage= multer.memoryStorage();
// const upload=multer({
//     storage: storage,
//     limits:{
//         fileSize: 5*1024*1024 //5Mb
//     }
// })
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 510241024 } }); // 5Mb


router.post('/',verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities is required")
]  ,upload.array("imageFiles",6  ) ,async(req: Request, res: Response) => {
try {
    const imageFiles= req.files as Express.Multer.File[] || undefined;
    console.log({imageFiles})
    const newHotel:HotelType= req.body;

     // upload the images to Cloudinary
    if (imageFiles && imageFiles.length > 0) { 
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            const dataURI = "data:" + image.mimetype + ";base64," + b64;
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURI);
            return cloudinaryResponse.url;
        });

        const imageUrls = await Promise.all(uploadPromises);
        const newHotel = { ...req.body, imageUrls }; // 

        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

          // save the new hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();
        // return a 201 status
        res.status(201).send(hotel);
    } else {
        console.log("No images uploaded for hotel.");
    }
} catch (error) {
    console.log("Error creating hotel: ", error)
    res.status(500).json({message: "Something went wrong"})
}
})
router.get('/', verifyToken, async(req: Request, res: Response) => {
    try {
        const hotels= await Hotel.find({userId: req.userId});
        if(hotels){
            return res.status(201).json(hotels)
        }else{
            return res.status(200).json({message:"No hotel found!"})
        }
    } catch (error) {
        console.log("Error in fetching hotel: ", error);
        res.status(500).json({message: "Something went wrong"})
    }
})

router.get('/:id',verifyToken, async(req:Request, res:Response) => {
    try {
        const hotelId= req.params.id.toString();
        const hotel= await Hotel.findOne({_id: hotelId, userId: req.userId});
        if(hotel) {
            return res.status(201).json(hotel);
        }else{
            return res.status(200).json({message:"No hotel found"})
        }
    } catch (error) {
        console.log("Error in fetching hotel by Id: ", error);
        res.status(500).json({message: "Something went wrong"})
    }

})

router.put('/:hotelId', verifyToken, upload.array("imageFiles"), async (req: Request, res: Response) => {
    try {
        const hotelId= req.params.hotelId.toString();
        const updatedHotelData: HotelType= req.body
        const hotel= await Hotel.findOneAndUpdate({
            _id: hotelId, userId: req.userId
        },updatedHotelData, {
            new:true
        } )
        if(hotel){
            hotel.lastUpdated= new Date();
            const imageFiles= req.files as Express.Multer.File[]
            if(!imageFiles){
                hotel.imageUrls= [...(updatedHotelData.imageUrls || [])];
            }
            const uploadPromises = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64");
                const dataURI = "data:" + image.mimetype + ";base64," + b64;
                const cloudinaryResponse = await cloudinary.v2.uploader.upload(dataURI);
                return cloudinaryResponse.url;
            });
            const imageUrls = await Promise.all(uploadPromises);   
            const updatedImage= [...imageUrls,...(updatedHotelData.imageUrls || [])]
            hotel.imageUrls= updatedImage;
            await hotel.save();
            return res.status(200).json(hotel)
        }else{
            return res.status(404).json({message:"Fail updating data!"})
        }

    } catch (error) {
        console.log("Error in updating hotel data:", error);
        res.status(500).json({message: "Something went wrong"})
    }
})

export default router;