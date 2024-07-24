import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, session }) => {
    if (session === null) {
        // If session is being loaded, show the loading page
        return <Navigate to="/login" replace />;
    }
    return session && session.$id ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
