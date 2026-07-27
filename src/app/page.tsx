import { client } from "@/sanity/lib/client"
import { homePageQuery } from "@/sanity/lib/queries";
import { defaultHomePageSettings, HomePageSettings, withDefaults } from "@/lib/site-content";
import HomeClient from "./home-client"

export const revalidate = 60

export default async function Home() {
  const opening = await client.fetch(`*[_type == "opening"][0]`) || {};
  const homePage = withDefaults(defaultHomePageSettings, await client.fetch<Partial<HomePageSettings>>(homePageQuery));

  // Fetch only publications marked as selected
  const featuredPubs = await client.fetch(`*[_type == "publication" && selected == true] | order(year desc)`) || [];

  return <HomeClient opening={opening} featuredPubs={featuredPubs} homePage={homePage} />
}
