import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../../context/cart'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import {REACT_APP_API} from "../constants"
import DropIn from "braintree-web-drop-in-react"
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const {auth,setAuth}=useAuth()

    const {cart,setCart}=useCart()

    const navigate=useNavigate()

    const [clientToken,setClientToken]=useState('')

    const [instance,setInstance]=useState()

    const [loading,setLoading]=useState(false)
    const totalPrice=()=>{
      try{
        let total=0;
        cart.map(item => {total += item.price})
        return total.toLocaleString("en-IN",{
          style:"currency",
          currency:"INR"
        });
      }
      catch(error){
        console.log(error)
      }
    }

    const removeCartItems = (pid) =>{
       try{
          let myCart=[...cart];
          let index=myCart.findIndex(item => item._id === pid)
          myCart.splice(index, 1)
          setCart(myCart)
          localStorage.setItem('cart', JSON.stringify(myCart))
       }
       catch(error){
        console.log(error);
       }
    }

    const getToken= async()=>{
       try{
          const {data}=await axios.get(`${REACT_APP_API}/api/v1/product/braintree/token`)

          setClientToken(data?.clientToken)
       }
       catch(error){
        console.log(error);
       }
    }

   const handlePayment=async()=>{
     try{

       setLoading(true)
       const {nonce}=await instance.requestPaymentMethod()

       const {data}= await axios.post(`${REACT_APP_API}/api/v1/product/braintree/payment`,{nonce:nonce,cart})
       setLoading(false)
       localStorage.removeItem('cart')
       setCart([])
       navigate('/dashboard/user/orders')
       toast.success("Payment successful")
     }
     catch(error){
      console.log(error);
      setLoading(false)
     }
   }

    useEffect(()=>{
      getToken()
    },[auth?.token])

  return (
    <Layout>
      <div className="container">
         <div className="row">
            <div className="col-md-12">
              <h1 className="text-center bg-light p-2 mb-1">
                 {`Hey sweet bun ${auth.token && auth?.user?.name}`}
              </h1>
              <h4 className="text-center">
                {cart.length > 0 ? (
                  `You have ${cart?.length} ${auth?.token ? "" : "please login to checkout"}`
                ) : (
                  <div>Your cart is empty</div>
                )}
              </h4>
            </div>
         </div>
         <div className="row">
            <div className="col-md-7">
            {
              Array.isArray(cart) && cart.length > 0 ? (
                cart.map((p) => (
                  <div className="row mb-2 p-3 card flex-row" key={p._id}>
                    <div className="col-md-4">
                      <img
                        src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.name}
                        width={"100px"}
                        height={"100px"}
                      />
                    </div>
                    <div className="col-md-8">
                      <p>Name: {p.name}</p>
                      <p>Description: {p.description.substring(0, 30)}</p>
                      <h4>Price: &#8377;{p.price}</h4>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeCartItems(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div>Your cart is empty</div>
              )
            }
            </div>
            <div className="col-md-4 text-center">
              <h3>Cart summary</h3>
              <p>Total | Checkout | Payment</p>
              <hr/>
              <h4>Total: {totalPrice()} </h4>
              {
                auth?.user?.address ? 
                <>
                   <div className="mb-3">
                     <h4>Current Address: {auth?.user?.address}</h4>
                     
                     <button className="btn btn-outline-warning"
                     onClick={()=>navigate('/dashboard/user/profile')}
                     >Update Address</button>
                   </div>
                </>
                : (
                  <div className="mb-3">
                    {
                       auth?.token ? (
                        <button className="btn btn-outline-warning" onClick={()=>navigate("/dashboard/user/profile")}>
                          Update and checkout 
                        </button> 
                       )
                       : (
                        <button className="btn btn-outline-warning" onClick={()=>navigate("/login")}>Please login to checkout</button>
                       )
                    }
                  </div>
                )
              }
              <div className="mt-2">
                 {
                   !clientToken || !auth?.token || !cart?.length ? ("") : 
                    <>
                      <DropIn
                      options={{
                      authorization:clientToken,
                      paypal:{
                        flow:'vault',
                      }
                      }}
                      onInstance={instance => setInstance(instance)}
                    />
                      <button className="btn btn-primary" onClick={handlePayment} disabled={loading || !instance || !auth?.user?.address}>
                      
                      {
                        loading ? "Processing...." : "Make Payment"
                      }
                      
                      </button>
                    </>
                 }
                 
              </div>
            </div>
         </div>
      </div>
    </Layout>
  )
}

export default CartPage
