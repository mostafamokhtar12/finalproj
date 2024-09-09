import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { VerifyContext } from '../../SharedData/VerifyContext'

export default function ForgetPass() {

    let [error, setError] = useState("")
    let [isLoading, setLoading] = useState(false)
    let [formStatus, setformStatus] = useState(true)
    let nav = useNavigate()
    let {setVerified} = useContext(VerifyContext)




    let validationSchema = yup.object({
        email: yup.string().required("Mail is required").email("Enter valid mail")
    })
    let formik = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: forgetPassApi,
        validationSchema
    })
    async function forgetPassApi(value) {
        setLoading(true)
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch((err) => {
            setError(err.response.data.message)
            setLoading(false)
        })
        if (req.data.statusMsg == "success") {
            setLoading(false)
            setformStatus(false)
        }
        console.log(req);
    }



    let validationSchema2 = yup.object({
        resetCode: yup.string().required("Reset code is required").matches(/^[0-9]{5,6}$/, "Enter valid reset code")
    })

    let formik2 = useFormik({
        initialValues: {
            resetCode: ""
        },
        onSubmit: resestCodeApi,
        validationSchema: validationSchema2
    })

    async function resestCodeApi(value) {
        setLoading(true)
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', value).catch((error) => {
            setError(error.response.data.message)
            setLoading(false)
        })
        if (req.data.status == "Success") {
            setVerified(true)
            setLoading(false)
            nav('/resetPass')
        }
        
    }

    return (
        <>
            <div className='container py-5'>


                {error ? <div className='alert alert-danger'>{error}</div> : ""}


                {formStatus ? <form onSubmit={formik.handleSubmit}>


                    <div className='mb-3'>
                        <label htmlFor="email">Email:</label>
                        <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name='email' className='form-control' id='email' />
                        {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
                    </div>


                    {isLoading ? <button type='button' className='btn bg-main text-white'>
                        <i className='fa-solid fa-spinner fa-spin'></i>
                    </button> : <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white'>Send code</button>}
                    <br />

                </form> :
                    <form onSubmit={formik2.handleSubmit}>


                        <div className='mb-3'>
                            <label htmlFor="resetCode">Reset Code</label>
                            <input value={formik2.values.resetCode} onChange={formik2.handleChange} onBlur={formik2.handleBlur} type="text" name='resetCode' className='form-control' id='resetCode' />
                            {formik2.errors.resetCode && formik2.touched.resetCode ? <div className='alert alert-danger'>{formik2.errors.resetCode}</div> : ""}





                            {isLoading ? <div className='d-flex justify-content-center align-items-center'>
                                <button type='button' className='btn bg-main text-white mt-3'>
                                    <i className='fa-solid fa-spinner fa-spin'></i>
                                </button>
                            </div> : <div className='d-flex justify-content-center align-items-center'>
                                <button disabled={!(formik2.isValid && formik2.dirty)} className='btn bg-main text-white mt-3'>Verify</button>
                            </div>}
                            <br />
                        </div>

                    </form>}





            </div>
        </>
    )
}

