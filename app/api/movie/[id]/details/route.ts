import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ error: "ID missing" }, { status: 400 });
  }

  // Tambahkan append_to_response untuk mengambil data tambahan sekaligus
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_KEY}&append_to_response=credits,recommendations,videos`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    const errorData = await res.json();
    return NextResponse.json(
      { error: errorData.status_message || "Movie not found" }, 
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}