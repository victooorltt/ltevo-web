import { ServiceLanding } from "@/components/servicios/service-landing";
import { servicePages } from "@/lib/service-pages";
import { pageMetadata } from "@/lib/seo";

const service = servicePages["desarrollo-web"];
export const metadata = pageMetadata(service.title, service.description, "/servicios/desarrollo-web");

export default function Page() {
  return <ServiceLanding service={service} />;
}
