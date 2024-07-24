import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AllProducts from './pages/AllProducts.jsx';
import FullHistory from './pages/FullHistory.jsx';
import Profile from './pages/Profile.jsx';
import SearchResult from './pages/SearchResult.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Loading from './components/Loading.jsx';
import NotFound from './pages/NotFound.jsx';
import getSession from './utils.js';
import PrivateRoute from './components/PrivateRoute.jsx';

function App() {
    const [state, setState] = useState({ session: null, isLoaded: false });

    useEffect(() => {
        const session = getSession();
        setState({ session, isLoaded: true });
    }, []);

    if (!state.isLoaded) {
        return <Loading />;
    }

    return (
        <Routes>
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                }
            />
            <Route
                path="/products"
                element={
                    <PrivateRoute>
                        <AllProducts />
                    </PrivateRoute>
                }
            />
            <Route
                path="/history"
                element={
                    <PrivateRoute>
                        <FullHistory />
                    </PrivateRoute>
                }
            />
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
            <Route
                path="/search"
                element={
                    <PrivateRoute>
                        <SearchResult />
                    </PrivateRoute>
                }
            />
            <Route path="/loading" element={<Loading />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
