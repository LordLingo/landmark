import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { celinaPage } from "../location-page-data";
import { landscapeDesignPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(celinaPage);

const celinaRelatedPages = [landscapeDesignPage, ...serviceList];

export default function CelinaLandscapingPage() {
  return (
    <ServicePage
      service={celinaPage}
      relatedServices={celinaRelatedPages}
      areaServed={["Celina"]}
      faqTitle="Questions Celina homeowners ask before starting."
      relatedEyebrow="Landscaping services in Celina"
      relatedTitle="Plan the property for long-term growth."
      projectCaption="Celina residential landscaping"
    />
  );
}
