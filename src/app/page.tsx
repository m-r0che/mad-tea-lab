"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Teacup } from "@/components/Teacup";
import {
  Flourish,
  PocketWatch,
  Mushroom,
} from "@/components/Flourish";
import { TEA_PALETTE_FLAT, findSwatchName } from "@/lib/teaPalette";

export default function LandingPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hexColor, setHexColor] = useState("#a0522d");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/drinkers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, hexColor, note }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({ error: "Something went wrong" }));
      setError(data.error || "Something went wrong");
      return;
    }
    router.push("/gallery");
  }

  return (
    <main className="relative min-h-screen overflow-hidden text-ink">
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

      {/* Marginalia */}
      <PocketWatch className="pointer-events-none absolute top-6 right-6 w-20 text-ink/60 -rotate-12 drift z-10" />
      <Mushroom className="pointer-events-none absolute -bottom-2 left-4 w-20 md:w-24 text-ink/50 rotate-6 z-10" />

      <section className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-8 text-center">
        <p className="small-caps text-sm text-tea-brown mb-3">
          A standing invitation
        </p>
        <h1 className="font-display italic text-5xl md:text-6xl leading-tight text-tea-brown-deep">
          The Mad Tea Lab
        </h1>
        <Flourish className="mx-auto mt-4 w-56 text-ink/70" />
        <p className="mt-6 text-xl md:text-2xl font-display italic text-ink/90">
          Tell us how you take your tea.
        </p>
        <p className="mt-3 text-lg text-ink/80 max-w-xl mx-auto">
          Every drinker at the table has their own perfect shade. Pick yours,
          and take a seat.
        </p>

      </section>

      <section className="relative z-10 mx-auto max-w-2xl px-6 pb-20">
        <form
          onSubmit={onSubmit}
          className="ink-border bg-parchment-deep/40 backdrop-blur-[1px] p-8 md:p-10"
          style={{ background: "linear-gradient(180deg, #fbf3dc, #f4e9d1)" }}
        >
          <div className="space-y-7">
            <div>
              <label className="block small-caps text-xs text-tea-brown mb-1">
                Your Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Alice P."
                className="w-full bg-transparent border-0 border-b-2 border-ink/80 focus:border-tea-brown focus:outline-none py-2 text-lg font-display italic placeholder:text-ink/30"
              />
            </div>

            <div>
              <label className="block small-caps text-xs text-tea-brown mb-1">
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email"
                placeholder="alice@wonderland.co"
                className="w-full bg-transparent border-0 border-b-2 border-ink/80 focus:border-tea-brown focus:outline-none py-2 text-lg font-display italic placeholder:text-ink/30"
              />
            </div>

            <div>
              <label className="block small-caps text-xs text-tea-brown mb-3">
                Your Tea Colour
              </label>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <Teacup color={hexColor} size={140} />
                  <div className="small-caps tracking-widest font-mono text-sm text-ink/70">
                    {hexColor.toUpperCase()}
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <p className="small-caps text-[11px] text-ink/55 mb-2">
                    Tap a brew
                  </p>
                  <div className="grid grid-cols-6 gap-2">
                    {TEA_PALETTE_FLAT.map((s) => {
                      const active = s.hex.toLowerCase() === hexColor.toLowerCase();
                      return (
                        <button
                          key={s.hex}
                          type="button"
                          aria-label={`${s.name} (${s.hex})`}
                          title={`${s.name} — ${s.hex.toUpperCase()}`}
                          onClick={() => setHexColor(s.hex)}
                          className={`swatch ${active ? "swatch--active" : ""}`}
                          style={{ background: s.hex }}
                        >
                          <span className="sr-only">{s.name}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-3 font-display italic text-center text-sm text-ink/80">
                    {findSwatchName(hexColor) ?? "Your own blend"}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <label className="block small-caps text-xs text-tea-brown mb-1">
                A Note About Your Tea{" "}
                <span className="text-ink/40 normal-case lowercase">(optional)</span>
              </label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={140}
                placeholder="Two sugars, no nonsense..."
                className="w-full bg-transparent border-0 border-b-2 border-ink/80 focus:border-tea-brown focus:outline-none py-2 text-lg font-hand placeholder:text-ink/30"
              />
            </div>

            {error && (
              <p className="text-rose font-display italic text-center">
                {error}
              </p>
            )}

            <div className="flex flex-col items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={busy}
                className="btn-primary px-8 py-3 small-caps text-base disabled:opacity-50"
              >
                {busy ? "Pouring…" : "Join the Table"}
              </button>
              <Flourish className="w-40 text-ink/50" />
            </div>
          </div>
        </form>

        <p className="text-center mt-8 small-caps text-sm text-tea-brown">
          <Link href="/gallery" className="hover:underline">
            Already poured? View the gallery →
          </Link>
        </p>
      </section>

    </main>
  );
}
