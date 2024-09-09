import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Swal from 'sweetalert2'

export default function ResetPass() {


    const Swal = require('sweetalert2')


    let nav = useNavigate()
    let [isLoading, setLoading] = useState(false)
    let [error, setError] = useState("")
    let validation = yup.object({

        email: yup.string().required("Mail is required").email("Enter valid mail"),

        newPassword: yup.string().required("newPassword is required").matches(/^[A-Z][a-zA-Z0-9!@#$%^&*()_-]{7,16}$/, "newPassword must start with capital letter and from (8-16) char")


    })


    async function resetPassApi(value) {
        setLoading(true)
        let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', value).catch((error) => {
            setError(error.response.data.message)
            setLoading(false)
        })

        if (req.data.token) {
            nav('/login')
            setLoading(false)
            Swal.fire({
                title: "Good job!",
                text: "Password updated successfully",
                icon: "success"
            });
        }

        console.log(req);
    }

    let formik = useFormik({
        initialValues: {

            newPassword: "",
            email: ""

        },

        onSubmit: resetPassApi,

        validationSchema: validation

    })
    return (
        <>
            <div className='container py-5'>

                <h2>Reset Password</h2>
                {error ? <div className='alert alert-danger'>{error}</div> : ""}

                <form onSubmit={formik.handleSubmit}>





                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' className='form-control' id='email' />
                        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor="newPassword">newPassword:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name='newPassword' className='form-control' id='newPassword' />
                        {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : ""}
                    </div>





                    {isLoading ? <button type='button' className='btn bg-main text-white'>
                        <i className='fa-solid fa-spinner fa-spin'></i>
                    </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white'>Update Password</button>}
                    <br />
                </form>
            </div>
        </>
    )
}
