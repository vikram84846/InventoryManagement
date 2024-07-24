import React from 'react';
import { Navigate } from 'react-router-dom';
import getSession from '../utils'; // Adjust the import path as necessary

const PrivateRoute = ({ children }) => {
    const session = getSession();
    return session && session.$id ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
