'use server'
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function BookmarkProperty (propertyId) {
 await connectDB();
 const sessionUser = await getSessionUser();

 if(!sessionUser||!sessionUser.userId){
    throw new Error('user Id is required')
 }

 const {userId} = sessionUser;

 const user = await User.findById(userId);
 console.log("user found......", user)

 let isBookmarked = user.bookmarks.includes(propertyId);
 console.log("check if property included in bookmarks......")
 let message;
 if(isBookmarked){
    //if bookmarked , then remove
    console.log("removing bookmark")
    user.bookmarks.pull(propertyId);
    message = 'Bookmark Removed';
    isBookmarked = false;
 }
 else{
    // if not book marked, then add
    console.log("adding bookmark")
    user.bookmarks.push(propertyId);
    message = 'Bookmark added';
    isBookmarked = true;
 }

 await user.save();
 revalidatePath('/properties/saved');

 return(
    message,
    isBookmarked
 )

}

export default BookmarkProperty