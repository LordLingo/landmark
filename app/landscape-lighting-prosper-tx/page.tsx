import LightingPage from '../landscape-lighting/lighting-page';
import { lightingPages, lightingMetadata } from '../landscape-lighting/data';
const page = lightingPages.find(page => page.slug === 'prosper-tx')!;
export const metadata = lightingMetadata(page);
export default function LandscapeLightingPage() { return <LightingPage page={page} />; }
