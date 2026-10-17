import LightingPage from './lighting-page';
import { lightingPages, lightingMetadata } from './data';
const page = lightingPages[0];
export const metadata = lightingMetadata(page);
export default function OutdoorLighting() { return <LightingPage page={page} />; }
