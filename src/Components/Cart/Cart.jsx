import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../SharedData/cartContext'
import { Link } from 'react-router-dom'

export default function Cart() {

  let { updateCart, clearCart, removeCartItem, getUserCart, setItemNumber } = useContext(CartContext)

  let [cartData, setCartData] = useState(null)
  let [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getUserCart2()
  }, [])

  async function getUserCart2() {
    setIsLoading(true)
    let req = await getUserCart().catch((err) => {
      console.log(err);
      setIsLoading(false)
      if (err.response.data.statusMsg == 'fail') {
        setCartData(null)
      }
    })

    if (req?.data?.status == 'success') {
      setCartData(req.data.data)
      setIsLoading(false)
    }
  }

  async function removeCartItemReq(id) {
    let req = await removeCartItem(id)
    if (req?.data?.status == 'success') {
      setCartData(req.data.data)
      setItemNumber(req.data.numOfCartItems)
    }
  }

  async function clearCartReq() {
    let req = await clearCart()

    if (req?.data?.message == 'success') {
      setCartData(null)
      setItemNumber(req.data.numOfCartItems)
    }
  }
  async function updateCartReq(id, count) {
    if (count == 0) {
      removeCartItemReq(id)
    } else {
      let req = await updateCart(id, count)
      if (req?.data?.status == 'success') {
        setCartData(req.data.data)
      }
    }
  }

  return (
    <>
      {isLoading ? <div className='loading d-flex justify-content-center align-items-center position-fixed bg-white start-0 end-0 top-0 bottom-0'>
        <span className="loader"></span>
      </div> :

        <>
          {cartData == null ? <div className='alert alert-danger'>Empty cart</div> : <div className="container bg-light">

            <button onClick={clearCartReq} className='float-end btn btn-danger btn-sm'>Empty Cart</button>
            <div className="clearfix"></div>

            {cartData?.products?.map((el) => {
              return <div className="row py-5 align-items-center border-bottom border-3">
                <div className="col-md-10">
                  <div className="row align-items-center">
                    <div className="col-md-1">
                      <img src={el.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-11">
                      <h6>{el.product.title}</h6>
                      <h5 className='text-muted'>Price: {el.price}EGP</h5>
                      <button onClick={() => { removeCartItemReq(el.product._id) }} className='btn btn-danger btn-sm'>Remove <i className='fa-solid fa-trash'></i></button>
                    </div>
                  </div>
                </div>
                <div className="col-md-2">
                  <span onClick={() => { updateCartReq(el.product._id, el.count -= 1) }} className='btn btn-danger btn-sm'>
                    <i className='fa fa-minus'></i>
                  </span>
                  <span className='mx-2'>
                    {el.count}
                  </span>
                  <span onClick={() => { updateCartReq(el.product._id, el.count += 1) }} className='btn btn-success btn-sm'>
                    <i className='fa fa-plus'></i>
                  </span>
                </div>
              </div>
            })}

            <h3 className='text-main py-4 fw-bolder fst-italic'>Total Price : {cartData.totalCartPrice} </h3>

            <Link to={'/checkout/'+cartData._id} className='text-white btn bg-main'>Check out payment</Link>
          </div>}

        </>

      }

    </>
  )
}
