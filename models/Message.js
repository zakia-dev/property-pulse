import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";
import { type } from "os";

 
const MessageSchema = new Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    recipient:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    property:{
        type:Schema.Types.ObjectId,
        ref:'Property',
        required:true
    },
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:[true,'Email is Required']
    },
    phone:String,

    body:String,

    read:{
        type:Boolean,
        default:false,
    }


},{
    timestamps:true
});

const Message = models.Message || model('Message', MessageSchema);
export default Message;