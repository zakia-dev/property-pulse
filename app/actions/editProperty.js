'use server';
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Properties";
import { getSessionUser } from "@/utils/getSessionUser";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



async function EditProperty(propertyId, formData) {
    await connectDB();

    const sessionUser = await getSessionUser();
    if(!sessionUser||!sessionUser.userId){
        throw new Error('user ID is required');
    }

    const {userId} = sessionUser;

    const ExistingProperty = await Property.findById(propertyId);
    if(ExistingProperty.owner.toString()!==userId){
        throw new Error('current user does not own this property');
    }
    const amenities = formData.getAll('amenities');

    const propertyData = {
        owner:userId,
        type: formData.get('type'),
        name: formData.get('name'),
        description: formData.get('description'),
        location: {
            street: formData.get('location.street'),
            zipcode: formData.get('location.zipcode'),
            city: formData.get('location.city'),
        },
        beds: formData.get('beds'),
        baths: formData.get('baths'),
        square_feet: formData.get('square_feet'),
        amenities,
        rates: {
            nightly: formData.get('rates.nightly'),
            weekly: formData.get('rates.weekly'),
            monthly: formData.get('rates.monthly'),
        },
        seller_info: {
            name: formData.get('seller_info.name'),
            email: formData.get('seller_info.email'),
            phone: formData.get('seller_info.phone'),
        },
        
    };

    const updatedProperty = await Property.findByIdAndUpdate(propertyId, propertyData, { new: true });
    console.log('Updated Property:', updatedProperty);

    if (!updatedProperty) {
        throw new Error('Failed to update property');
    }

    // Correct `revalidatePath`
    revalidatePath('/');

    // Redirect to the updated property page
    console.log("Redirecting to:", `/properties/${updatedProperty._id}`);

    redirect(`/properties/${updatedProperty._id}`);

    
} 

export default EditProperty
