import mongoose from "mongoose";

let connected = false ;
const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if(connected){
        console.log('MongoDB is connected');
        return;
    }

    //connect to mongoDB
    try{

        console.log('connectingg.........')
        
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        
        console.log('connected....')

    } catch (error){
        console.log(error)

    }
};
 export default connectDB;