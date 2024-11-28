import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

import ConnectDb from "./config/mongoose.js";
import ConnectCloudinary from "./config/cloudniry.js";
import adminRouter from "./routes/adminRoutes.js";
import dotenv from 'dotenv';
import UserRouter from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
ConnectDb()
ConnectCloudinary()
// Sample response array (for example purposes)
const responseArray = [
    { id: 1, name: 'Maldives', description: 'Beautiful tropical paradise' },
    { id: 2, name: 'Bali', description: 'Island of Gods with stunning beaches' },
    { id: 3, name: 'Paris', description: 'City of Love and Lights' }
];

// Middleware
app.use(express.json());
app.use(cors({
    origin: ['https://traveling-t9qf.vercel.app'], // Replace with your frontend URL if different
    methods: ['GET', 'POST','PUT', 'DELETE'],
    credentials: true
}));

// Endpoint to get the response array
app.get('/', (req, res) => {
    res.json(responseArray);
});


//endpoints for admin routs to add places
app.use('/api/admin',adminRouter)
app.use('/api/user',UserRouter)




// Start the server
app.listen(port, () => console.log(`Server running on port ${port}`));
