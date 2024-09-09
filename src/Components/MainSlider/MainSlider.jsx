import React from 'react'
import style from './MainSlider.module.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import $ from 'jquery'
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'



export default function MainSlider() {
  return (
    <>
      <div className="row py-5 g-0">
        <div className="col-md-9">
          <OwlCarousel items={1} loop className='owl-theme'>
            <div className="item">
              <img src={img1} className='w-100' height={500} alt="" />
            </div>
            <div className="item">
              <img src={img2} className='w-100' height={500} alt="" />
            </div>
            <div className="item">
              <img src={img3} className='w-100' height={500} alt="" />
            </div>
          </OwlCarousel>
        </div>
        <div className="col-md-3">
          <img src={img2} className='w-100' height={250} alt="" />
          <img src={img3} className='w-100' height={250} alt="" />
        </div>
      </div>
    </>
  )
}
