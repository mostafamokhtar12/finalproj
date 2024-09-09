import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function CategorySlider() {

  let [categoryList, setCategoryList] = useState([])

  useEffect(() => {
    getCategories()
  }, [])
  async function getCategories() {
    let req = await axios.get('https://ecommerce.routemisr.com/api/v1/categories')

    setCategoryList(req.data.data)
  }


  return (
    <>

      <h3>Categories</h3>



      <OwlCarousel className='owl-theme py-5' items={6}>
        {categoryList.map((el) => {
          return <div className="item">
            <img src={el.image} height={250} alt="" />
          </div>
        })}
      </OwlCarousel>
    </>
  )
}
