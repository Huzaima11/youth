import Sidebar from '@/components/template/Sidebar';
import React, { ReactNode, useState } from 'react';
import { Header } from '@/components/template/Header';


interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

    return (
        <div className="flex h-screen bg-white">
            <Sidebar isOpen={sidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header handleToggle={() => setSidebarOpen(!sidebarOpen)} isOpen={sidebarOpen} />
                <main className="flex-1 overflow-y-auto p-6 bg-white">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;