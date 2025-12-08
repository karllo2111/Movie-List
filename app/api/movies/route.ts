import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const apiKey = process.env.TMDB_KEY;

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

    const r = await fetch(url);
    const data = await r.json();
    
    return NextResponse.json(data);

}