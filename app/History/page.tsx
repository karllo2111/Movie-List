"use client";

import SideBar from "@/components/SideBard"
import BottomBar from "@/components/BottomBar";


export default function History() {
    return (
        <div className="bg-[#1A1A1A] min-h-screen min-w-screen">

            {/* Sidebar */}
            <div className="hidden lg:block">
                <SideBar />
            </div>

            <h1 className="font-bold ml-150 font text-3xl text-[#F33F3F] mb-6">History</h1>

            {/* Bottom Bar for Mobile */}
            <BottomBar />
        </div>
    )
}