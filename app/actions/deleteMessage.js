'use server';

import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { error } from "console";
import { revalidatePath } from "next/cache";


async function deleteMessage(messageId){
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('userID is Required')
    }
    const {userId} = sessionUser;

    const message = await Message.findById(messageId);
    if(!message) throw new Error('Message not found');

    //verify ownership
    if(message.recipient.toString()!==sessionUser.userId){
       throw new Error ('unauthorized');

    }

    await message.deleteOne();
    
    revalidatePath('/','layout')

}
export default deleteMessage