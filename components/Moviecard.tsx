import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    id: number;
    title: string;
    poster: string;
    date: string;
    rating: number;
}

export default function MovieCard({ id, title, poster, date, rating }: Props) {
    return (
        <Link href={`/movie/${id}`}>
            <div className="w-43 mb-10 text-white">

                {/* Poster */}
                <div className="rounded-xl overflow-hidden bg-[#2b2b2b] h-64 
                hover:scale-105 transition-transform duration-300">

                    {poster ? (
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${poster}`}
                            alt={title}
                            width={300}
                            height={450}
                            className="object-cover h-full w-full"
                        />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            No Image
                        </div>
                    )}
                </div>

                {/* Title */}
                <h2 className="mt-3 font-semibold text-sm line-clamp-1">
                    {title}
                </h2>

                {/* Release date */}
                <p className="text-xs text-gray-400 mt-1">
                    {date}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mt-1 font-semibold text-sm text-yellow-400">
                    <Star size={16} /> {rating.toFixed(1)}
                </div>
            </div>
        </Link>
    );
}
