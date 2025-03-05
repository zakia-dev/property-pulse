import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import AuthProvider from '@/components/authprovider';
export const metadata ={
title :'Next Course',
keywords:'rental, property, real estate',
description: 'Find the perfect rental property',
};


const MainLayout =({children})=>{
    return(
        <AuthProvider>
        <html>
            <body className=''>
                <Navbar/>
                <main>{children}</main>
                <Footer/>
            </body>
        </html>
        </AuthProvider>

    );
};

export default MainLayout;