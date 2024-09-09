import React from 'react'
import style from './NotFound.module.css'
import err from '../../assets/images/error.svg'

export default function NotFound() {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <img src={err} className='w-50 py-5'></img>  
    </div>
    
  )
}
