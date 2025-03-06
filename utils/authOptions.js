import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';
export const authOptions = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID,
            clientSecret:process.env.GOOGLE_CLIENT_SECRETE,
            authorization:{
                params:{
                    prompt: 'consent',
                    access_type : 'offline',
                    response_type: 'code'
                }
            }
        })
    ],callbacks:{
      // invoked on successful sign In
        // Invoked on successful sign-in
  async signIn({ profile }) {
    // 1. Connect to the database
    await connectDB();

    // Ensure profile.email is valid
    if (!profile.email) {
      console.error("Profile email is missing");
      return false;
    }

    // 2. Check if the user exists
    const userExists = await User.findOne({ email: profile.email });

    // 3. If not, create the user
    if (!userExists) {
      const username = profile.name.slice(0, 20); // Truncate username if too long
      try {
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      } catch (error) {
        console.error("Error creating user:", error);
        return false;
      }
    }

    // 4. Return true to sign in
     return true;
      },
      //session call back function that modifies the session object
      async session ({session}){
        //1. Get user from data base 
        const user = await User.findOne({ email: session.user.email });
        console.log(user);
        if (user) {
          // 2. Assign the user's ID to the session
          session.user.id = user._id.toString();
        }
        // 3. Return the session
        return session;
      }
    }
}