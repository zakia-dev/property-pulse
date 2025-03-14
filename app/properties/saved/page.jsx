import PropertyCards from "@/components/propertyCards"
import connectDB from "@/config/database";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
const SavedProperties = async () => {
    const sessionUser = await getSessionUser();
    const {userId} = sessionUser;

    const user = await User.findById(userId).populate('bookmarks');
    ('bookmarks');
    console.log(user.bookmarks);
  return (
    <section className="px-4 py-6">
        <div className="container lg:container m-auto px-4 py-6">
            <h1 className="text-2xl mb-4 ">
                Saved Properties
            </h1>
            {user.bookmarks.length === 0? (<p>No Saved Properties</p>):(
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {
                        user.bookmarks.map((property)=>(
                            <PropertyCards key={property._id} property={property} />
                        ))
                    }

                </div>
            )}

        </div>

    </section>
  )
}

export default SavedProperties