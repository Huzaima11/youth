import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { SplashScreen } from '@/components/template/SplashScreen';

interface AuthRouteProps {
    children: ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
    const { isAuthenticated, loading } = useAuthContext();

    if (loading) {
        return (
            <SplashScreen />
        );
    }

    if (isAuthenticated()) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
};

export default AuthRoute;