export default function SideBard() {
    return (
        <div className="bg-black text-white flex flex-col text-center fixed h-screen w-[260px] px-5 py-4">

            <h1 className="font-bold text-3xl text-[#F33F3F] mb-6">Watchlists</h1>

            {/* Search */}
            <div className="w-full">
                <input
                    placeholder="Search"
                    type="text"
                    className="w-full bg-transparent border border-[#2b2b2b] rounded-lg py-2 px-3 text-sm focus:outline-none"
                />
            </div>

            {/* Menu */}
            <div className="mt-7 w-full flex flex-col gap-3">
                <button className="flex items-center gap-3 bg-[#1e1e1e] py-3 px-4 rounded-lg text-sm">
                    <span>🏠</span> Home
                </button>

                <button className="flex items-center gap-3 py-3 px-4 rounded-lg text-sm">
                    <span>⏱️</span> History
                </button>
            </div>

            {/* Create watchlist */}
            <button className="mt-6 w-full bg-[#F33F3F] py-3 rounded-lg text-sm font-medium">
                + Create watchlist
            </button>

            {/* Divider */}
            <div className="mt-6 w-full border-b border-[#2b2b2b]"></div>

            {/* My Lists */}
            <h3 className="mt-4 mb-2 text-sm font-semibold text-gray-300">My Lists</h3>

            <div className="flex-1"></div> {/* kosong biar footer turun ke bawah */}

            {/* Account */}
            <div className="w-full flex items-center justify-between border border-[#2b2b2b] rounded-lg py-3 px-4 mt-auto">
                <div className="flex items-center gap-3">
                    <span className="text-xl">👤</span>
                    <p className="text-sm">GUEST</p>
                </div>
                <button className="text-xl">⋯</button>
            </div>

        </div>
    );
}
