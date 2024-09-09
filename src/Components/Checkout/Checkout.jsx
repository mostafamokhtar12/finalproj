import React, { useContext } from 'react'
import style from './Checkout.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { CartContext } from '../../SharedData/cartContext'
import { useParams } from 'react-router-dom'

export default function Checkout() {

  let data = useParams()

  let { checkOutPayment } = useContext(CartContext)

  let validationSchema = Yup.object({
    city: Yup.string().required("City is required").matches(/^[\w-]{3,}$/, "Enter valid city"),
    details: Yup.string().required("Details is required").matches(/^[\w-]{3,}$/, "Enter valid details"),
    phone: Yup.string().required("Phone is required").matches(/^01[1205][0-9]{8}$/, "Enter valid Phone")
  })

  let formik = useFormik({
    initialValues: {
      city: "",
      details: "",
      phone: ""
    },
    onSubmit: checkoutsubmit,

    validationSchema
  })
  async function checkoutsubmit(values) {
    let req = await checkOutPayment(data.id,values)
    console.log(req);
    if(req.data.status == 'success'){
      window.open(req.data.session.url,"_self")
    }
  }

  return (
    <>
      <div className='w-75 mx-auto my-5'>
        <form onSubmit={formik.handleSubmit}>
          <div className='mb-3'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='city' placeholder='Enter your city' className='form-control' />
            {formik.errors.city && formik.touched.city ? <p className='text-danger'>{formik.errors.city}</p> : ""}
          </div>
          <div className='mb-3'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name='phone' placeholder='Enter your phone' className='form-control' />
            {formik.errors.phone && formik.touched.phone ? <p className='text-danger'>{formik.errors.phone}</p> : ""}
          </div>
          <div className='mb-3'>
            <textarea onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='details' placeholder='Enter details' className='form-control'></textarea>
            {formik.errors.details && formik.touched.details ? <p className='text-danger'>{formik.errors.details}</p> : ""}
          </div>

          <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='text-white btn bg-main d-block w-100'>Pay <i className='fa-brands fa-cc-visa mx-2'></i></button>
        </form>
      </div>
    </>
  )
}
