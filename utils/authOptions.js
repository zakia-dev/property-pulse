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
      async signIn({profile})  {
        // 1. connect to database
        await connectDB();
        // 2. check if user exists
        const userExists = await User.find({email:profile.email});
        // 3. if not, create user
        if(!userExists){
          //truncate username if too long
          const username = profile.name.slice(0, 20);
          await User.create({
            email: profile.email,
            username,
            image:profile.picture
          })
        }
        // 4. return true to sign in
        return true;
      },
      //session call back function that modifies the session object
      async session ({session}){
        //1. Get user from data base 
        const user = await findOne({email:session.user.email});
        //2. Assign user id from the session
        session.user.id = user._id.toString();
        //3. Return session
        return session;
      }
    }
}