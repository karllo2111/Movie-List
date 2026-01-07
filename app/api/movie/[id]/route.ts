import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID missing" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return NextResponse.json({ error: "Movie not found" }, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}