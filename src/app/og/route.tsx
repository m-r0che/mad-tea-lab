import { ImageResponse } from "next/og";

export const runtime = "nodejs";
const size = { width: 1200, height: 630 };

const PARCHMENT = "#f4e9d1";
const PARCHMENT_LIGHT = "#fbf3dc";
const TEA_BROWN_DEEP = "#5c2410";
const TEA_BROWN = "#8b3a1f";
const INK = "#2a1e2f";
const TEA_LIQUID = "#a0522d";

async function loadFont(family: string, weight: number, italic = false) {
  const axes = italic ? `ital,wght@1,${weight}` : `wght@${weight}`;
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${axes}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    },
  }).then((r) => r.text());

  // Google returns multiple @font-face blocks separated by /* subset */ comments.
  // Prefer the 'latin' subset; fall back to the first url() we can find.
  const blocks = css.split(/\/\*\s*([^*]+?)\s*\*\//);
  for (let i = 1; i < blocks.length; i += 2) {
    if (blocks[i] === "latin") {
      const m = blocks[i + 1]?.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format/);
      if (m) return fetch(m[1]).then((r) => r.arrayBuffer());
    }
  }
  const m = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format/);
  if (!m) throw new Error(`Could not find font src in ${url}`);
  return fetch(m[1]).then((r) => r.arrayBuffer());
}

export async function GET() {
  const [playfair700i, playfair400i, caveat400] = await Promise.all([
    loadFont("Playfair Display", 700, true),
    loadFont("Playfair Display", 400, true),
    loadFont("Caveat", 400),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: PARCHMENT,
          backgroundImage:
            "radial-gradient(ellipse 700px 320px at 18% 18%, rgba(139,58,31,0.10), transparent 65%), radial-gradient(ellipse 600px 320px at 86% 82%, rgba(62,94,58,0.08), transparent 70%)",
          color: INK,
          fontFamily: "Playfair Display",
          padding: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 116,
            fontStyle: "italic",
            fontWeight: 700,
            color: TEA_BROWN_DEEP,
            lineHeight: 1,
          }}
        >
          The Mad Tea Lab
        </div>

        <svg
          width="360"
          height="22"
          viewBox="0 0 360 22"
          fill="none"
          stroke={INK}
          strokeOpacity="0.7"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ marginTop: 18, marginBottom: 28 }}
        >
          <path d="M10 11 q 42 -13 84 0 q 42 13 84 0 q 42 -13 84 0 q 28 8 56 0" />
          <circle cx="180" cy="11" r="3.2" fill={INK} fillOpacity="0.7" />
        </svg>

        {/* Hero teacup with steam */}
        <svg
          width="280"
          height="240"
          viewBox="0 0 200 200"
          fill="none"
          stroke={INK}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        >
          {/* Steam wisps */}
          <g strokeOpacity="0.6">
            <path d="M78 50 q -4 -10 2 -16 q 6 -7 0 -14" />
            <path d="M100 44 q -4 -10 2 -16 q 6 -7 0 -14" />
            <path d="M122 50 q -4 -10 2 -16 q 6 -7 0 -14" />
          </g>

          {/* Saucer shadow */}
          <ellipse cx="100" cy="172" rx="80" ry="9" fill={INK} fillOpacity="0.12" stroke="none" />
          {/* Saucer */}
          <path
            d="M22 162 Q100 178 178 162 Q178 174 100 184 Q22 174 22 162 Z"
            fill={PARCHMENT_LIGHT}
          />
          <path d="M30 164 Q100 174 170 164" strokeOpacity="0.45" strokeWidth="1" />

          {/* Tea liquid filling the cup interior */}
          <path d="M44 75 Q44 138 100 142 Q156 138 156 75 Z" fill={TEA_LIQUID} />
          {/* Highlight on tea surface */}
          <ellipse cx="100" cy="76" rx="54" ry="5" fill="white" fillOpacity="0.18" stroke="none" />

          {/* Cup body outline */}
          <path d="M40 70 Q40 140 100 145 Q160 140 160 70 Z" fill="none" />
          {/* Rim */}
          <ellipse cx="100" cy="70" rx="60" ry="8" />
          <ellipse cx="100" cy="70" rx="55" ry="6" strokeOpacity="0.55" strokeWidth="0.8" />

          {/* Handle */}
          <path d="M160 85 Q188 88 188 110 Q188 132 160 128" />
          <path d="M160 92 Q180 95 180 110 Q180 124 160 122" strokeOpacity="0.5" strokeWidth="0.9" />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 48,
            fontStyle: "italic",
            fontWeight: 400,
            color: INK,
            marginTop: 28,
          }}
        >
          Tell us how you take your tea.
        </div>

        <div
          style={{
            display: "flex",
            fontFamily: "Caveat",
            fontSize: 44,
            color: TEA_BROWN,
            marginTop: 8,
          }}
        >
          — take a seat at the table —
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Playfair Display", data: playfair700i, style: "italic", weight: 700 },
        { name: "Playfair Display", data: playfair400i, style: "italic", weight: 400 },
        { name: "Caveat", data: caveat400, style: "normal", weight: 400 },
      ],
    },
  );
}
