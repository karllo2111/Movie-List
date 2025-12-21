"use client";

import { History, House, User, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomBar() {
    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path ? "text-[#F33F3F]" : "text-gray-400";

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-[#2b2b2b] flex justify-around items-center py-2 lg:hidden">
            <Link href="/" className={`flex flex-col items-center text-xs ${isActive("/")}`}>
                <House size={20} />
                Home
            </Link>

            <Link
                href="/History"
                className={`flex flex-col items-center text-xs ${isActive("/History")}`}
            >
                <History size={20} />
                History
            </Link>

            {/* Action utama */}
            <Link
                href="/Watchlist"
                className={`flex flex-col items-center text-xs ${isActive("/Watchlist")}`}
            >
                <Plus size={22} />
                Add
            </Link>

            <Link
                href="/Profile"
                className={`flex flex-col items-center text-xs ${isActive("/Profile")}`}
            >
                <User size={20} />
                Profile
            </Link>
        </div>
    );
}
