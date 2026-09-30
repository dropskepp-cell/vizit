import type { Metadata } from "next";
import CatalogView from "../../components/CatalogView";

export const metadata: Metadata = {
  title: "Каталог",
};

export default async function CatalogPage(props: PageProps<"/catalog">) {
  const raw = await props.searchParams;
  const params: Record<string, string> = {};
  for (const [key, value] of Object.entries(raw)) {
    const v = Array.isArray(value) ? value[0] : value;
    if (v) params[key] = v;
  }

  return <CatalogView params={params} />;
}
