import validator from "validator";
import bycrpt from 'bcrypt'
import User from "../models/User.Models.js";
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { v2 as cloudinary } from "cloudinary";
import { text } from "express";
import mongoose from "mongoose";
import Place from "../models/Places.Models.js";
import BookingModel from "../models/Booking.Models.js";
const confirmationCodes = new Map();
const codeSendLimits = new Map();
const CreateUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            console.log('please Fill Up All the fields');
            res.json({ success: false, message: 'please Fill Up All the fields' })
        }
        //email validation
        if (!validator.isEmail(email)) {
            console.log('Please Enter a valid email adress');
            res.json({ success: false, message: 'Please Enter a valid email adress' })
        }
        if (password.length < 8) {
            console.log('Password length must be 8 characters');
            res.json({ success: false, message: 'Password length must be 8 characters' })
        }

        //here after all validations now we need to encrpt our password to save in db
        const salt = await bycrpt.genSalt(10)
        const hashPassword = await bycrpt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashPassword
        }
        const user = new User(userData)
        const newUser = await user.save()
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_kEY, { expiresIn: '1d' })
        console.log('User Created Successfully', { token, userData });
        return res.json({ success: true, message: { token, userData }, token })

    }
    catch (error) {
        console.log("Error in Creating User", error);
        return res.json({ success: false, message: 'User already exists With this Email' })
    }
}
const LoginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            console.log("User Not Found With This Email");
            return res.json({ success: false, message: 'User Not Found With This Email' })
        }
        const passwordMatched = await bycrpt.compare(password, user.password)
        if (passwordMatched) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_kEY)
            console.log('login successfully', token);
            return res.json({ success: true, token })
        }
        else {
            console.log('Login Failed Invalid credentials');
            return res.json({ success: false, message: 'Invalid credentials' })
        }

    }
    catch (error) {
        console.log('Error in User Login', error);
        return res.json({ success: false, message: `Error in Login User ${error}` })
    }
}
const SendConfirmationCode = async (req, res, next) => {

    try {
        const { email } = req.body
        if (!email) {
            return res.json({ success: false, message: "Valid Email is Required to send confirmation code" })
        }
        // Check if the email has exceeded the send limit
        if (codeSendLimits.has(email)) {
            const { sentCount, lastSentTime } = codeSendLimits.get(email);
            const currentTime = Date.now();

            // Check if it's been less than 1 hour since the last send
            if (sentCount >= 2 && (currentTime - lastSentTime) < 60 * 60 * 1000) {
                const remainingTime = currentTime - lastSentTime; // Time difference in milliseconds

                const minutesLeft = Math.floor(remainingTime / (60 * 1000));

                console.log(60 - minutesLeft);

                return res.json({ success: false, message: `You can request a new confirmation code in ${60 - minutesLeft} minutes.` });

            }

            // If 1 hour has passed, reset the counter
            if ((currentTime - lastSentTime) >= 60 * 60 * 1000) {
                codeSendLimits.set(email, { sentCount: 0, lastSentTime: currentTime });
            }
        } else {
            // Initialize tracking for this email
            codeSendLimits.set(email, { sentCount: 0, lastSentTime: Date.now() });
        }

        const confirmationCode = crypto.randomInt(100000, 999999)
        confirmationCodes.set(email, { code: confirmationCode, expires: Date.now() + 5 * 60 * 1000 })

        //now  set up for sending this code via email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,

            },
        },)
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Your confirmation code from Hammad Travels',
            text: `Your confirmation code is ${confirmationCode}`,
        }
        //now send these using node mailer
        await transporter.sendMail(mailOptions)
        console.log(`Confirmation code sent to ${email}`);
        const current = codeSendLimits.get(email);
        codeSendLimits.set(email, {
            sentCount: current.sentCount + 1,
            lastSentTime: Date.now(),
        });
        return res.json({ success: true, message: `Confirmation code sent to ${email}` })
    }
    catch (error) {
        console.log('Confirmation code not sent due to', error);
        return res.json({ success: false, message: `Confirmation code not sent due to ${error}` })
    }
}
const verifyConfirmationcode = async (req, res, next) => {
    try {
        const { email, confirmationCode } = req.body
        if (!email || !confirmationCode) {
            return res.json({ success: false, message: "Email Or Confirmation code is not provided" })
        }
        const storeCode = confirmationCodes.get(email)

        if (!storeCode || storeCode.code !== parseInt(confirmationCode) || storeCode.expires < Date.now()) {
            return res.json({ success: false, message: "Invalid or Expire confirmation code" })
        }
        confirmationCodes.delete(email)
        next();
    }
    catch (error) {
        console.log(`error in code verification ${error}`);
        return res.json({ success: false, message: error })
    }
}
const ChangePassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!email || !password) {
            res.json({ success: false, message: 'Email or New Password is not Provided ' })
        }
        if (!user) {
            res.json({ success: false, message: 'User Not Found With This Email' })
        }
        if (password.length < 8) {
            console.log('Password length must be 8 characters');
            res.json({ success: false, message: 'Password length must be 8 characters' })
        }
        const salt = await bycrpt.genSalt(10)
        const hashPassword = await bycrpt.hash(password, salt)
        user.password = hashPassword
        await user.save()
        console.log('Password updated successfully', hashPassword);
        return res.json({ success: true, message: 'Password updated successfully' });
    }
    catch (error) {
        console.log('error in changing Password', error);
        return res.json({ success: false, message: ('error in changing Password', error) })

    }
}
const getUserData = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await User.findById(userId).select('-password')
        return res.json({ success: true, userData })
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: error })
    }
}
const UpdateUserData = async (req, res) => {
    try {
        const { _id, name, phone, email, gender, dob, address } = req.body;
        const image = req.file;

        if (!_id || !name || !phone || !email || !gender || !dob) {
            return res.json({ success: false, message: 'Fields are missing' });
        }

        // Parse address if it's in JSON format
        const parsedAddress = JSON.parse(address);

        // Create an object for fields to update
        const updateFields = { name, phone, email, gender, dob, address: parsedAddress };

        // Upload image to Cloudinary if an image file is provided and add to update fields
        if (image) {
            const imageUpload = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
            updateFields.image = imageUpload.secure_url;
        }

        // Update user data in MongoDB
        const userUpdated = await User.findByIdAndUpdate(
            _id,
            updateFields,
            { new: true }
        );

        if (userUpdated) {
            return res.json({ success: true, message: 'User updated successfully', userUpdated });
        } else {
            return res.json({ success: false, message: 'User not updated' });
        }
    } catch (error) {
        console.log('Error in updating user data', error);
        return res.json({ success: false, message: `Error in updating user data: ${error}` });
    }
};

const BookPlace = async (req, res) => {
    try {
        const { userId, placeId, slotDate, slotTime,userFormInfo } = req.body
        console.log({ userId, placeId, slotDate, slotTime });
        if(!userFormInfo){
            console.log('Please fill the booking form');
            return res.json({success:false,message:'Please fill the booking form'})
        }
        if (!userId || !placeId || !slotDate || !slotTime) {

            return res.json({ success: false, message: "Can not get all data to book slot,missing fields !" })
        }
       
        const numberOfBookings = parseInt(userFormInfo.seats, 10);
        if (isNaN(numberOfBookings) || numberOfBookings <= 0) {
            console.log('Invalid number of seats.');
            return res.json({ success: false, message: 'Invalid number of seats.' });
        }

        const placeData = await Place.findById(placeId)
        if (placeData.availability !== 'yes') {
            console.log('No Booking Available For This Place');
            return res.json({ success: false, message: 'No Booking Available For This Place' })
        }
        const bookedSlot = placeData.slotBooked || {};

        // Initialize the slotDate if it doesn't exist
        if (!bookedSlot[slotDate]) {
            bookedSlot[slotDate] = [];
        }
        bookedSlot[slotDate].push(slotTime);
       

        const userData = await User.findById(userId).select('-password')

        const BookingData = {
            userId,
            placeId,
            placeData,
            userData,
            amount: placeData.rate * numberOfBookings,
            slotTime,
            slotDate,
            userFormInfo,
            date: Date.now()
        }
        const newBooking = new BookingModel(BookingData)
        await newBooking.save()
        
        const updatedPlace = await Place.findByIdAndUpdate(
            placeId,
            {
                bookedSlot,
                $inc: { totalBookings: numberOfBookings },
            },
            { new: true }
        );

        if (!updatedPlace) {
            console.error(`Place with ID ${placeId} not found or update failed.`);
        }
        

        return res.json({ success: true, message: 'Booked Successfully' })
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'catch block error in booking', error })
    }

}
const UserAppointments = async (req, res) => {
    try {
        const { userId } = req.body
        console.log(userId);
        const userAppointmentData = await BookingModel.find({ userId })
        if (!userAppointmentData) {
            console.log('currently no booking found for this user');
            return res.json({ success: false, message: 'currently no booking found for this user' })
        }
        // console.log(userAppointmentData);
        return res.json({ success: true, userAppointmentData })
    }
    catch (error) {
        console.log('error in getting user appointments', error);
        return res.json({ success: false, message: error })
    }
}

const cancelAppointment = async (req, res) => {
    try {
        const { userId, id } = req.body
        console.log(userId, ':', id);

        const deleteAppointmentData = await BookingModel.findById(id)
        if (!deleteAppointmentData) {
            console.log("No data found for the given ID");
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }
        if (userId !== deleteAppointmentData.userId.toString()) {
            console.log("Unauthorized user");
            return res.status(403).json({ success: false, message: "Unauthorized user" });
        }

        const numberOfBookings = parseInt(deleteAppointmentData.userFormInfo.seats, 10);
        if (isNaN(numberOfBookings) || numberOfBookings <= 0) {
            console.log("Invalid number of seats.");
            return res.status(400).json({ success: false, message: "Invalid number of seats" });
        }

        // Find the place related to the booking
        const placeId = deleteAppointmentData.placeId;
        const placeData = await Place.findById(placeId);
        if (!placeData) {
            console.log("Place not found");
            return res.status(404).json({ success: false, message: "Place not found" });
        }

        
        if(deleteAppointmentData.status!=='Canceled'){
        await Place.findByIdAndUpdate(
            placeId,
            { $inc: { totalBookings: -numberOfBookings } }, // Decrement by the number of seats booked
            { new: true }
        );
    }
        
        await deleteAppointmentData.deleteOne();
        console.log("Appointment canceled successfully");
        return res.status(200).json({ success: true, message: "Appointment canceled successfully" });

    }
    catch (error) {
        console.error("Error in canceling appointment:", error);
        return res.json({ success: false, message: `Internal server error ${error}` });    
    }
}
const sendMail = async (req,res)=>{
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Nodemailer configuration
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // Replace with your recipient email
            subject: `Contact Form Submission: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }

}
export { CreateUser, LoginUser, SendConfirmationCode, verifyConfirmationcode, ChangePassword, getUserData, UpdateUserData, BookPlace, UserAppointments,cancelAppointment,sendMail };