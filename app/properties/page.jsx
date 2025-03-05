import PropertyCards from "@/components/propertyCards";
import connectDB from "@/config/database";
import Property from "@/models/Properties";

const PropertyPage = async () => {
  await connectDB();
  const properties = await Property.find({}).lean();

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
      </div>
    </section>
  );
};

export default PropertyPage;
