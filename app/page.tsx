"use client";
import { useState } from "react";

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const go = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setUrl(null);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setUrl(data.url);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", fontFamily: "system-ui", padding: 16 }}>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe the image…"
        style={{ width: "100%", padding: 12, boxSizing: "border-box" }}
      />
      <button onClick={go} disabled={loading}
        style={{ padding: "12px 20px", marginTop: 8, cursor: "pointer" }}>
        {loading ? "Generating…" : "Generate"}
      </button>
      {url && <img src={url} alt="" style={{ width: "100%", marginTop: 16, borderRadius: 8 }} />}
    </div>
  );
}
