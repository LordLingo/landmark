import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { landscapeDesignPage, prosperPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(prosperPage);

const prosperRelatedPages = [landscapeDesignPage, ...serviceList];

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
