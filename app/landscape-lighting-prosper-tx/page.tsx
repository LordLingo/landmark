import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.lighting);

export default function LandscapeLightingPage() {
  return <ServicePage service={services.lighting} />;
}
