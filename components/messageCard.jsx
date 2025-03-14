'use client';
import { useState } from "react";
import { toast } from "react-toastify";
import MarkMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";
const  MessageCard =({message})=> {
    const [isRead, setIsRead] = useState(message.read);
    const [isDelete, setIsDelete] = useState(false);
    const {setUnreadCount} = useGlobalContext();




    const handleReadClick = async () => {
        const read = await MarkMessageAsRead(message._id);
        setIsRead(read);
        setUnreadCount((prevCount)=>(read? prevCount -1 :prevCount +1 ))
        toast.success(`marked as ${read? 'Read':'New'}`)
    }

    const handleDeleteClick = async () => {
       await deleteMessage(message._id)
       setIsDelete(true);
       setUnreadCount((prevCount)=>(isRead? prevCount -1 :prevCount +1 ))
       toast.success('Message Deleted')

    }
    if(isDelete){
        return <p>Deleted Message</p>

    }

  return (
    <div className="relative bg-white rounded-md shadow-md border border-gray-200 ">
        {!isRead && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md ">
                New
            </div>
        )}
        <h2 className="text-xl mb-4">
            <span className="font-bold ml-6  ">Property Inquiry:</span>{' '}
            {message.property.name}

            <p className="text-gray-700 ml-6">{message.body}</p>
            <ul className="mt-4">
                <li>
                    <strong className="ml-6">
                        Reply to Email
                    </strong>{' '}
                    <a href={`mailto:${message.email}`} className="text-pink-500 ">
                        {message.email}
                    </a>
                </li>

                <li>
                    <strong className="ml-6">
                        Reply Phone
                    </strong>{' '}
                    <a href={`tel:${message.phone}`} className="text-pink-500 ">
                        {message.email}
                    </a>
                </li>

                <li>
                    <strong className="ml-6">
                        Reply to Email
                    </strong>{' '}
                    <a href={`mailto:${message.email}`} className="text-pink-500 ">
                        {message.email}
                    </a>
                </li>

                <li>
                    <strong className="ml-6">
                        Recieved:
                    </strong>{' '}
                    {new Date(message.createdAt).toLocaleDateString()}
                   
                </li>

            </ul>

            <button onClick={handleReadClick} className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md ml-6">
                {isRead? 'Mark as New':'Mark As Read'}
            </button>

            <button onClick={handleDeleteClick} className="mt-4 mr-3 bg-red-500 text-white py-1 px-3 rounded-md ">
                Delete
            </button>


        </h2>
    </div>
  )
}

export default MessageCard
