export const dynamic = "force-dynamic";
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) return Response.json({ error: "Product not found" }, { status: 404 });
  try {
    const response = await fetch(`${process.env.API_URL || "http://localhost:8000"}/api/v1/products/${id}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
    if (response.status === 404) return Response.json({ error: "Product not found" }, { status: 404 });
    if (!response.ok) return Response.json({ error: "Catalog unavailable" }, { status: 502 });
    return Response.json(await response.json(), { headers: { "Cache-Control": "no-store" } });
  } catch { return Response.json({ error: "Catalog unavailable" }, { status: 502 }); }
}
