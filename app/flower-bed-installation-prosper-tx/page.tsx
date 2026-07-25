import ServicePage from "../service-page";
import { buildServiceMetadata, services } from "../service-data";

export const metadata = buildServiceMetadata(services.flowerBeds);

export default function FlowerBedInstallationPage() {
  return <ServicePage service={services.flowerBeds} />;
}
