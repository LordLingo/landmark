import { notFound } from 'next/navigation';
import LightingPage from '../lighting-page';
import { lightingPages, lightingMetadata } from '../data';
export const dynamicParams = false;
export function generateStaticParams() { return lightingPages.filter(page => page.slug && page.slug !== 'prosper-tx').map(page => ({ slug: page.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = lightingPages.find(page => page.slug === slug);
  return page ? lightingMetadata(page) : {};
}
export default async function LightingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = lightingPages.find(page => page.slug === slug && slug !== 'prosper-tx');
  if (!page) notFound();
  return <LightingPage page={page} />;
}
