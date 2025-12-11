import { message } from 'antd'
import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const ProductContext = createContext()

const ProductContextProvider = ({children}) => {

    const [products, setProducts ] = useState([])
    const [loading, setLoading ] = useState(false)

    const VITE_API_URL = import.meta.env.VITE_API_URL

    const fetchProducts = async()=>{
         setLoading(true)
         try {
          const res = await axios.get(`${VITE_API_URL}/api/products/products`);
          setProducts(res.data.products || [])
            
         } catch (error) {
            message.error("Error while fetching products")
         }
    }

    const updateProduct = async(productId, formData) =>{

        const token = localStorage.getItem("token")
        if(!token) throw new Error("User not logged in")

      try {
        const config = {headers: {"Content-Type": "multipart/form-data",Authorization: `Bearer ${token}`,},
    };

    const res = await axios.patch(`${VITE_API_URL}/api/products/update/${productId}`, formData, config);

    message.success(res.data.message || "Product updated successfully");
    fetchProducts()
    return res.data.product;
     } catch (error) {
    console.error("Update product error →", error);
    message.error(error.response?.data?.message || "Failed to update product");
    throw error;
     }
    }

      
    const deleteProduct = async(id) =>{
    try {
        const token  = localStorage.getItem("token")
        const res = await axios.delete(`${VITE_API_URL}/api/products/delete/${id}`, {headers:{Authorization:`Bearer ${token}`}})
        message.success("Product deleted successfully")
        fetchProducts()
        } catch (error) {
         console.error("Delete product error:", error);
          message.error(error.response?.data?.message || "Failed to delete product")    
        }
    }  
    useEffect(()=>{
        fetchProducts()
    },[])

  return (
    <ProductContext.Provider value={{loading,products,fetchProducts, updateProduct, deleteProduct}}>
         {children}
    </ProductContext.Provider>
  )
}

export default ProductContextProvider

export const useProductContext = () => useContext(ProductContext)