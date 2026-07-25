import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { friscoPage } from "../location-page-data";
import { landscapeDesignPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(friscoPage);

const friscoRelatedPages = [landscapeDesignPage, ...serviceList];

export default function FriscoLandscapingPage() {
  return (
    <ServicePage
      service={friscoPage}
      relatedServices={friscoRelatedPages}
      areaServed={["Frisco"]}
      faqTitle="Questions Frisco homeowners ask before starting."
      relatedEyebrow="Landscaping services in Frisco"
      relatedTitle="Connect the right services around one plan."
      projectCaption="Frisco residential landscaping"
    />
  );
}
