import mongoose from "mongoose";

const ConnectDb= async()=>{
    try{
await mongoose.connect(`${process.env.MONGO_URL}/travelingDb`)
console.log("Db Connected");
    }
    catch(error){
        console.log("Mongo Db Connection Failed",error);
    }

}

export default ConnectDb;