import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import {toast} from 'react-toastify'
import {REACT_APP_API} from "../../constants"
import { useNavigate,useLocation } from 'react-router-dom'
import '../../styles/AuthStyles.css'
import { useAuth } from '../../../context/auth'

function Login() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const navigate=useNavigate()
  const {auth,setAuth} = useAuth()

  const location=useLocation()
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
        const res=await axios.post(`${REACT_APP_API}/api/v1/auth/login`,{email,password})

        if(res.data.success){
            toast.success("Login successfully")
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || '/')
        }
        else{
            toast.error(res.data.message)
        }
    }
    catch(error){
        console.log("Error in login ",error);
        toast.error("Something went wrong")
    }
  }

  return (
    <Layout>
       <div className="register">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="mb-3 d-flex justify-content-center align-items-center">
               <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forgot Password</button>
            </div>
            
            <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary ">Login</button>
            </div>
            
       </form>
       </div>
    </Layout>
  )
}

export default Login
