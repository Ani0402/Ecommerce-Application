import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import  {useAuth}  from '../../../context/auth'
import { REACT_APP_API } from '../../constants'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {

  const {auth,setAuth}=useAuth()
  const [name,setName]=useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")

  useEffect(()=>{

    const {name,email,phone,address}=auth.user
    setName(name)
    setEmail(email)
    setPhone(phone)
    setAddress(address)
  },[])

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
        const res=await axios.put(`${REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address})

        if(res.data.success){
           setAuth({...auth,user:res.data?.updatedUser})
           let ls=localStorage.getItem("auth")
           ls=JSON.parse(ls);
           ls.user=res.data.updatedUser
           localStorage.setItem("auth",JSON.stringify(ls))
           toast.success("Updated successfully")  
        }
        else{
            toast.error(res.data.message)
        }
    }
    catch(error){
        console.log("Error in profile update ",error);
        toast.error("Something went wrong")
    }
  }

  return (
    <Layout>
      <div className='container-fluid p-3 m-3'>
        <div className="row">
          <div className="col-md-3">
            <UserMenu/>
          </div>

          <div className="col-md-9">
              <div className="register">
              <h1>Your Profile</h1>
              <form onSubmit={handleSubmit}>
      
                  <div className="mb-3">
                      <input type="text" className="form-control" id="Name" placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                  </div>
      
                  <div className="mb-3">
                      <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)}
                      disabled/>
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
      
                  <button type="submit" className="btn btn-primary">Update</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
