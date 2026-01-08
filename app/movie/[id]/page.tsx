"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Star, Play, User, X, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

// --- Types untuk ESLint Safety ---
interface Genre { id: number; name: string; }
interface Company { name: string; }
interface Cast { id: number; name: string; character: string; profile_path: string; }
interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  budget: number;
  revenue: number;
  status: string;
  origin_country: string[];
  tagline: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  genres: Genre[];
  overview: string;
  original_language: string;
  production_companies: Company[];
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<Cast[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();


  useEffect(() => {
    if (!id) return;

    const getFullData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/movie/${id}/details`);
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          // Data utama
          setMovie(data);

          // Data dari append_to_response
          setCast(data.credits?.cast || []);
          setRecommendations(data.recommendations?.results || []);

          // Cari trailer YouTube
          const video = data.videos?.results?.find(
            (v: { type: string; site: string }) => v.type === "Trailer" && v.site === "YouTube"
          );
          setTrailer(video?.key || null);
        }
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getFullData();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-600 font-bold">LOADING...</div>;
  if (error || !movie) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-red-500">{error}</div>;

  return (
    <div className="text-white bg-[#0a0a0a] min-h-screen font-sans selection:bg-red-600/30 pb-20">

      {/* 1. Floating Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-[90] p-3 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full hover:bg-red-600 transition-all group shadow-2xl"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Modal Trailer (Tetap sama) */}
      {isModalOpen && trailer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-4">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden border border-red-600/30">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 z-10 bg-red-600 p-2 rounded-full shadow-lg"
            >
              <X size={20} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${trailer}?autoplay=1`}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* 2. Hero Banner - Tinggi dikurangi di mobile */}
      <div className="relative h-[50vh] md:h-[65vh] w-full overflow-hidden">
        {movie.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover opacity-40"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
      </div>

      {/* 3. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-32 md:-mt-72 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">

          {/* Left Column: Poster - Center di mobile */}
          <div className="flex-shrink-0 w-full max-w-[240px] md:max-w-[350px] mx-auto lg:mx-0">
            <div className="relative rounded-2xl shadow-2xl border border-red-600/20 overflow-hidden bg-black">
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={400}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Stats Bar - Lebih rapi di mobile */}
            <div className="grid grid-cols-2 gap-2 mt-4 md:mt-6">
              <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 text-center">
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1">Budget</p>
                <p className="font-bold text-xs md:text-sm text-gray-200">${(movie.budget / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-white/5 p-3 md:p-4 rounded-xl border border-white/5 text-center">
                <p className="text-[9px] md:text-[10px] text-gray-500 uppercase tracking-widest mb-1">Revenue</p>
                <p className="font-bold text-xs md:text-sm text-green-500">${(movie.revenue / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            {trailer && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 md:mt-6 flex items-center justify-center gap-2 w-full py-3 md:py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest rounded-xl transition-all text-xs md:text-base"
              >
                <Play size={18} fill="currentColor" /> Play Trailer
              </button>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex-1 mt-4 md:mt-16 overflow-hidden w-full">
            <div className="flex items-center gap-3 mb-3 md:mb-4">
              <span className="px-2 py-0.5 md:px-3 md:py-1 bg-red-600 text-white text-[9px] md:text-[10px] font-black rounded uppercase tracking-tighter">
                {movie.status}
              </span>
              <span className="text-gray-500 text-xs md:text-sm font-medium">• {movie.origin_country?.[0]}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight text-center lg:text-left">
              {movie.title}
            </h1>

            {/* Info Bar - Horizontal Scroll di mobile */}
            <div className="flex overflow-x-auto scrollbar-hide gap-6 md:gap-8 mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 flex-shrink-0">
                <Star size={18} className="text-red-600" fill="currentColor" />
                <span className="text-lg font-bold">{movie.vote_average?.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 flex-shrink-0">
                <Clock size={18} className="text-red-600" />
                <span className="text-sm md:text-base">{movie.runtime} Min</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 flex-shrink-0">
                <Calendar size={18} className="text-red-600" />
                <span className="text-sm md:text-base">{movie.release_date?.split('-')[0]}</span>
              </div>
            </div>

            <div className="space-y-12">
              <div>
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-red-600 font-black mb-4">Synopsis</h2>
                <p className="text-base md:text-lg text-gray-400 leading-relaxed">{movie.overview}</p>
              </div>

              {/* 4. CAST SECTION (Optimized Snap Scroll) */}
              <div>
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-red-600 font-black mb-6 flex items-center gap-2">
                  <User size={14} /> Top Cast
                </h2>
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
                  {cast.slice(0, 15).map((person) => (
                    <div key={person.id} className="flex-shrink-0 w-28 md:w-32 snap-start group">
                      <div className="relative h-36 md:h-40 w-full rounded-xl overflow-hidden mb-2 grayscale group-hover:grayscale-0 transition-all border border-white/5">
                        {person.profile_path ? (
                          <Image src={`https://image.tmdb.org/t/p/w185${person.profile_path}`} alt={person.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-white/5 flex items-center justify-center text-gray-700">?</div>
                        )}
                      </div>
                      <p className="text-[11px] md:text-xs font-bold truncate">{person.name}</p>
                      <p className="text-[9px] md:text-[10px] text-gray-500 truncate">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. RECOMMENDATIONS SECTION (Optimized Snap Scroll) */}
              <div>
                <h2 className="text-[10px] md:text-xs uppercase tracking-[0.4em] text-red-600 font-black mb-6">You Might Also Like</h2>
                <div className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0">
                  {recommendations.slice(0, 15).map((rec) => (
                    <div
                      key={rec.id}
                      onClick={() => window.location.href = `/movie/${rec.id}`}
                      className="flex-shrink-0 w-36 md:w-44 group cursor-pointer snap-start"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/5 mb-2 group-hover:border-red-600 transition-all duration-300">
                        <Image
                          src={`https://image.tmdb.org/t/p/w342${rec.poster_path}`}
                          alt={rec.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <p className="text-[11px] md:text-sm font-bold truncate">{rec.title}</p>
                      <p className="text-[9px] md:text-xs text-gray-500">{rec.release_date?.split('-')[0]}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}