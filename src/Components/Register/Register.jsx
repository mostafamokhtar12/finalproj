import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {


  let [error, setError] = useState("")
  let [isLoading, setLoading] = useState(false)
  let Navg = useNavigate()

  let validation = yup.object({
    name: yup.string().required("Name is required").min(3, "Min length is 3").max(15, "Max length is 15"),
    email: yup.string().required("Mail is required").email("Enter valid mail"),
    phone: yup.string().required("Phone is required").matches(/^01[0125][0-9]{8}$/, "Enter valid phone number"),
    password: yup.string().required("Password is required").matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{7,16}$/, "Password must start with capital letter and from (8-16) char"),
    rePassword: yup.string().required("rePass is required").oneOf([yup.ref("password")], "Confirm pass does not match")

  })


  async function registerApi(values) {
    setLoading(true)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch(function (errorrr) {
      setError(errorrr.response.data.message);
      setLoading(false)
    })
    if (req.data.message == 'success') {
      setLoading(false)
      Navg('/login')
    }
  }


  let formik = useFormik({
    initialValues: {
      name: "",
      password: "",
      email: "",
      rePassword: "",
      phone: ""
    },

    onSubmit: registerApi,

    validationSchema: validation

  })
  return (
    <>
      <div className='container py-5'>

        <h2>Register Now..........</h2>
        {error ? <div className='alert alert-danger'>{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>


          <div className='mb-3'>
            <label htmlFor="name">Name:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name='name' className='form-control' id='name' />
            {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : ""}
          </div>


          <div className='mb-3'>
            <label htmlFor="email">Email:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' className='form-control' id='email' />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
          </div>

          <div className='mb-3'>
            <label htmlFor="password">Password:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='password' className='form-control' id='password' />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}
          </div>

          <div className='mb-3'>
            <label htmlFor="rePassword">rePassword:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='rePassword' className='form-control' id='rePassword' />
            {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : ""}
          </div>

          <div className='mb-3'>
            <label htmlFor="phone">phone:</label>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name='phone' className='form-control' id='phone' />
            {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ""}
          </div>



          {isLoading ? <button type='button' className='btn bg-main text-white'>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white'>Register</button>}


        </form>
      </div>
    </>
  )
}
