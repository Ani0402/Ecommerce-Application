import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from "axios"
import {toast} from 'react-toastify'
import {REACT_APP_API} from "../../constants"
import { useNavigate} from 'react-router-dom'
import '../../styles/AuthStyles.css'

const ForgotPassword = () => {

    const [email,setEmail] = useState("")
    const [question,setQuestion] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
      e.preventDefault()
      try{
          const res=await axios.post(`${REACT_APP_API}/api/v1/auth/forgot-password`,{email,newPassword,question})
  
          if(res.data.success){
              toast.success("Login successfully")
              navigate('/login')
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
        <h1>Change Password</h1>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter Password" value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            </div>

            <div className="mb-3">
                <input type="text" className="form-control"  placeholder="What is your DOB?" value={question} onChange={(e)=>setQuestion(e.target.value)}/>
            </div>

            <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-primary ">Change</button>
            </div>
            
       </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
