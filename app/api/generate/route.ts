export const maxDuration = 60;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function POST(req: Request) {
  try {
    const { prompt, images } = await req.json();

    if (!prompt || !prompt.trim()) {
      return Response.json({ url: null, error: "Add a prompt." }, { status: 400, headers: cors });
    }

    const hasImages = Array.isArray(images) && images.length > 0;
    const endpoint = hasImages
      ? "https://fal.run/fal-ai/nano-banana/edit"
      : "https://fal.run/fal-ai/nano-banana";
    const payload = hasImages ? { prompt, image_urls: images } : { prompt };

    const r = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();

    if (!r.ok) {
      return Response.json(
        { url: null, error: data?.detail || "Generation failed." },
        { status: 502, headers: cors }
      );
    }

    return Response.json({ url: data.images?.[0]?.url ?? null }, { headers: cors });
  } catch (e) {
    return Response.json({ url: null, error: "Something went wrong." }, { status: 500, headers: cors });
  }
}
