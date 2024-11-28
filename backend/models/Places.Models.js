import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    images: {
        type: [String], // Array of image URLs or paths
        validate: {
            validator: function (v) {
                return v.length >= 1 && v.length <= 3;
            },
            message: 'A user must provide at least 1 image and at most 3 images.',
        },
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    tourType: {
        type: String,
        required: true,
    },
    speciality:{
        type:String,
    },
    availability: { // Corrected spelling
        type:String,
        default:'yes',
    },
    rate: {
        type: Number,
        required: true,
    },
    slotBooked: {
        type: Object, // Consider defining this as a more structured type if possible
        default: {},
    },
    totalBookings: {
        type: Number,
        default: 0,
    },
}, 
{ timestamps: true, minimize: false });

const Place = mongoose.models.Place || mongoose.model('Place', PlaceSchema); 

export default Place;
