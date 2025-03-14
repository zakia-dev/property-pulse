'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Properties";
import { getSessionUser } from "@/utils/getSessionUser";
import { error } from "console";
import { revalidatePath } from "next/cache";


async function deleteProperty(propertyId){
    const sessionUser = await getSessionUser();

    if(!sessionUser || !sessionUser.userId){
        throw new Error('userID is Required')
    }
    const {userId} = sessionUser;

    const property = await Property.findById(propertyId);
    if(!property) throw new Error('Property Not Found');
    //verify ownership
    if(property.owner.toString()!== userId){
        throw new Error('unauthorized')
    }

        //Extract public id from url using split method 
        const publicIds = property.images.map((imageUrl)=>{
            const parts = imageUrl.split('/');
            return parts.at(-1).split('.').at(0);
    
        });
        //deleting image from cloudnary
        if(publicIds.length > 0){
            for(let publicId of publicIds) {
                await cloudinary.uploader.destroy('property-pulse/' + publicId);
                console.log("Delete result:", result);
            }
        }

    await property.deleteOne();
    revalidatePath('/','layout')

}
export default deleteProperty