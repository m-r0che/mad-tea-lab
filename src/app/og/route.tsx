import { ImageResponse } from "next/og";

export const runtime = "nodejs";
const size = { width: 1200, height: 630 };

const PARCHMENT = "#f4e9d1";
const TEA_BROWN_DEEP = "#5c2410";
const TEA_BROWN = "#8b3a1f";
const INK = "#2a1e2f";

async function loadFont(family: string, weight = 400, italic = false) {
  const style = italic ? "ital,wght@1," : "wght@";
  const url = `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, "+")}:${style}${weight}&display=swap`;
  const css = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15",
    },
  }).then((r) => r.text());
  const match = css.match(/src: url\((https:\/\/[^)]+)\) format/);
  if (!match) throw new Error(`Could not find font src in ${url}`);
  return fetch(match[1]).then((r) => r.arrayBuffer());
}

export async function GET() {
  const [playfairItalic, garamond] = await Promise.all([
    loadFont("Playfair Display", 700, true),
    loadFont("EB Garamond", 500),
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
            "radial-gradient(ellipse 600px 300px at 18% 22%, rgba(139,58,31,0.12), transparent 60%), radial-gradient(ellipse 500px 300px at 85% 78%, rgba(139,58,31,0.10), transparent 70%)",
          color: INK,
          padding: 64,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            color: TEA_BROWN,
            fontSize: 26,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontFamily: "EB Garamond",
            marginBottom: 4,
          }}
        >
          A Standing Invitation
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 124,
            fontStyle: "italic",
            fontFamily: "Playfair Display",
            color: TEA_BROWN_DEEP,
            lineHeight: 1.0,
            margin: 0,
          }}
        >
          The Mad Tea Lab
        </div>

        <svg
          width="320"
          height="20"
          viewBox="0 0 320 20"
          fill="none"
          stroke={INK}
          strokeOpacity="0.7"
          strokeWidth="1.6"
          strokeLinecap="round"
          style={{ marginTop: 18, marginBottom: 18 }}
        >
          <path d="M10 10 q 38 -12 76 0 q 38 12 76 0 q 38 -12 76 0 q 25 6 50 0" />
          <circle cx="160" cy="10" r="3" fill={INK} fillOpacity="0.7" />
        </svg>

        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontStyle: "italic",
            fontFamily: "Playfair Display",
            color: INK,
            marginBottom: 14,
          }}
        >
          Tell us how you take your tea.
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            fontFamily: "EB Garamond",
            color: "rgba(42,30,47,0.78)",
            maxWidth: 880,
            textAlign: "center",
          }}
        >
          Every drinker has their own perfect shade. Pick yours, and join the gallery.
        </div>

        <svg
          width="200"
          height="160"
          viewBox="0 0 220 180"
          fill="none"
          stroke={INK}
          strokeWidth="2.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ marginTop: 32 }}
        >
          <path d="M70 60 Q110 40 150 60" />
          <circle cx="110" cy="40" r="5" fill={INK} />
          <path d="M60 65 Q40 110 70 145 Q110 160 150 145 Q180 110 160 65 Z" />
          <path d="M60 80 Q30 78 18 90 Q14 96 22 100 Q40 98 60 105" />
          <path d="M160 80 Q200 90 200 115 Q200 135 160 140" />
          <g opacity="0.55" strokeWidth="1.8">
            <path d="M30 70 q -4 -10 4 -16 q 6 -6 0 -14" />
            <path d="M15 80 q -4 -8 2 -14" />
          </g>
        </svg>

        <svg
          width="100"
          height="120"
          viewBox="0 0 120 140"
          fill="none"
          stroke={INK}
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ position: "absolute", top: 40, right: 60 }}
        >
          <path d="M60 14 v 6 M50 8 h 20" />
          <circle cx="60" cy="74" r="42" />
          <path d="M60 74 l 0 -20" />
          <path d="M60 74 l 14 6" />
        </svg>

        <svg
          width="100"
          height="120"
          viewBox="0 0 120 140"
          fill="none"
          stroke={INK}
          strokeOpacity="0.45"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          style={{ position: "absolute", bottom: 30, left: 60 }}
        >
          <path d="M20 70 Q20 30 60 28 Q100 30 100 70 Q80 78 60 76 Q40 78 20 70 Z" />
          <path d="M42 70 Q42 110 50 124 L 70 124 Q 78 110 78 70" />
        </svg>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Playfair Display",
          data: playfairItalic,
          style: "italic",
          weight: 700,
        },
        {
          name: "EB Garamond",
          data: garamond,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
