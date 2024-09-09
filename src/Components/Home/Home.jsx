import React, { useContext, useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import { CartContext } from '../../SharedData/cartContext'
import Swal from 'sweetalert2'
export default function Home() {
  
  let {addToCart,setItemNumber} = useContext(CartContext)
  
  
  let [page, setPage] = useState(1)
  let [numOfPages, setNumOfPages] = useState(0)
  const Swal = require('sweetalert2')

  const numbers = Array.from({ length: numOfPages }, (_, index) => index + 1)

  async function getProducts(queryData) {
    let req = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`)
    setNumOfPages(req.data.metadata.numberOfPages)
    return req
  }

  let { isLoading, data, isFetching } = useQuery(['productApi', page], getProducts)


  function getPageNumber(event) {
    let page = event.target.getAttribute('pageNum')
    setPage(page)
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
        text: "Product added to cart successfully!",
        icon: "success"
      });
    }
  }


  return (
    <>

    <MainSlider></MainSlider>
    <CategorySlider></CategorySlider>

      {isLoading ? <div className='loading d-flex justify-content-center align-items-center position-fixed bg-white start-0 end-0 top-0 bottom-0'>
        <span className="loader"></span>
      </div> : <div className="container">
        <div className="row g-4">
          {data?.data.data.map((el) => {
            return <div key={el.id} className="col-md-2">
              <div className="product cursor-pointer">
                <Link to={`/details/${el.id}`}> 
                  <img className='w-100' src={el.imageCover} alt='' />
                  <h6 className='text-main fw-bold'>{el.category.name}</h6>
                  <h5>{el.title.split(" ").slice(0, 2).join(" ")}</h5>
                  <div className="d-flex justify-content-between">
                    <span>{el.price}EGP</span>
                    <span><i className='fa-solid fa-star rating-color'></i> {el.ratingsAverage} </span>
                  </div>
                </Link>
                <button onClick={()=>{addToMyCart(el.id)}} className='btn bg-main d-block w-100 text-white'>Add product</button>
              </div>
            </div>
          })}
        </div>
      </div>}


      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center py-4">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
            </a>
          </li>
          {numbers.map((el, i) => {
            return <li className="page-item"><a className="page-link cursor-pointer" pageNum={i + 1} onClick={getPageNumber}>{i + 1}</a></li>
          })}

          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
            </a>
          </li>
        </ul>
      </nav>


    </>
  )
}
