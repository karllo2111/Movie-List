"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, Clock, Calendar } from "lucide-react";

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    fetch(`/api/movie/${id}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load movie");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="p-10 text-white">Loading...</div>;
  if (error || !movie) return <div className="p-10 text-red-500">{error}</div>;

  return (
    <div className="text-white bg-black min-h-screen">
      {movie.backdrop_path && (
        <div className="relative h-[450px] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              width={300}
              height={450}
              className="rounded-2xl shadow-2xl border border-white/10"
            />
          </div>

          <div className="flex flex-col justify-end">
            <h1 className="text-5xl font-bold leading-tight">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-5 mt-4 text-gray-300">
              <span className="flex items-center gap-1.5"><Calendar size={18}/> {movie.release_date}</span>
              <span className="flex items-center gap-1.5"><Clock size={18}/> {movie.runtime}m</span>
              <span className="flex items-center gap-1.5 text-yellow-400">
                <Star size={18} fill="currentColor"/> {movie.vote_average?.toFixed(1)}
              </span>
            </div>

            <div className="flex gap-2 mt-6">
              {movie.genres?.map((g: any) => (
                <span key={g.id} className="px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-sm">
                  {g.name}
                </span>
              ))}
            </div>

            <p className="mt-8 text-lg text-gray-300 leading-relaxed max-w-3xl">
              {movie.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}