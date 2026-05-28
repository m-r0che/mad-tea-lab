import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const HEX_RE = /^#[0-9a-fA-F]{6}$/;

const PUBLIC_FIELDS = {
  id: true,
  name: true,
  hexColor: true,
  note: true,
  createdAt: true,
} as const;

export async function GET() {
  const drinkers = await prisma.teaDrinker.findMany({
    orderBy: { createdAt: "desc" },
    select: PUBLIC_FIELDS,
  });
  return NextResponse.json({ drinkers });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const hexColor = typeof body.hexColor === "string" ? body.hexColor.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 140) : null;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (!email.includes("@")) return NextResponse.json({ error: "Valid email required" }, { status: 400 });
  if (!HEX_RE.test(hexColor)) {
    return NextResponse.json(
      { error: "Hex colour must be in the form #RRGGBB" },
      { status: 400 },
    );
  }

  try {
    const drinker = await prisma.teaDrinker.upsert({
      where: { email },
      create: { name, email, hexColor, note: note || null },
      update: { name, hexColor, note: note || null },
      select: PUBLIC_FIELDS,
    });
    return NextResponse.json({ drinker });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Could not save your seat" }, { status: 500 });
  }
}
