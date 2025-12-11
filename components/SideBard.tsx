import { History, House, User, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideBard() {

    const pathname = usePathname();

    const isActive = (path: string) =>
        pathname === path
            ? "bg-[#2e2e2e] text-white"
            : "text-gray-400";

    return (
        <div className="bg-black text-white flex flex-col  fixed h-screen w-[260px] px-5 py-4">
            <h1 className="font-bold font text-3xl text-[#F33F3F] mb-6">Mooovies</h1>

            <div className="w-full flex">
                <input
                    placeholder="Search"
                    type="text"
                    className="w-full bg-transparent border border-[#2b2b2b] rounded-lg py-2 px-3 text-sm focus:outline-none"
                />
            </div>

            <div className="mt-7 w-full flex flex-col gap-3">
                <Link
                    href={"/"}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#2e2e2e] hover:text-white text-sm transition ${isActive("/")}`}
                >
                    <span><House size={19} /></span> Home
                </Link>

                <Link
                    href={"/History"}
                    className={`flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-[#2e2e2e] hover:text-white text-sm transition ${isActive("/History")}`}
                >
                    <span><History size={19} /></span> History
                </Link>
            </div>

            <Link 
                href={"/Watchlist"}
                className="group mt-6 w-full bg-[#F33F3F] py-3 rounded-lg text-sm font-medium flex items-center justify-center relative overflow-hidden">
                <span
                    className="
                                transition-all duration-300
                                group-hover:-translate-y-3
                                group-hover:opacity-0
                            "
                >
                    <Plus size={20} />
                </span>

                <span
                    className="
                                absolute
                                translate-y-3 opacity-0
                                transition-all duration-300
                                group-hover:translate-y-0
                                group-hover:opacity-100
                            "
                >
                    Create watchlist
                </span>

            </Link>

            <div className="mt-6 w-full border-b border-[#2b2b2b]"></div>
            <h3 className="mt-4 mb-2 text-sm font-semibold text-gray-300">My Lists</h3>
            <div className="flex-1"></div> {/* kosong biar footer turun ke bawah */}

            <div className="w-full flex items-center justify-between border border-[#2b2b2b] rounded-lg py-3 px-4 mt-auto">
                <div className="flex items-center gap-3">
                    <span className="text-xl"><User /></span>
                    <p className="text-sm">GUEST</p>
                </div>
                <button className="text-xl">⋯</button>
            </div>

        </div>
    );
}
