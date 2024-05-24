import React, { useState } from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {


  return (
    <>
        <form onSubmit={handleSubmit}>
            <div className="form-group"> 
                <input type="text" className="form-control"  placeholder="Enter new category" value={value} onChange={(e)=>setValue(e.target.value)}/>
            </div>
            <br/>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>  
    </>
  )
}

export default CategoryForm
