import { ReactNode } from "react";
import Link from "next/link";
import { FaArrowLeft, FaStore } from "react-icons/fa";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-black">
            {/* Dashboard Header */}
            <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/"
                                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                            >
                                <FaArrowLeft className="h-4 w-4" />
                                <span className="text-sm">Back to Home</span>
                            </Link>
                            <div className="h-6 w-px bg-zinc-800" />
                            <h1 className="text-xl font-bold text-white flex items-center gap-2">
                                <FaStore className="h-5 w-5 text-cyan-400" />
                                Dashboard
                            </h1>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
}
