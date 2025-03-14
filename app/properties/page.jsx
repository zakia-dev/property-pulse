import PropertyCards from "@/components/propertyCards";
import connectDB from "@/config/database";
import Property from "@/models/Properties";
import Pagination from "@/components/pagination";
const PropertyPage = async ({searchParams}) => {
  const { page = 1, pageSize = 5 } = searchParams; // Destructure 'page' with a default value

  await connectDB();
  const skip = (page -1)*pageSize;
  const total = await Property.countDocuments({});
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  const showPagination = total > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          {properties.length === 0 ? (
            <p>No Properties Found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCards key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
        {showPagination && (  <Pagination 
        page={parseInt(page)}
        pageSize={parseInt(pageSize)}
        totalItems={total}
        />)}
      
      </div>
    </section>
  );
};

export default PropertyPage;
