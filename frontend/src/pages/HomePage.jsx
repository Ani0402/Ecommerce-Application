import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import {REACT_APP_API} from "../constants"
import { Checkbox,Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'

const HomePage = () => {

 const [products,setProducts] = useState([]);
 const [categories,setCategories] = useState([]);
 const [checked,setChecked] = useState([]);
 const [radio,setRadio] = useState([]);
 const [total,setTotal] = useState(0);
 const [page,setPage] = useState(1)
 const [loading,setLoading] = useState(false)
 const {cart,setCart} = useCart()
 const navigate=useNavigate()

  const getTotal=async()=>{
     try{
         const {data}=await axios.get(`${REACT_APP_API}/api/v1/product/product-count`)

         setTotal(data?.total)
     }
     catch(error){
      console.log(error)
      toast.error("Something went wrong when creating category")
     }
  }

  useEffect(()=>{
    if(page===1) return
    loadMore()
  },[page])

  
  const loadMore=async()=>{
     try{
       setLoading(true)
       const {data}=await axios.get(`${REACT_APP_API}/api/v1/product/product-list/${page}`)
       setLoading(false)
       setProducts([...products,...data?.products])
     }
     catch(error){
      console.log(error)
      setLoading(false)
      toast.error("Something went wrong when loading more prods")
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
  const getAllProducts=async()=>{
     try{
        setLoading(true)
       const {data}=await axios.get(`${REACT_APP_API}/api/v1/product/product-list/${page}`)

       setLoading(false)

       setProducts(data.products);
     }
     catch(error){
      console.log(error);
      setLoading(false)
      toast.error("Something went wrong when creating category")
     }
  }

  const handleFilter=(value,id)=>{
    let all=[...checked]

    if(value){
      all.push(id)
    }
    else{
      all=all.filter(c=>(c!==id))
    }

    setChecked(all)
  }

  useEffect(()=>{
    if(!checked.length || !radio.length) getAllProducts()
  },[checked.length,radio.length])

  const filterProduct=async()=>{
      try{
          const {data}=await axios.post(`${REACT_APP_API}/api/v1/product/product-filter`,{checked,radio})
          
          setProducts(data?.products)
      }
      catch(error){
        console.log(error);

      }
  }

  useEffect(()=>{
    if(checked.length || radio.length) filterProduct()
  },[checked,radio])

  useEffect(()=>{
    getAllCategories()
    getTotal()
  },[])

  return (
    <Layout>
      <div className="row mt-3">
         <div className='col-md-3'>
           <h6 className="text-center">Filter By category</h6>
           <div className="d-flex flex-column">
              {
                categories.map(c =>{
                  return(
                    <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
                      {c.name}
                    </Checkbox>
                  )  
                })
              }
           </div>
           
           <h6 className="text-center mt-4">Filter By Price</h6>
           <div className="d-flex flex-column">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {
                   Prices?.map((p)=>(
                    <div>
                      <Radio value={p.array}>{p.name}</Radio>
                    </div>
                   ))
                }
              </Radio.Group>
           </div>

           <div className="d-flex flex-column mt-3">
            <button className="btn btn-danger" onClick={()=>window.location.reload()}>RESET BUTTON</button>
          </div>

         </div>

         <div className='col-md-9'>
           <h1 className="text-center">All Products</h1>
           <div className='d-flex flex-wrap'>
             {
              products?.map((p)=>(
                 <div className="card m-2" style={{width:"18rem"}} key={p._id}>
                   <img src={`${REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name}/>
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description.substring(0,20)}</p>
                    <p className="card-text">&#8377; {p.price}</p>
                    <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                    <button className="btn btn-secondary ms-1" onClick={()=>{
                      setCart([...cart,p])
                      localStorage.setItem('cart',JSON.stringify([...cart,p]))
                      toast.success('Item added to cart')
                    }}>ADD TO CART</button>
                  </div>
                 </div>
              ))
            }
           </div>
           
           <div className="m-2 p-3">
             {products && products.length < total && (
               <button className="btn btn-warning" 
               onClick={(e)=>{
                 e.preventDefault()
                 setPage(page+1)
               }}
               >
                 {loading ? "Loading..." : "LoadMore"}
               </button>
             )}
           </div>
         </div>
      </div>
    </Layout>
  )
}

export default HomePage
