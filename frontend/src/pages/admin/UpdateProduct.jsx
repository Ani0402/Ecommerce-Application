import React,{useState,useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import {REACT_APP_API} from "../../constants"
import { Select } from 'antd'
import { useNavigate,useParams } from 'react-router-dom'

function UpdateProduct() {

    const [categories,setCategories]=useState([])
    const [name,setName] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [photo,setPhoto] = useState("")
    const [category,setCategory] = useState("")
    const [quantity,setQuantity]= useState("")
    const [shipping,setShipping] = useState(false)
    const [id,setId] = useState("")

    const navigate=useNavigate()
    const params=useParams()


    const getSingleProduct=async()=>{
        try{
            const {data}  =await axios.get(`${REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            
            console.log(data.product)
            setName(data.product?.name)
            setDescription(data.product?.description)
            setPrice(data.product?.price)
            setQuantity(data.product?.quantity)
            setCategory(data.product?.category?._id)
            setId(data.product?._id)
        }
        catch(error){
            console.log(error)
            toast.error("Something went wrong when fetching single product")
        }
    }
  

    useEffect(()=>{
        getSingleProduct()
    },[])


    const handleUpdate=async()=>{
       try{
          const productData = new FormData();
          productData.append("name", name);
          productData.append("description", description);
          productData.append("price", price);
          productData.append("quantity", quantity);
          photo && productData.append("photo", photo);
          productData.append("category", category);
          productData.append("shipping",shipping);

          const {data}=await axios.put(`${REACT_APP_API}/api/v1/product/update-product/${id}`,productData)
  
          if(data?.success){
            toast.success(data?.message)
            
          }
          else{
            toast.error(data?.message)
          }
       }
       catch(error){
        console.log(error)
        toast.error("Something went wrong when creating category")
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
  
  const deleteProduct=async()=>{
    try{
      let answer=window.prompt("Are you sure you want to delete?")

      if(!answer){
        return 
      }

      const {data}  =await axios.delete(`${REACT_APP_API}/api/v1/product/delete-product/${id}`)

      if(data?.success){
        toast.success(data?.message) 
        navigate('/dashboard/admin/products')
      }
      else{
        toast.error(data?.message)
      }
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong when deleting product")
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
          <AdminMenu/>
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              <Select placeholder="Select a category" size="large" showSearch className="form-select mb-3" onChange={(value)=>{setCategory(value)}}
               value={category}
              >
                {
                  categories?.map(c =>(
                    <Option key={c._id} value={c._id}>{c.name}</Option>
                  ))
                }
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {photo ? photo.name : "Upload Photo"}
                <input type="file" name="photo" accept="image/*" onChange={(e)=> setPhoto(e.target.files[0])} hidden></input>
                </label>
              </div>
              <div className="mb-3">
              {photo ? (
                <div className="text-center">
                
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`/api/v1/product/product-photo/${id}`}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}
              </div>
               
              
              <div className="mb-3">
              <input type="text" value={name} placeholder="Enter Name" className="form-control" onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
              <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
            </div>

          <div className="mb-3">
            <input type="text" value={price} placeholder="Enter Price" className="form-control" onChange={(e)=>setPrice(e.target.value)}/>
          </div>

          <div className="mb-3">
            <input
            type="number"
            value={quantity}
            placeholder="write a quantity"
            className="form-control"
            onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

              <div className="mb-3">
                <Select
                variant={false}
                placeholder="Select Shipping "
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => {
                    setShipping(value === "1"); // Set shipping to true for value "1"
                  }}
                  value={shipping ? "1" : "0"}
                >
                  <Select.Option value="0">No</Select.Option>
                  <Select.Option value="1">Yes</Select.Option>
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit" onClick={handleUpdate}>Update Product</button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" type="submit" onClick={deleteProduct}>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
