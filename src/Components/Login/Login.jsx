import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../SharedData/userContext'
import { CartContext } from '../../SharedData/cartContext'


export default function Login() {


  let { getUserCart, setItemNumber } = useContext(CartContext)
  let {setToken} = useContext(UserContext)
  let [error, setError] = useState("")
  let [isLoading, setLoading] = useState(false)
  let Navg = useNavigate()

  let validation = yup.object({
    
    email: yup.string().required("Mail is required").email("Enter valid mail"),
    
    password: yup.string().required("Password is required").matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{7,16}$/, "Password must start with capital letter and from (8-16) char")
    

  })


  async function loginApi(values) {
    setLoading(true)
    let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).catch(function (errorrr) {
      setError(errorrr.response.data.message);
      setLoading(false)
    })
    if (req.data.message == 'success') {
      setLoading(false)
      localStorage.setItem("userToken",req.data.token)
      setToken(req.data.token)
      getUserCart2()
      Navg('/Home')
    }
  }
  async function getUserCart2(){
    let req = await getUserCart().catch((err)=>{})

    if(req?.data?.status == 'success'){
      setItemNumber(req.data.numOfCartItems)
    }
  }


  let formik = useFormik({
    initialValues: {
      
      password: "",
      email: ""
      
    },

    onSubmit: loginApi,

    validationSchema: validation

  })
  return (
    <>
      <div className='container py-5'>

        <h2>Login Now..........</h2>
        {error ? <div className='alert alert-danger'>{error}</div> : ""}
        <form onSubmit={formik.handleSubmit}>


          


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

          



          {isLoading ? <button type='button' className='btn bg-main text-white'>
            <i className='fa-solid fa-spinner fa-spin'></i>
          </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white'>Login</button>}
          <br/>
          <Link to={'/ForgetPass'}>
            <button className='btn btn-danger mt-2'>Forget password!</button>
          </Link>
        </form>
      </div>
    </>
  )
}
