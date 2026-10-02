import { ServiceLanding } from "@/components/servicios/service-landing";
import { servicePages } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = servicePages["hosting"];
export const metadata = pageMetadata(service.title, service.description, "/servicios/hosting");

export default function Page() {
  return <ServiceLanding service={service} />;
}
