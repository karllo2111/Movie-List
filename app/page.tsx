"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/Moviecard";
import SideBar from "@/components/SideBard";
import BottomBar from "@/components/BottomBar";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);


  const loadMovies = async (pageNumber: number) => {
    setLoading(true);

    const res = await fetch(`/api/movies?page=${pageNumber}`, {
      cache: "no-store"
    });

    const data = await res.json();

    setMovies((prev) => [...prev, ...data.results]);

    setLoading(false);
  };

  //kalo ada error itu error gajelas tapi berfungsi
  useEffect(() => {
    loadMovies(1);
  }, []);

  return (
    <div className="flex bg-[#1A1A1A] min-h-screen">
      
      {/* Sidebar */}
      <div className="hidden lg:block">
        <SideBar />
      </div>

      {/* Content */}
      <div className="w-full lg:ml-[260px]">
        {/* Welcome Box */}
        <div className="bg-[#D9D9D919] border border-[#A41B1B] mt-6 lg:mt-10 mx-4 lg:mx-10 rounded-xl p-4 lg:p-6 text-white">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            Welcome to <span className="text-red-500">Mooovies</span>
          </h1>

          <p className="mt-3 text-sm opacity-80">
            Browse movies, add them to watchlists and share them with friends.
          </p>

          <p className="mt-2 text-sm opacity-80">
            Just click the <span className="font-bold">+</span> to add a movie, the
            poster to see more details or <span className="font-bold">✔</span> to
            mark the movie as watched.
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center mt-6 mx-4 lg:mx-10 gap-3">
          <input
            type="text"
            placeholder="Search for movies by title"
            className="w-full bg-[#0F0F0F] border border-gray-700 rounded-lg px-4 py-3 text-sm text-white outline-none"
          />
          <button className="bg-red-500 px-6 py-3 rounded-lg text-sm font-medium">
            Search
          </button>
        </div>

        {/* Title */}
        <h2 className="text-white text-lg lg:text-xl font-semibold mt-8 mx-4 lg:mx-10">
          Popular movies right now
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-4 lg:px-10 py-6">
          {movies.map((m) => (
            <MovieCard
              key={m.id}
              title={m.title}
              poster={m.poster_path}
              date={m.release_date}
              rating={m.vote_average}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="w-full flex justify-center md:mb-10 mb-20">
          <button
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              loadMovies(nextPage);
            }}
            disabled={loading}
            className="bg-red-500 px-6 py-3 rounded-xl text-white disabled:opacity-60 md:w-240 w-100 hover:bg-red-300 transition"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>


        {/* Bottom Bar for Mobile */}
        <BottomBar />
      </div>
    </div>
  );
}
