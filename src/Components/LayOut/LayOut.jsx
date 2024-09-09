import React, { useContext, useEffect } from 'react'
import style from './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../../SharedData/userContext'
import { CartContext } from '../../SharedData/cartContext'

export default function LayOut() {

  let {setCartData, getUserCart, setItemNumber } = useContext(CartContext)

  let { setToken } = useContext(UserContext)
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
      getUserCart2()
    }


  }, [])

  async function getUserCart2(){
    let req = await getUserCart().catch( (error)=>{
      console.log(error);
    })

    if(req?.data?.status == 'success'){
      setItemNumber(req.data.numOfCartItems)
    }
  }
  return <>
    <Navbar></Navbar>
    <div className="my-5 pt-5 container">
      <Outlet></Outlet>

    </div>
    <Footer></Footer>
  </>

}
