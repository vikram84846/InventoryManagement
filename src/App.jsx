import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllProducts from './pages/AllProducts.jsx';
import FullHistory from './pages/FullHistory.jsx';
import Profile from './pages/Profile.jsx';
import SearchResult from './pages/SearchResult.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Loading from './components/Loading.jsx';
import NotFound from './pages/NotFound.jsx';
import { ProductContext } from './context/ProductContext.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import getSession from './utils.js';
import SignUpPage from './pages/SignUpPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const { user, setUser } = useContext(ProductContext);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if session cookie exists and set user context accordingly
        const session = getSession();
        if (session) {
            setUser(session);
        }
        setIsLoaded(true);
    }, [setUser]);

    useEffect(() => {
        // Redirect to login if no user context is found and user is trying to access protected routes
        if (isLoaded && !user && window.location.pathname !== '/login') {
            navigate('/login');
        }
    }, [isLoaded, user, navigate]);

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route path="/loading" element={<Loading />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute session={user}>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/"
                element={
                    <PrivateRoute session={user}>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Signup" element={<SignUpPage />} />
            <Route
                path="/products"
                element={
                    <PrivateRoute session={user}>
                        <AllProducts />
                    </PrivateRoute>
                }
            />
             <Route
                    path="/products/:productId"
                    element={
                        <PrivateRoute session={user}>
                            <ProductDetail/>
                        </PrivateRoute>
                    }
                />
            <Route
                path="/history"
                element={
                    <PrivateRoute session={user}>
                        <FullHistory />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute session={user}>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/search"
                element={
                    <PrivateRoute session={user}>
                        <SearchResult />
                    </PrivateRoute>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
