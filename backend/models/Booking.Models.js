import mongoose, { Model } from 'mongoose'

const BookingSchema = new mongoose.Schema({
    userId:{type:String,required:true},
placeId:{
    type:String,required:true
},
slotDate:{type:String,required:true},
slotTime:{type:String,required:true},
userData:{type:Object,required:true},
placeData:{type:Object,required:true},
amount:{type:Number,required:true},
date:{type:Number,required:true},
cancelled:{type:Boolean,default:false},
status:{type:String,default:''},
isCompleted:{type:Boolean,default:false},
payment:{type:Boolean,default:false},
userFormInfo:{type:Object,required:true}
},
{timestamps:true});
const BookingModel = mongoose.models.booking || mongoose.model('booking',BookingSchema)

export default BookingModel;