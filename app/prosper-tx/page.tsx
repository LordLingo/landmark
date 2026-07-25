import { buildServiceMetadata, services } from "../service-data";
import ServicePage from "../service-page";
import { landscapeDesignPage, prosperPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(prosperPage);

const prosperRelatedPages = [
  landscapeDesignPage,
  services.frontYard,
  services.flowerBeds,
  services.drainage,
  services.stone,
  services.lighting,
];

export default function ProsperLandscapingPage() {
  return (
    <ServicePage
      service={prosperPage}
      relatedServices={prosperRelatedPages}
      areaServed={["Prosper"]}
      faqTitle="Questions Prosper homeowners ask before starting."
      relatedEyebrow="Landscaping services in Prosper"
      relatedTitle="Build the right scope for your property."
      projectCaption="Prosper residential landscaping"
    />
  );
}
