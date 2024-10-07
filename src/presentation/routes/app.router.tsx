import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from '../pages/login/login.page';
import NotFoundPage from '../pages/notFound/notFound.page';
import Layout from '../pages/home/layout/layout';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/homePage" element={<Layout/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Routes>
        </Router>
    );
};

export default AppRouter;