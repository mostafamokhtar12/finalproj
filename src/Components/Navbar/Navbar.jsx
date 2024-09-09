import React, { useContext } from 'react'
import style from './Navbar.module.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../SharedData/userContext'
import { CartContext } from '../../SharedData/cartContext'

export default function Navbar() {
  let { userToken, setToken } = useContext(UserContext)
  let { itemNumber } = useContext(CartContext)

  let navg = useNavigate()
  function logout() {
    setToken(null)
    localStorage.removeItem("userToken")
    navg("/login")
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div className="container-fluid">
        <NavLink className="navbar-brand" href="#"> <img src={logo}></img>  </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">


          {userToken != null ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="home">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="cart">Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="Products">Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-bold" to="brands">Brands</NavLink>
            </li>
          </ul> : ""}



          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item d-flex align-items-center">
              <div className='position-relative'>
                <i className="fa-brands fa-facebook mx-2" />
                <i className="fa-brands fa-tiktok mx-2" />
                <i className="fa-brands fa-youtube mx-2" />
                <i className="fa-brands fa-linkedin-in mx-2" />
                <i className="fa-brands fa-twitter mx-2" />
                {userToken != null ?
                  <>

                    <Link to='/cart'>
                      <i className='nav-link fa-solid text-main fa-cart-shopping '></i>
                      <span className='position-absolute end-0 top-0 translate-middle-y fw-bold text-warning'>{itemNumber}</span>
                    </Link>
                  </>
                  : ""}
              </div>


            </li>
            {userToken != null ? <li className="nav-item d-flex">

              <span className="nav-link fw-bold cursor-pointer" onClick={logout}>Logout</span>
            </li> : <>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to="login">Login</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fw-bold" to="">Register</NavLink>
              </li>
            </>
            }


          </ul>


        </div>
      </div>
    </nav>

  )
}
