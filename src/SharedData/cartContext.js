import axios from "axios";
import { createContext, useState } from "react";

export let CartContext = createContext()

export function CartContextProvider({children}){

    let [itemNumber,setItemNumber] = useState(0)


    function getUserCart(){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }

        return axios.get('https://ecommerce.routemisr.com/api/v1/cart',options)
    }


    function addToCart(productId){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }
        let body = {
            productId:productId
        }

        return axios.post('https://ecommerce.routemisr.com/api/v1/cart',body,options)
    }

    function removeCartItem(id){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,options)
    }
    function clearCart(){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,options)
    }
    function updateCart(id,count){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }
        let body = {
            count:count
        }
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body,options)
    }
    function checkOutPayment(cartId,data){
        let options = {
            headers:{
                token:localStorage.getItem('userToken')
            }
        }
        let body = {
            shippingAddress:data
        }
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, body , options)
    }


    return <CartContext.Provider value={ {checkOutPayment,updateCart,removeCartItem,clearCart,getUserCart,addToCart,itemNumber,setItemNumber} }>
        {children}
    </CartContext.Provider>
}