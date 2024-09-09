import { createContext, useState } from "react";

export let UserContext = createContext();

export function UserContextProvider({children}){
    let [userToken,setToken] = useState(null)
    return <UserContext.Provider value={ {userToken,setToken} }>
        {children}
    </UserContext.Provider>
}
