'use client'
import { FaBookmark } from "react-icons/fa"
import BookmarkProperty from "@/app/actions/bookmarkProperty"
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import { useState,useEffect } from "react"
import Loading from "@/app/loading"
const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(()=>{
    if(!userId){
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res)=>{
      if(res.error) toast.error(res.error);
      if(res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    })
  },[property._id, userId, checkBookmarkStatus]);

  const handleClick = async () => {
    
    
    if (!userId) {
      toast.error('You need to sign in to bookmark a listing');
      return;
    }
   

    try {
      
      const res = await BookmarkProperty(property._id);
      
      if (res.error) {
        return toast.error(res.error);
      }
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
      
    } catch (error) {
      toast.error('Something went wrong');
    }
    if(Loading){
      return <p className="text-center">Loading...</p>
    }
  };
  return isBookmarked?(
    <button
    className="bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    onClick={handleClick}>
    <FaBookmark className="mr-2"/> Remove Bookmark
  </button>
  ):(
    <button
    className="bg-pink-500 hover:bg-pink-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center"
    onClick={handleClick}>
    <FaBookmark className="mr-2"/> Bookmark Property
  </button>
  )
}

export default BookmarkButton;
