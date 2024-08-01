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
import Logout from './components/Logout.jsx';
import LogoutPage from './pages/LogoutPage.jsx';
import VerifyEmail from './functionality/VerifyEmail.jsx';
import CategoryDetail from './pages/CategoryDetail.jsx';

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
        if (isLoaded && !user
            && !['/login', '/signup', '/logout', '/verify-email', '/profile'].includes(window.location.pathname)) {
            navigate('/login');
        }
    }, [isLoaded, user, navigate]);

    if (!isLoaded) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route path="/loading" element={<Loading />} />
            <Route path="/Signup" element={<SignUpPage />} />
            <Route path="/logout" element={<LogoutPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

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
                        <ProductDetail />
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
                path="/Category/:categoryId"
                element={
                    <PrivateRoute session={user}>
                        <CategoryDetail />
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
