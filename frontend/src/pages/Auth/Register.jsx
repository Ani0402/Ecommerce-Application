import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import {toast} from 'react-toastify'
import {REACT_APP_API} from "../../constants"
import { useNavigate } from 'react-router-dom'
import '../../styles/AuthStyles.css'

function Register() {

  const [name,setName]=useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")
  const [question,setQuestion] = useState("")
  const navigate=useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const res=await axios.post(`${REACT_APP_API}/api/v1/auth/register`,{name,email,password,phone,address,question})

        if(res.data.success){
            toast.success("Registered successfully")
            navigate('/login')
        }
        else{
            toast.error(res.data.message)
        }
    }
    catch(error){
        console.log("Error in register ",error);
        toast.error("Something went wrong")
    }
  }

  return (
    <Layout>
       <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <input type="text" className="form-control" id="Name" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" id="Phone" placeholder="Enter Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" id="Address" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control" id="Question" placeholder="What is your DOB?" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
       </form>
       </div>
    </Layout>
  )
}

export default Register
