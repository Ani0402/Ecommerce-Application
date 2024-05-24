import { useState,useEffect } from "react";
import { REACT_APP_API } from "../constants";

import axios from "axios";

export default function useCategory(){
    const [categories,setCategories] = useState([])

    const getCategories =async()=>{
        try{
           const {data}=await axios.get(`${REACT_APP_API}/api/v1/category/get-all-category`)
           
           setCategories(data?.category)
        }
        catch(error){
           console.log(error) 
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories;
}