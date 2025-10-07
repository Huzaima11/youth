import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tokenStorage } from '@/utils/storage';


export interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
    loading: boolean;
    isAuthenticated: () => boolean;
}



const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const initAuth = (): void => {
            const savedToken = tokenStorage.get();

            if (savedToken) {
                setToken(savedToken);
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (authToken: string): void => {
        tokenStorage.set(authToken);
        setToken(authToken);
    };

    const logout = (): void => {
        tokenStorage.remove();
        setToken(null);

    };

    const isAuthenticated = (): boolean => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{
            token,
            login,
            logout,
            loading,
            isAuthenticated
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};