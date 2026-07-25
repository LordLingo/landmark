import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.drainage);

export default function YardDrainagePage() {
  return <ServicePage service={services.drainage} />;
}
