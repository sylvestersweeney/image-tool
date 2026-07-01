export async function POST(req: Request) {
  const { prompt } = await req.json();
  const r = await fetch("https://fal.run/fal-ai/flux/schnell", {
    method: "POST",
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });
  const data = await r.json();
  return Response.json({ url: data.images?.[0]?.url ?? null });
}
