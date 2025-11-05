import {
    Squares2X2Icon,
    DocumentTextIcon,
    ArrowRightStartOnRectangleIcon,
    ChartBarIcon,
    MegaphoneIcon,
    MapIcon,
    UserIcon,
    AcademicCapIcon,
    PencilSquareIcon,
    HeartIcon,
    UserGroupIcon,
    BriefcaseIcon,
    VideoCameraIcon,
    ClipboardDocumentListIcon,
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
        { id: "batches", label: "Batches", icon: DocumentTextIcon, path: "/batches" },
        { id: "personal", label: "Personal", icon: Squares2X2Icon, path: "/personal" },
        { id: "cms-analytics", label: "CMS Analytics", icon: ChartBarIcon, path: "/cms-analytics" },
        { id: "influencer", label: "Influencer", icon: MegaphoneIcon, path: "/influencer" },
        { id: "travel", label: "Travel", icon: MapIcon, path: "/travel" },
        { id: "teacher", label: "Teacher", icon: UserIcon, path: "/teacher" },
        { id: "education", label: "Education", icon: AcademicCapIcon, path: "/education" },
        { id: "authors", label: "Authors", icon: PencilSquareIcon, path: "/authors" },
        { id: "doctor", label: "Doctor", icon: HeartIcon, path: "/doctor" },
        { id: "employees", label: "Employees", icon: UserGroupIcon, path: "/employees" },
        { id: "workspaces", label: "Workspaces", icon: BriefcaseIcon, path: "/workspaces" },
        { id: "meetings", label: "Meetings", icon: VideoCameraIcon, path: "/meetings" },
        { id: "projects-board", label: "Projects Board", icon: ClipboardDocumentListIcon, path: "/projects-board" },
    ];

    const handleLogout = () => {
        navigate("/login")
        logout();
    };

    return (
        <div
            className={clsx(
                "prime-panel flex transition-content h-full flex-col bg-white dark:bg-dark-900 ltr:border-r rtl:border-l border-gray-200",
                isOpen ? 'w-70' : 'w-0'
            )}
        >
            <div className="flex h-full flex-col">
                {/* Sticky Header */}
                <div className="sticky top-0 z-10 bg-white flex h-16 w-full shrink-0 items-center justify-between pl-4 pr-1 rtl:pl-1 rtl:pr-4 border-b border-gray-100">
                    <p className="truncate text-lg font-semibold tracking-wider text-gray-900">
                        Youth Academy
                    </p>
                </div>

                {/* Scrollable Navigation */}
                <div
                    className="flex-1 overflow-y-auto px-3 py-4 space-y-1"
                    style={{
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#9ca3af #f9fafb'
                    }}
                >
                    <style>{`
                        .flex-1.overflow-y-auto::-webkit-scrollbar {
                            width: 6px;
                        }
                        .flex-1.overflow-y-auto::-webkit-scrollbar-track {
                            background: #f9fafb;
                            border-radius: 4px;
                        }
                        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb {
                            background: #9ca3af;
                            border-radius: 4px;
                        }
                        .flex-1.overflow-y-auto::-webkit-scrollbar-thumb:hover {
                            background: #6b7280;
                        }
                    `}</style>
                    {navItems.map((item, index) => (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                clsx(
                                    "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 outline-none",
                                    isActive
                                        ? " text-primary-700 font-semibold"
                                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon
                                        className={clsx(
                                            "h-5 w-5 transition-colors",
                                            isActive ? "text-primary-700" : "text-gray-500 group-hover:text-gray-700"
                                        )}
                                    />
                                    <span className="truncate">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 p-3">
                    <Button
                        onClick={handleLogout}
                        variant="soft"
                        className="w-full justify-start gap-3 bg-transparent hover:bg-gray-50 text-gray-700 hover:text-gray-900 rounded-lg px-3 py-2.5 h-auto transition-all duration-200"
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium">Logout</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;