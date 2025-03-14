'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function MarkMessageAsRead(messageId) {

     await connectDB();
     const sessionUser = await getSessionUser();
    
     if(!sessionUser||!sessionUser.userId){
        throw new Error('user Id is required')
     }
    
     const message = await Message.findById(messageId);
     if(!message) throw new Error('Message not found');

     //verify ownership
     if(message.recipient.toString()!==sessionUser.userId){
        throw new Error ('unauthorized');

     }
     message.read = !message.read;
     revalidatePath('/message', 'page');


     await message.save();
     return message.read; 
}
export default MarkMessageAsRead;
