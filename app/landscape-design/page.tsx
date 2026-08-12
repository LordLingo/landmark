import { buildServiceMetadata, serviceList } from "../service-data";
import ServicePage from "../service-page";
import { landscapeDesignPage } from "../seo-page-data";

export const metadata = buildServiceMetadata(landscapeDesignPage);

export default function LandscapeDesignPage() {
  return (
    <ServicePage
      service={landscapeDesignPage}
      relatedServices={serviceList}
      faqTitle="Questions homeowners ask before a landscape design project."
      relatedEyebrow="Designed as one landscape"
      relatedTitle="Services that can be planned together."
      projectCaption="North Dallas landscape design"
    />
  );
}
