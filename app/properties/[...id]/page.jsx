import connectDB from "@/config/database"
import Property from "@/models/Properties"
import PropertyHeaderImage from "@/components/propertyHeaderImage";
import PropertyDetails from "@/components/propertyDetails";
import Link from "next/link";
import PropertyImages from "@/components/propertyImages";
import { FaArrowLeft } from "react-icons/fa"; 
import { convertToSerializeObject } from "@/utils/convertToObjects";
async function  PropertyIdPage ({params})  {
  {
    await connectDB();

    const propertyDoc = await Property.findById(params.id).lean()
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
    <section class="bg-pink-50">
      <div class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <PropertyDetails property ={property}/>
        </div>
      </div>
    </section>
    <PropertyImages images={property.images} />
    </>
    
    )
  }
  
} 
export default PropertyIdPage