import {
    Squares2X2Icon,
    TableCellsIcon,
    DocumentTextIcon,
    ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "@/components/ui";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    const { logout } = useAuthContext();
    const navigate = useNavigate();

    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: Squares2X2Icon, path: "/dashboard" },
        { id: "wallet", label: "Wallet", icon: TableCellsIcon, path: "/wallet" },
        // { id: "form", label: "Form", icon: DocumentTextIcon, path: "/form" },
        { id: "batches", label: "Batches", icon: DocumentTextIcon, path: "/batches" },
    ];

    const handleLogout = () => {
        navigate("/login")
        logout();
    };

    return (
        <div

            className={clsx(
                "prime-panel flex transition-content h-full flex-col dark:border-dark-600/80 ltr:border-r rtl:border-l",
                isOpen ? 'w-70' : 'w-0'
            )}
            style={{ backgroundColor: '#0e0d13' }}
        >
            <div
                className={clsx(
                    "flex h-full text-white grow flex-col ltr:pl-(--main-panel-width) rtl:pr-(--main-panel-width) ",
                )}
            >
                <div className=" flex h-18 w-full shrink-0 items-center justify-between pl-4 pr-1 rtl:pl-1 rtl:pr-4 ">
                    <p className="truncate text-lg tracking-wider text-white dark:text-dark-100">
                        Youth Academy
                    </p>

                </div>
                {
                    navItems.map((item, index) => {
                        return (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    clsx(
                                        "outline-hidden transition-colors duration-300 ease-in-out px-4 text-lg",
                                        isActive
                                            ? "font-medium text-white dark:text-primary-400"
                                            : "text-[#9a9cae] dark:text-dark-200 dark:hover:text-dark-50",
                                    )
                                }
                            >

                                <div

                                    className="flex items-center gap-2 text-sm-plus tracking-wide py-2"
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span className="truncate">{item.label}</span>
                                </div>
                            </NavLink>
                        )
                    })
                }


            </div>

            <Button
                onClick={handleLogout}
                variant="soft"
                className="p-0 m-0 mb-5 h-auto py-3 px-4 w-full justify-start bg-transparent rounded-none hover:text-white"
            >
                <div className="flex items-center gap-2 text-sm-plus tracking-wide text-[#9a9cae] hover:text-white">
                    <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
                    <span className="truncate">Logout</span>
                </div>
            </Button>


        </div>
    );
};

export default Sidebar;
