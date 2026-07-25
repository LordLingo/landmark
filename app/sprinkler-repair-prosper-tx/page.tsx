import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.sprinkler);

export default function SprinklerRepairPage() {
  return <ServicePage service={services.sprinkler} />;
}
