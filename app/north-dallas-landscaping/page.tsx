import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { landscapeDesignPage, northDallasPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(northDallasPage);

const northDallasRelatedPages = [landscapeDesignPage, ...serviceList];

export default function NorthDallasLandscapingPage() {
  return (
    <ServicePage
      service={northDallasPage}
      relatedServices={northDallasRelatedPages}
      areaServed={["Prosper", "Frisco", "McKinney", "Celina", "The Colony"]}
      faqTitle="Questions North Dallas homeowners ask before starting."
      relatedEyebrow="Residential landscaping in North Dallas"
      relatedTitle="Bring every service into one connected plan."
      projectCaption="North Dallas residential landscaping"
    />
  );
}
