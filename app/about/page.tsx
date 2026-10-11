import type { Metadata } from "next";
import Link from "next/link";
import SiteNavigation from "../site-navigation";
export const metadata: Metadata = { title: "About Landmark Landscapes", alternates: { canonical: "/about" } };
const sections = [["Landscaping for North Texas homes", "Landmark Landscape Services, LLC, also known as Landmark Landscapes, is based in Prosper, Texas. We help homeowners in Prosper, Celina, Frisco, McKinney and The Colony plan outdoor spaces around the way they live. Our work includes landscape design and installation, front-yard improvements, flower beds, stone borders and walkways, drainage solutions, landscape lighting and sprinkler troubleshooting."], ["Start with your property", "A project can begin with a problem to solve or an idea to explore. Tell us about your city, the areas of your yard you want to improve and the result you have in mind. Our website includes examples of completed work and a Plan My Yard tool for exploring ideas. A digital concept is a starting point for discussion; project scope, site conditions, pricing and scheduling are confirmed directly with Landmark."], ["Talk with Landmark", "Call 469-492-8450, email landmarklandscapesllc@outlook.com or use our contact form to request an estimate. We also offer seasonal Christmas light installation. Ask us about availability and whether your property is within our service area."]];
export default function Page() {
 return <main className="contact-page"><SiteNavigation contactHref="/contact" actionLabel="Request an estimate" />
 <section className="contact-hero"><div><p className="eyebrow">Landmark Landscape Services, LLC</p><h1>About Landmark Landscapes</h1></div></section>
 <section className="contact-form-section"><article style={{ maxWidth: 850, margin: "0 auto", lineHeight: 1.8 }}>{sections.map(([heading, text]) => <section key={heading} style={{ marginBottom: 32 }}><h2>{heading}</h2><p>{text}</p></section>)}<p><Link href="/contact">Contact Landmark</Link> · <Link href="/about">About</Link> · <Link href="/privacy">Privacy</Link> · <Link href="/">Home</Link></p></article></section>
 </main>;
}
