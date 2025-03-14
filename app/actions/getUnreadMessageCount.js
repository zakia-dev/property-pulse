'use server'
import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function GetUnraedMessageCount() {

     await connectDB();
     const sessionUser = await getSessionUser();
    
     if(!sessionUser||!sessionUser.userId){
        throw new Error('user Id is required')
     }

     const {userId} = sessionUser;

     const count = await Message.countDocuments({
        recipient:userId,
        read:false,
     })

     return { count };
    
}
export default GetUnraedMessageCount;
