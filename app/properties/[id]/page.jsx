import connectDB from "@/config/database"
import Property from "@/models/Properties"
import PropertyHeaderImage from "@/components/propertyHeaderImage";
import BookmarkButton from "@/components/bookmarkButton";
import ShareButtons from "@/components/shareButtons";
import PropertyContactForm from "@/components/propertyContactForm";
import PropertyDetails from "@/components/propertyDetails";
import Link from "next/link";
import PropertyImages from "@/components/propertyImages";
import { FaArrowLeft } from "react-icons/fa"; 
import { convertToSerializeObject } from "@/utils/convertToObjects";
async function  PropertyIdPage ({params})  {
  {
    await connectDB();

  const { id: propertyId } = await params;
  const propertyDoc = await Property.findById(propertyId).lean();
  const property = convertToSerializeObject(propertyDoc);

    if(!property){
      return (
        <h1 className="text-center text-2xl font-bold mt-10"> property not found</h1>
      )
    }
    return (
    <>
      <PropertyHeaderImage image={property.images[0]}/>
      <section>
      <div className="container m-auto py-6 px-6">
        <Link
          href="/properties"
          className="text-pink-500 hover:text-pink-600 flex items-center"
        >
          <FaArrowLeft className=" mr-2"/> Back to Properties
        </Link>
      </div>
    </section>
    <section className="bg-pink-50">
      <div className="container m-auto py-10 px-6">
        <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <PropertyDetails property ={property}/>
        <aside className="space-y-4">
          <BookmarkButton property={property}/>
          <ShareButtons property={property}/>
          <PropertyContactForm property={property}/>
        </aside>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images} />
    </>
    
    )
  }
  
} 
export default PropertyIdPage