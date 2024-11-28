import { v2 as cloudinary } from "cloudinary";
import validator from "validator";
import Place from "../models/Places.Models.js";
import jwt from 'jsonwebtoken'
import BookingModel from "../models/Booking.Models.js";
import nodemailer from 'nodemailer'
import User from "../models/User.Models.js";

const AddPlace = async (req, res) => {
    try {
        const { name, duration, about, tourType, availability, rate, speciality } = req.body;
        const images = req.files;

        console.log({ name, duration, about, tourType, availability, rate, speciality }, images);
        if (!name || !duration || !about || !tourType || !availability || !rate || !images || !speciality) {
            return res.json({ success: false, message: "Please Fill Up all Fields" });
        }

        // Cloudinary image uploadation
        const uploadPromises = images.map(image => {
            return cloudinary.uploader.upload(image.path, { resource_type: 'image' })
                .then(result => ({ status: 'fulfilled', value: result.secure_url }))
                .catch(error => ({ status: 'rejected', reason: error.message }));
        });

        const uploadResults = await Promise.allSettled(uploadPromises);

        // Get image URLs from fulfilled promises
        const imageUrls = uploadResults
            .filter(result => result.status === 'fulfilled')  // Filter fulfilled promises
            .map(result => result.value);                    // Extract secure_url from the value


        const image = imageUrls
            .filter(image => image.status === 'fulfilled') // Keep only fulfilled images
            .map(image => image.value);
        // Get reasons for failed uploads
        const failUploadImageUrls = uploadResults
            .filter(result => result.status === 'rejected')  // Filter rejected promises
            .map(result => result.reason);                   // Extract the error reasons

        console.log("Uploaded Image URLs:", imageUrls);

        // Validate the number of images
        if (imageUrls.length < 1 || imageUrls.length > 3) {
            return res.status(400).json({ success: false, message: "A user must provide at least 1 image and at most 3 images." });
        }

        if (failUploadImageUrls.length > 0) {
            console.log("Upload Errors:", failUploadImageUrls);
            return res.status(400).json({ success: false, message: failUploadImageUrls });
        }

        const placeData = {
            name,
            duration,
            tourType,
            about,
            availability,
            speciality,
            rate,
            images: image // This should now be an array of strings
        };

        const newPlace = new Place(placeData);
        await newPlace.save();
        return res.json({
            success: true,
            message: "Place added successfully!"
        });
    }
    catch (error) {
        console.log("Place Not Added in Controller", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

//admin login and authentication
const AdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            //here generate a token for login
            const token = jwt.sign({ email, password }, process.env.JWT_SECRET_kEY, { expiresIn: '1d' })
            return res.json({ success: true, token })

        }
        else {
            res.json({ success: false, message: 'plz give the valid Email or Password' })
        }

    }
    catch (error) {
        return res.json({ success: false, message: `failed to generate token ${error}` })
    }
}

//all places ApI method

const AllPlaces = async (req, res) => {
    try {

        const places = await Place.find({})
        return res.json({ success: true, message: places })
    }
    catch (error) {
        return res.json({ success: false, message: `failed to Fetch all places from db ${error}` })
    }
}

//update place API creation
const updatePlace = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, duration, about, tourType, availability, rate, speciality } = req.body;
        const images = req.files;

        const placedata = await Place.findById(id);
        if (!placedata) return res.status(404).json({ message: 'Place not found' });

        // If new images are provided
        let imageUrls = placedata.images;
        if (images && images.length > 0) {
            const uploadPromises = images.map(image => cloudinary.uploader.upload(image.path, { resource_type: 'image' }));
            const uploadResults = await Promise.allSettled(uploadPromises);

            // Filter only successfully uploaded images
            imageUrls = uploadResults.filter(result => result.status === 'fulfilled').map(result => result.value.secure_url);

            if (imageUrls.length < 1 || imageUrls.length > 3) {
                return res.status(400).json({ success: false, message: "A user must provide at least 1 image and at most 3 images." });
            }
        }

        const updatedPlace = await Place.findByIdAndUpdate(
            id,
            {
                name: name || placedata.name,
                duration: duration || placedata.duration,
                about: about || placedata.about,
                tourType: tourType || placedata.tourType,
                availability: availability || placedata.availability,
                rate: rate || placedata.rate, speciality: speciality || placedata.speciality,
                images: imageUrls,
            },
            { new: true }
        );

        return res.status(200).json({ message: 'Place updated successfully', success: true, updatedPlace });
    } catch (error) {
        console.log('Update place error in controller', error);
        return res.status(500).json({ message: 'Server error', success: false });
    }
};


const getOrUpdatePlaceById = async (req, res) => {
    const { id } = req.params;

    console.log("Received request for Place ID:", id);

    try {
        // If body data is present, handle as an update request
        if (Object.keys(req.body).length) {
            // console.log("Update request detected with data:", req.body);
            return updatePlace(req, res); // Delegate to updatePlace function
        }
        else {
            const place = await Place.findById(id);
            if (!place) {
                console.log("Place not found for ID:", id);
                return res.status(404).json({ success: false, message: 'Place not found' });
            }
            console.log("Fetched Place Details:", place);
            return res.status(200).json({ success: true, place });
        }
    } catch (error) {
        console.error("Error fetching/updating place details:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

//delete place with specific id
const DeletePlace = async (req, res) => {
    try {
        const { id } = req.params
        //console.log("Received delete request for Place ID:", id);
        const DeletedPlace = await Place.findByIdAndDelete(id)

        if (!DeletePlace) {
            return res.status(404).json({ success: false, message: "Place Not Found To Delete" })
        }
        return res.status(200).json({ success: true, message: "Place Deleted Successfully" })
    }
    catch (error) {
        console.log("Error deleting place:", error);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
const allBookings = async (req, res) => {
    try {
        const allBookingsData = await BookingModel.find({})
        if (!allBookings) {
            return res.json({ success: false, message: 'Currently no Booking founds' })
        }
        // console.log(allBookingsData);

        return res.json({ success: true, allBookingsData })
    }
    catch (error) {
        console.log('error in catch block of all bookings', error);
        return res.json({ success: false, message: error })
    }
}
const bookingActions = async (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })
    try {
        const { email, bookingId, action } = req.body
        if (!email || !bookingId || !action) {
            console.log('Missing parameters');
            return res.json({ success: false, message: 'Missing parameters' })
        }
        const UpdateBookingStatus = await BookingModel.findByIdAndUpdate(bookingId,
            { status: action === 'accept' ? 'Accepted' : 'Canceled' },
            { new: true }
        )
        if (!UpdateBookingStatus) {
            return res.json({ success: false, message: 'Booking not found' });
        }

        const place= await Place.findById(UpdateBookingStatus.placeId)    
        if (!place) {
            return res.json({ success: false, message: 'Associated place not found' });
        }
        
        if (action === 'cancel') {
            place.totalBookings = Math.max(0, place.totalBookings - UpdateBookingStatus.userFormInfo.seats); // Prevent negative bookings
            await place.save();
        }
        const formattedDate = new Date(UpdateBookingStatus.date).toLocaleString();
        //now mail setup
        const subject = action === 'accept' ? 'Booking Accepted Confirmation'
            : 'Booking Canceled Notification';

        const message =
            action === 'accept'
                ? `<p>Dear Valued Customer,</p>
           <p>Congratulations! Your booking for the tour "<strong>${UpdateBookingStatus.placeData.name}</strong>" has been successfully accepted.</p>
           <p><strong>Booking Details:</strong></p>
           <ul>
               <li><strong>Booking ID:</strong> ${UpdateBookingStatus._id}</li>
               <li><strong>Tour Date:</strong> ${formattedDate}</li>
           </ul>
           <p>We’re excited to have you join us! Please arrive at the departure point 30 minutes before the scheduled time. For further assistance or questions, feel free to contact our support team.</p>
           <p>Warm regards,</p>
           <p>Hammad Travellers Team</p>`
                : `<p>Dear Valued Customer,</p>
           <p>We regret to inform you that your booking for the tour "<strong>${UpdateBookingStatus.placeData.name}</strong>" has been canceled. We apologize for any inconvenience caused.</p>
           <p><strong>Booking Details:</strong></p>
           <ul>
               <li><strong>Booking ID:</strong> ${UpdateBookingStatus._id}</li>
               <li><strong>Tour Date:</strong> ${formattedDate}</li>
           </ul>
           <p>If you have any questions or wish to rebook, please reach out to our support team at <a href="mailto:support@example.com">support@example.com</a>.</p>
           <p>Thank you for understanding.</p>
           <p>Warm regards,</p>
           <p>Hammad Travellers Team</p>`;

        const sendmail = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            html: message,
        });
        if (!sendmail) {
            return res.json({ success: false, message: 'Confirmation Mail for booking not sent to user' })
        }
        res.json({
            message: `Booking has been ${action}ed and a confirmation email has been sent to the user.`, success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Sorry Error in Booking Confirmation' })
    }
}
const DashBoardData = async (req,res)=>{
    try {
        const toatlUsers = await User.find({});
        const totalBooking = await BookingModel.find({})
        const totalPlaces = await Place.find({})

        const dashBoardData =  {
            toatlUsers,
            totalBooking,
            totalPlaces,
            tUsers:toatlUsers.length,
            tPlace:totalPlaces.length,
            tBooking:totalBooking.length,
            latestBooking:totalBooking.reverse().slice(0,5)
        }
        if(!dashBoardData){
            return res.json({success:false,message:'error in getting Dashboard data'})
        }
        return res.json({success:true,message:'Data retrived Successfully',dashBoardData})
    } 
    catch (error) {
        console.log(error);
        return res.json({success:false,message:error})
    }
}
export { AddPlace, AdminLogin, AllPlaces, getOrUpdatePlaceById, updatePlace, DeletePlace, allBookings, bookingActions,DashBoardData};
