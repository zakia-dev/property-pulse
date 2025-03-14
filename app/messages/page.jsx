import connectDB from "@/config/database"
import Message from "@/models/Message"
import '@/models/Properties';
import { convertToSerializeObject } from "@/utils/convertToObjects";
import { getSessionUser } from "@/utils/getSessionUser";
import MessageCard from "@/components/messageCard";

const MessagePage = async () => {
   await connectDB();

   const sessionUser = await getSessionUser();

   const {userId} = sessionUser;

   const readMessages = await Message.find({recipient :userId, read:true})
   .sort({createdAt:-1})
   .populate('sender','username')
   .populate('property','name')
   .lean();

   const unreadMessages = await Message.find({recipient :userId, read:false})
   .sort({createdAt:-1})
   .populate('sender','username')
   .populate('property','name')
   .lean();

   console.log(readMessages);

   const messages = [...unreadMessages, ...readMessages].map((messageDoc)=> {
    const message = convertToSerializeObject(messageDoc);
    message.sender = convertToSerializeObject(messageDoc.sender);
    message.property = convertToSerializeObject(messageDoc.property);
    return message;

   }) ;
  return (
   <section className="bg-pink-50">
    <div className="container m-auto py-24 max-w-6xl">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Messages</h1>
            <div className="space-y-4">
                {messages.length === 0? (<p>You have NO Messages</p>):(
                    messages.map((message)=>(
                        <MessageCard key={message._id} message={message}/>
                           

                        
                    ))
                )}

            </div>

        </div>

    </div>

   </section>
  )
}

export default MessagePage
