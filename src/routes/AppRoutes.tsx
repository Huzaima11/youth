import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../middleware/ProtectedRoute';
import AuthRoute from '../middleware/AuthRoute';
import { authRoutes, protectedRoutes } from './config';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Default redirect */}
                <Route path="/" element={<Navigate to="/dashboard" replace />} />

                {/* Dynamic Auth Routes */}
                {authRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <AuthRoute>
                                <route.component />
                            </AuthRoute>
                        }
                    />
                ))}

                {/* Dynamic Protected Routes */}
                {protectedRoutes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <ProtectedRoute>
                                <route.component />
                            </ProtectedRoute>
                        }
                    />
                ))}

                {/* 404 Route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;