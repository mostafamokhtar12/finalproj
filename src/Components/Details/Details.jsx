import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../SharedData/cartContext'
import Swal from 'sweetalert2'
export default function Details() {

    let {addToCart,setItemNumber} = useContext(CartContext)
    const Swal = require('sweetalert2')
    let params = useParams()

    let [product, setProduct] = useState({})
    let [isLoading, setIsLoading] = useState(false)

    useEffect(() => {

        getProductDetails(params.id)

    }, [])

    async function getProductDetails(id) {
        setIsLoading(true)
        let req = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setProduct(req.data.data);
        setIsLoading(false)
        let imgs = document.querySelectorAll('.imgs')
        imgs.forEach((el) => {
            el.addEventListener('click', function (e) {
                let imgPath = e.target.getAttribute('src')
                document.querySelector("#myImage").setAttribute('src', imgPath)
            })
        })
    }

    function getSrc(e) {
        

        let imgPath = e.target.getAttribute('src')
        document.querySelector("#myImage").setAttribute('src', imgPath)


    }

    async function addToMyCart(id){
        let req = await addToCart(id).catch( (error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        } )
        if(req.data.status == 'success'){
          setItemNumber(req.data.numOfCartItems)
          Swal.fire({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success"
          });
        }
      }


    return (
        <>
            {isLoading ? <div className='loading d-flex justify-content-center align-items-center position-fixed bg-white start-0 end-0 top-0 bottom-0'>
                <span className="loader"></span>
            </div> : <div className='container py-5'>
                <div className="row align-items-center">
                    <div className="col-md-3">
                        <div className="row align-items-center">
                            <div className="col-md-2 imgdet">
                                {product?.images?.map((el) => {
                                    return <img src={el} onClick={getSrc} className='w-100 my-1 imgs cursor-pointer'></img>
                                })}
                            </div>
                            <div className="col-md-10">
                                <img src={product?.imageCover} id='myImage' className='w-100' />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <h6 className='py-1'>{product.title}</h6>
                        <p className='text-muted py-1'>{product?.description}</p>
                        <h2 className='text-main py-1'>{product?.category?.name}</h2>
                        <div className="py-1 d-flex justify-content-between">
                            <span>{product?.price}EGP</span>
                            <span><i className='fa-solid fa-star rating-color'></i> {product?.ratingsAverage} </span>
                        </div>
                        <button onClick={ ()=>{addToMyCart(product.id)} } className='btn bg-main mt-5 d-block w-100 text-white'>+Add to cart</button>
                    </div>
                </div>
            </div>}
        </>

    )
}
