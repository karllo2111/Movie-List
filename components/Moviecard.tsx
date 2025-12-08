import Image from "next/image";

interface Props {
    title: string;
    poster: string;
    date: string;
    rating: number;
}

export default function MovieCard({ title, poster, date, rating }: Props) {
    return (
        <div className="bg-amber-500 p-4 rounded-xl w-50 h-110 mb-10 ">
            <div className="rounded-lg overflow-hidden bg-gray-200 aspect-2/3 hover:scale-110 transition-transform">
                {poster ? (
                    <Image
                        src={`https://image.tmdb.org/t/p/w500${poster}`}
                        alt={title}
                        width={220}
                        height={330}
                        className="object-cover"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                        No Image
                    </div>
                )}
            </div>

            <h2 className="mt-3 font-semibold">{title}</h2>
            <p className="text-sm text-gray-800">{date}</p>

            <div className="mt-1 font-bold">
                ⭐ {rating.toFixed(1)}
            </div>
        </div>
    );
}
