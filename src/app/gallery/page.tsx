import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/db";
import { TeacupMedallion } from "@/components/TeacupMedallion";
import {
  Flourish,
  Teapot,
  SugarCube,
  Spoon,
} from "@/components/Flourish";
import { findSwatchName } from "@/lib/teaPalette";

export const dynamic = "force-dynamic";

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

function seededRotation(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return ((h % 600) / 100) - 3; // -3 .. +3
}

const corners = [SugarCube, Spoon];

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort = "newest" } = await searchParams;

  const drinkers = await prisma.teaDrinker.findMany({
    orderBy: { createdAt: "desc" },
  });

  const sorted = [...drinkers];
  if (sort === "darkest") {
    sorted.sort((a, b) => hexToHsl(a.hexColor).l - hexToHsl(b.hexColor).l);
  } else if (sort === "palest") {
    sorted.sort((a, b) => hexToHsl(b.hexColor).l - hexToHsl(a.hexColor).l);
  }

  return (
    <main className="relative min-h-screen text-ink">
      {/* Tenniel tea-party backdrop */}
      <Image
        src="/mad-tea-party.png"
        alt=""
        width={1200}
        height={900}
        priority
        aria-hidden
        className="pointer-events-none select-none fixed inset-x-0 bottom-[15vh] md:bottom-0 mx-auto w-[min(1100px,140vw)] h-auto opacity-[0.13] mix-blend-multiply z-0"
      />

      {/* Tablecloth strip */}
      <div
        aria-hidden
        className="h-6 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #c0392b 0 18px, #fbf3dc 18px 36px)",
          maskImage:
            "linear-gradient(180deg, black 60%, transparent 100%)",
          opacity: 0.75,
        }}
      />

      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-10 pb-6 text-center">
        <p className="small-caps text-sm text-tea-brown mb-2">
          The Tea Gallery
        </p>
        <h1 className="font-display italic text-4xl md:text-5xl text-tea-brown-deep">
          How Everyone Takes Theirs
        </h1>
        <Flourish className="mx-auto mt-3 w-56 text-ink/70" />

        <div className="flex justify-center mt-4">
          <Teapot className="w-40 text-ink/80 teapot-sway" />
        </div>

        <p className="mt-3 text-lg font-display italic text-ink/85">
          {sorted.length === 0
            ? "The table is set, but no one has poured yet. Be the first."
            : `${sorted.length} drinker${sorted.length === 1 ? "" : "s"} at the table. Here's how they like it.`}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm">
          <span className="small-caps text-tea-brown">Sort by:</span>
          <SortLink current={sort} value="newest" label="Newest" />
          <span className="text-ink/40">·</span>
          <SortLink current={sort} value="darkest" label="Darkest brew" />
          <span className="text-ink/40">·</span>
          <SortLink current={sort} value="palest" label="Palest pour" />
          <Link
            href="/"
            className="ml-2 btn-primary px-4 py-2 small-caps text-xs"
          >
            Pour your own →
          </Link>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-24">
        {sorted.length === 0 ? (
          <div className="text-center mt-12">
            <Link
              href="/"
              className="btn-primary inline-block px-8 py-3 small-caps"
            >
              Take a seat
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {sorted.map((d, i) => {
              const Corner = corners[i % corners.length];
              const rot = seededRotation(d.email);
              const teaName = findSwatchName(d.hexColor);
              return (
                <article
                  key={d.id}
                  className="placecard relative px-6 pt-10 pb-6"
                  style={{
                    transform: `rotate(${rot}deg)`,
                    ["--card-stagger" as string]: `${(i % 5) * 0.4}s`,
                  }}
                >
                  <Corner className="absolute top-2 right-3 w-8 text-ink/40" />

                  <div className="flex justify-center">
                    <TeacupMedallion color={d.hexColor} size={190} />
                  </div>

                  <h2 className="text-center mt-2 font-display italic text-2xl text-tea-brown-deep">
                    {d.name}
                  </h2>

                  <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-ink/40 rounded-full bg-parchment/60 small-caps text-[10px] tracking-widest text-ink/70 font-mono">
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-ink/40"
                        style={{ background: d.hexColor }}
                      />
                      {d.hexColor.toUpperCase()}
                    </span>
                    {teaName && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 border border-tea-brown/60 rounded-full bg-parchment-deep/70 font-display italic text-sm text-tea-brown-deep">
                        {teaName}
                      </span>
                    )}
                  </div>

                  {d.note && (
                    <p className="text-center mt-3 font-hand text-xl leading-snug text-ink/85">
                      “{d.note}”
                    </p>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>

    </main>
  );
}

function SortLink({
  current,
  value,
  label,
}: {
  current: string;
  value: string;
  label: string;
}) {
  const active = current === value;
  return (
    <Link
      href={`/gallery?sort=${value}`}
      className={`font-display italic ${
        active ? "text-tea-brown-deep underline" : "text-ink/70 hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}
