"use client";

import { useEffect, useState } from "react";
import MovieCard from "@/components/Moviecard";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadMovies = async () => {
      const res = await fetch("/api/movies", { cache: "no-store" }); 
      const data = await res.json();
      setMovies(data.results);
    };

    loadMovies();
  }, []);

  return (
    <div className="flex flex-wrap justify-around md:justify-between">
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
  );
}
