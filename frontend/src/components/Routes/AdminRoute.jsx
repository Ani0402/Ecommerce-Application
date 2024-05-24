import { useEffect,useState } from "react";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from 'axios'
import { REACT_APP_API } from "../../constants";
import Spinner from "../Spinner";

export default function AdminRoute(){
    const [ok,setOk]=useState(false)
    const {auth,setAuth}=useAuth()
    

    useEffect(()=>{
        const authCheck=async()=>{
            const res=await axios.get(`${REACT_APP_API}/api/v1/auth/admin-auth`)
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token){
            authCheck()
        }
    },[auth?.token])

    // when a user navigates to the /dashboard route, the PrivateRoute component checks if the user is authenticated. If they are authenticated, the Outlet component renders the child routes of the /dashboard route, which includes the Dashboard component. If they are not authenticated, they are redirected to the login page by the Spinner component.

    return ok ? <Outlet/>:<Spinner path="/" />
}