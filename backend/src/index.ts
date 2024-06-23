import express, {Request, Response} from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser'
import path from 'path';
import {v2 as cloudinary} from 'cloudinary';
import myHotelsRoutes from './routes/my-hotels'
import hotelsRoutes from './routes/hotels'
import myBookingsRoutes from './routes/my-bookings'
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>
    console.log("Connected to MongoDB,", process.env.MONGODB_CONNECTION_STRING)
)

const app= express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,

}));

app.use("/api/users",userRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/my-hotels", myHotelsRoutes)
app.use('/api/hotels', hotelsRoutes)
app.use('/api/my-bookings', myBookingsRoutes)


app.listen(7000, ()=>{
    console.log("Server running on localhost: 7000")
})