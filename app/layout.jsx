import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import AuthProvider from '@/components/authprovider';
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from '@/context/GlobalContext';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';
export const metadata ={
title :'Next Course',
keywords:'rental, property, real estate',
description: 'Find the perfect rental property',
};


const MainLayout =({children})=>{
    return(
        <AuthProvider >
            <GlobalProvider>
        <html>
            <body className=''>
                <Navbar/>
                <main>{children}</main>
                <Footer/>
                <ToastContainer />
            </body>
        </html>
        </GlobalProvider>
        </AuthProvider>

    );
};

export default MainLayout;