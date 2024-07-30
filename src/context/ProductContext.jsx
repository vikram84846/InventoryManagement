import React, { createContext, useState, useEffect } from 'react';
import { db } from '../appwrite/appwriteService';
import { Query } from "appwrite";
import getSession from '../utils';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [history, setHistory] = useState([]);
  const [wareHouse, setWarehouse] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [user, setUser] = useState(null);

  const session = getSession(); // Get session from cookies or similar
  const userId = session?.$id || user?.$id; // Get user ID from context or session

  const fetchProducts = async () => {
    try {
      if (!userId) {
        throw new Error("User ID not found");
      }

      const data = await db.products.list([
        Query.equal('userId', userId), // Assuming 'userId' is the field name in your collection
        Query.orderDesc('$createdAt')
      ]);
      const filteredProducts = data.documents.filter(product =>
        product.location.some(loc => loc.$id === selectedRoomId?.$id)
      );
      setProducts(filteredProducts);
      // console.log('Filtered Products:', filteredProducts);
    } catch (error) {
      // console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await db.categories.list([
        Query.orderAsc('$createdAt'),
        Query.equal('userId', userId) // Assuming 'userId' is the field name in your collection
      ]); // Ascending order
      setCategory(data.documents);
      // console.log('Categories:', data.documents);
    } catch (error) {
      // console.error('Error fetching categories:', error);
    }
  };

  const fetchHistory = async () => {
    try {
      const data = await db.history.list([
        Query.orderDesc('$createdAt'),
        Query.equal('userId', userId) // Assuming 'userId' is the field name in your collection
      ]); // Descending order
      setHistory(data.documents);
      // console.log('History:', data.documents);
    } catch (error) {
      // console.error('Error fetching history:', error);
    }
  };

  const fetchWareHouse = async () => {
    try {
      const data = await db.locations.list([
        Query.orderAsc('$createdAt'),
        Query.equal('userId', userId)
      ]); // Ascending order
      setWarehouse(data.documents); // Assuming `data.documents` contains the array of locations
      // console.log('Location:', data.documents);
    } catch (error) {
      // console.error('Error fetching location:', error);
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
