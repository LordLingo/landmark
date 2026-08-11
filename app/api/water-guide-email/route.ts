import { NextRequest, NextResponse } from "next/server";

function clean(value: unknown, maxLength = 500) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  const email = clean(body.email, 180);
  const city = clean(body.city, 80);
  const schedule = clean(body.schedule, 300);
  const timeRule = clean(body.timeRule, 300);
  const officialUrl = clean(body.officialUrl, 500);

  if (!email.includes("@") || !city || !schedule) {
    return NextResponse.json(
      { error: "A valid email and schedule are required." },
      { status: 400 },
    );
  }

  const autoResponse = [
    `Your current ${city} watering schedule framework: ${schedule}.`,
    `Restricted hours: ${timeRule}.`,
    `Always confirm current rules with the official city source: ${officialUrl}`,
    "",
    "Allowed days are opportunities, not requirements. Skip watering after useful rain and use short cycle-and-soak runs to help North Texas clay absorb water.",
    "",
    "Landmark Landscapes · 469-492-8450 · landmarklandscapestx.com",
  ].join("\n");

  try {
    const response = await fetch(
      "https://formspree.io/f/mgawkyyv",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          subject: `Your ${city} watering schedule from Landmark Landscapes`,
          email,
          message: autoResponse,
          City: city,
          "Current schedule": schedule,
          "Restricted hours": timeRule,
          "Official source": officialUrl,
          Source: "Landmark watering-day checker",
        }),
      },
    );

    if (!response.ok) throw new Error(`Email delivery returned ${response.status}`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Water guide email failed", error);
    return NextResponse.json(
      { error: "The schedule could not be emailed." },
      { status: 502 },
    );
  }
}
