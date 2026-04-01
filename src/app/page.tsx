import { client } from "@/sanity/lib/client"
import HomeClient from "./home-client"

export const revalidate = 60

export default async function Home() {
  const opening = await client.fetch(`*[_type == "opening"][0]`) || {};

  // Fetch only publications marked as selected
  const featuredPubs = await client.fetch(`*[_type == "publication" && selected == true] | order(year desc)`) || [];

  return <HomeClient opening={opening} featuredPubs={featuredPubs} />
}
