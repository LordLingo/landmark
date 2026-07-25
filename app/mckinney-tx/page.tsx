import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { mckinneyPage } from "../location-page-data";
import { landscapeDesignPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(mckinneyPage);

const mckinneyRelatedPages = [landscapeDesignPage, ...serviceList];

export default function McKinneyLandscapingPage() {
  return (
    <ServicePage
      service={mckinneyPage}
      relatedServices={mckinneyRelatedPages}
      areaServed={["McKinney"]}
      faqTitle="Questions McKinney homeowners ask before starting."
      relatedEyebrow="Landscaping services in McKinney"
      relatedTitle="Renew the property with a connected scope."
      projectCaption="McKinney residential landscaping"
    />
  );
}
