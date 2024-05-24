import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {REACT_APP_API} from "../../constants"
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from 'antd';

const CreateCategory = () => {
  const[categories,setCategories] =useState([])

  const [name,setName] = useState("")

  const [visible,setVisible] = useState(false)

  const [selected,setSelected] = useState(null)

  const [updatedName,setUpdatedName] = useState("")

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post(`${REACT_APP_API}/api/v1/category/create-category`,{name:name})

      if(data?.success){
        toast.success(data.message);
        getAllCategories()
      }
      else{
        toast.error(data.message)
      }
    }
    catch(error){
      console.log(error);
    }
  }

  const getAllCategories =async()=> {
    try{
        
       const {data}=await axios.get(`${REACT_APP_API}/api/v1/category/get-all-category`)
       if(data?.success){
         setCategories(data?.category)
       }    
    }
    catch(error){
     console.log(error)
     toast.error("Something went wrong when creating category")
    }
 }

  useEffect(()=>{
    getAllCategories()
  },[])

  const handleUpdate=async()=>{
     try{
        const {data} =await axios.put(`${REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updatedName})

        if(data.success){
          toast.success(data.message);
          setSelected(null)
          setUpdatedName(null)
          setVisible(false)
          getAllCategories()
        }
        else{
          toast.error(data.message)
        }
     }
     catch(error){
      console.log("Something went wrong when updating category ",error);
     }
  }

  const handleDelete=async(id)=>{
    try{
       const {data} =await axios.delete(`${REACT_APP_API}/api/v1/category/delete-category/${id}`)

       if(data.success){
         toast.success(data.message);
         getAllCategories()
       }
       else{
         toast.error(data.message)
       }
    }
    catch(error){
     console.log("Something went wrong when updating category ",error);
    }
 }
  return (
    <Layout>
      <div className="container-flui m-3 p-3">
      <div className="row">
        <div className="col-md-3">
        <AdminMenu/>
        </div>
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className='p-3 w-50'>
            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
          </div>
          <div className='w-75'>
            <table className="table table-dark">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                  {
                    categories?.map(c =>(
                      <>
                        <tr>
                          <td key={c._id}>{c.name}</td>
                          <td>
                          <button className="btn btn-primary ms-2" onClick={()=>{setVisible(true);setUpdatedName(c.name);setSelected(c)}}>Edit</button>
                          <button className="btn btn-danger ms-2" onClick={()=>handleDelete(c._id)}>Delete</button>
                          </td>
                        </tr>    
                      </>
                    ))
                  }
              </tbody>
            </table>
          </div>
        </div>
        <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
        </Modal>
      </div>
    </div>
    </Layout>
  )
}

export default CreateCategory
