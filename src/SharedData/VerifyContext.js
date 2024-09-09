import { createContext, useState } from "react";

export let VerifyContext = createContext();

export function VerifyContextProvider({children}){
    let [Verified,setVerified] = useState(false)
    return <VerifyContext.Provider value={ {Verified , setVerified} }>
        {children}
    </VerifyContext.Provider>
}