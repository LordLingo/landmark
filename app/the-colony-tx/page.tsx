import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { theColonyPage } from "../location-page-data";
import { landscapeDesignPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(theColonyPage);

const theColonyRelatedPages = [landscapeDesignPage, ...serviceList];

export default function TheColonyLandscapingPage() {
  return (
    <ServicePage
      service={theColonyPage}
      relatedServices={theColonyRelatedPages}
      areaServed={["The Colony"]}
      faqTitle="Questions The Colony homeowners ask before starting."
      relatedEyebrow="Landscaping services in The Colony"
      relatedTitle="Improve the spaces your property uses most."
      projectCaption="The Colony residential landscaping"
    />
  );
}
