import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.frontYard);

export default function FrontYardLandscapingPage() {
  return <ServicePage service={services.frontYard} />;
}
