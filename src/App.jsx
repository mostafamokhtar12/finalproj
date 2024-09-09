import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import LayOut from './Components/LayOut/LayOut'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import Cart from './Components/Cart/Cart'
import Home from './Components/Home/Home'
import { UserContextProvider } from './SharedData/userContext'
import ProtectedRouting from './Components/ProtectedRouting/ProtectedRouting'
import ForgetPass from './Components/ForgetPass/ForgetPass'
import ResetPass from './Components/ResetPass/ResetPass'
import ProtectReset from './Components/ProtectReset/ProtectReset'
import { VerifyContextProvider } from './SharedData/VerifyContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import Details from './Components/Details/Details'
import { CartContextProvider } from './SharedData/cartContext'
import AllOrders from './Components/AllOrders/AllOrders'
import Checkout from './Components/Checkout/Checkout'
import Brands from './Components/Brands/Brands'


export default function App() {


  let Routes = createBrowserRouter([
    {
      path: "", element: <LayOut></LayOut>, children: [
        { path: "home", element: <ProtectedRouting><Home></Home></ProtectedRouting> },
        { index: true, element: <Register></Register> },
        { path: "login", element: <Login></Login> },
        { path: "categories", element: <ProtectedRouting><Categories></Categories></ProtectedRouting> },
        { path: "brands", element: <ProtectedRouting><Brands></Brands></ProtectedRouting> },
        { path: "allorders", element: <ProtectedRouting><AllOrders></AllOrders></ProtectedRouting> },
        { path: "checkout/:id", element: <ProtectedRouting><Checkout></Checkout></ProtectedRouting> },
        { path: "Products", element: <ProtectedRouting><Products></Products></ProtectedRouting> },
        { path: "details/:id", element: <ProtectedRouting><Details></Details></ProtectedRouting> },
        { path: "cart", element: <ProtectedRouting><Cart></Cart></ProtectedRouting> },
        { path: "ForgetPass", element: <ForgetPass></ForgetPass> },
        { path: "resetPass", element: <ProtectReset><ResetPass></ResetPass></ProtectReset> },
        { path: "*", element: <NotFound></NotFound> },
      ]
    }
  ])

  let QueryClients = new QueryClient()

  return (
    <QueryClientProvider client={QueryClients}>

      <CartContextProvider>
        <VerifyContextProvider>
          <UserContextProvider>
            <RouterProvider router={Routes}></RouterProvider>
          </UserContextProvider>
        </VerifyContextProvider>
      </CartContextProvider>


    </QueryClientProvider>

  )
}
