import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

function text(value: unknown, maxLength = 1500) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function list(value: unknown, maxItemLength = 100) {
  return Array.isArray(value)
    ? value.map((item) => text(item, maxItemLength)).filter(Boolean).join(", ")
    : text(value, maxItemLength);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  const name = text(body.name, 160);
  const email = text(body.email, 180);
  const phone = text(body.phone, 60);

  if (!name || !email.includes("@") || phone.length < 7) {
    return NextResponse.json(
      { error: "Valid contact details are required." },
      { status: 400 },
    );
  }

  const payload = {
    subject: `Plan My Yard lead: ${text(body.city, 80)} · ${list(body.area, 100)}`,
    Name: name,
    email,
    Phone: phone,
    City: text(body.city, 80),
    "Project area": list(body.area, 100),
    Goals: Array.isArray(body.goals)
      ? body.goals.map((value) => text(value, 100)).join(", ")
      : "",
    Features: Array.isArray(body.features)
      ? body.features.map((value) => text(value, 100)).join(", ")
      : "",
    "Visual style": text(body.style, 100),
    "Plant priorities": list(body.plantPreferences, 100),
    "Requested plants": text(body.selectedPlants, 1500),
    "Plant standard": "North Texas natives only",
    "Placed plant plan": list(body.designPlants, 240),
    "Latest design instruction": text(body.designInstruction, 1000),
    "Selected design version": text(String(body.designVersion ?? ""), 20),
    "Preferred visit date": text(body.preferredDate, 40),
    "Preferred time": text(body.preferredTime, 40),
    Notes: text(body.notes, 1500),
    "Uploaded photo": text(body.photoName, 240),
    Source: text(body.source, 100) || "Landmark Plan My Yard",
  };

  try {
    const response = await fetch(
      "https://formspree.io/f/mljrbnbk",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      throw new Error(`Lead delivery returned ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Yard lead delivery failed", error);
    return NextResponse.json(
      { error: "The project brief could not be delivered." },
      { status: 502 },
    );
  }
}
