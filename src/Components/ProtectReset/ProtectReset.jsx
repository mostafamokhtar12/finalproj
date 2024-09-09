import React, { useContext } from 'react'
import { VerifyContext } from '../../SharedData/VerifyContext'
import { Navigate } from 'react-router-dom'

export default function ProtectReset({children}) {
    let {Verified} = useContext(VerifyContext)

    if(Verified == true){
        return children
    }else{
        return <Navigate to={"/login"}/>
    }
}
