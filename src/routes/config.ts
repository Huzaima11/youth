import Forget from "@/app/Auth/Forget";
import LoginIn from "@/app/Auth/Login";
import Register from "@/app/Auth/Register";
import Batches from "@/app/Protected/Batches";
import BatchesDetail from "@/app/Protected/BatchesDetail";
import Dashboard from "@/app/Protected/Dashboard";
import Form from "@/app/Protected/Form";
import WalletScreen from "@/app/Protected/Wallet";
import OrdersTable from "@/app/Protected/Wallet";
import { ComponentType } from "react";


export interface RouteConfig {
    path: string;
    name: string;
    icon?: any;
    component: ComponentType;
}


export const authRoutes: RouteConfig[] = [
    {
        path: '/login',
        name: 'Login',
        component: LoginIn
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/forget',
        name: 'Forgot Password',
        component: Forget
    }
];

// Protected Routes Configuration
export const protectedRoutes: RouteConfig[] = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/wallet',
        name: 'wallet',
        component: WalletScreen
    },
    // {
    //     path: '/form',
    //     name: 'Form',
    //     component: Form
    // },
    {
        path: '/batches',
        name: 'Batches',
        component: Batches
    },
    {
        path: '/batch-detail',
        name: 'Batch-detail',
        component: BatchesDetail
    },

];
