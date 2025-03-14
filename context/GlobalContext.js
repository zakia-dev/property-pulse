'use client';
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GetUnraedMessageCount from "@/app/actions/getUnreadMessageCount";
//create context
const GlobalContext = createContext();

//create proviider
export function GlobalProvider({children}){
    const [unreadCount, setUnreadCount] = useState(0);
    const {data:session} = useSession();

    useEffect(()=>{
        if(session && session.user){
            GetUnraedMessageCount().then((res)=>{
                if(res.count) setUnreadCount(res.count)
            })

        } 
    },[GetUnraedMessageCount, session])

    return(
        <GlobalContext.Provider value={{
            unreadCount,
            setUnreadCount

        }

        }
        >
            {children}
            </GlobalContext.Provider>
    );

}

export function useGlobalContext(){
    return useContext(GlobalContext);
}