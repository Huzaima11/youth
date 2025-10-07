// Import Dependencies
import clsx from "clsx";

// ----------------------------------------------------------------------

export interface IProps {
    handleToggle: () => void
    isOpen: boolean
}

export function SidebarToggleBtn({ handleToggle, isOpen }: IProps) {
    console.log("isOpen", isOpen);

    return (
        <button
            onClick={handleToggle}
            className={clsx(
                isOpen && "active",
                "sidebar-toggle-btn cursor-pointer flex size-7 flex-col justify-center space-y-1.5 text-primary-600 outline-hidden focus:outline-hidden dark:text-primary-400 ltr:ml-0.5 rtl:mr-0.5",
            )}
        >
            <span />
            <span />
            <span />
        </button>
    );
}
