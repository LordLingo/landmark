import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.stone);

export default function StoneBordersWalkwaysPage() {
  return <ServicePage service={services.stone} />;
}
