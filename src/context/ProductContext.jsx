import React, { createContext, useState, useEffect } from 'react';
import { listCategory, listProducts, showHistory, getLocation } from '../appwrite/Services';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [history, setHistory] = useState([]);
  const [wareHouse, setWarehouse] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [user, setUser] = useState(null)
  

  const fetchProducts = async () => {
    try {
      const data = await listProducts();
      const filteredProducts = data.documents.filter(product =>
        product.location.some(loc => loc.$id === selectedRoomId?.$id)
      );
      setProducts(filteredProducts);
      // console.log('Filtered Products:', filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await listCategory();
      setCategory(data.documents);
      // console.log('Categories:', data.documents);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const data = await showHistory();
      setHistory(data.documents);

      // console.log('History:', data.documents);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const fetchWareHouse = async () => {
    try {
      const data = await getLocation();
      setWarehouse(data.documents); // Assuming `data.documents` contains the array of locations
      // console.log('Location:', data.documents);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchHistory();
    fetchWareHouse();
  }, [selectedRoomId]);

  return (
    <ProductContext.Provider value={{
      products,
      fetchProducts,
      category,
      fetchCategories,
      history,
      fetchHistory,
      fetchWareHouse,
      wareHouse,
      setWarehouse,
      selectedRoomId,
      setSelectedRoomId,
      user,
      setUser
    }}>
      {children}
    </ProductContext.Provider>
  );
};
