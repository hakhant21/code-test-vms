import { Link } from "@inertiajs/react";
import { ToastContainer } from "react-toastify";

export default function GuestLayout({ children }) {
    return (
        <div className="max-w-7xl mx-auto my-6">
            <nav className="flex items-center justify-between">
                <Link href="/">VMS</Link>

                <div className="flex items-center">
                    <div className="px-2">
                        <Link href={route("login")}>Login</Link>
                    </div>
                    <div className="px-2">
                        <Link href={route("register")}>Register</Link>
                    </div>
                </div>
            </nav>
            <main className="my-6">
                <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {children}
            </main>
        </div>
    );
}
