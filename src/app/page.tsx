import { client } from "@/sanity/lib/client"
import { draftMode } from "next/headers"
import { homePageBuilderQuery } from "@/sanity/lib/queries";
import { defaultHomePageSettings, HomePageSettings, withDefaults } from "@/lib/site-content";
import LegacyHome from "./legacy-home"
import { PageBuilderSection, hasValidPageBuilderHome } from "@/lib/page-builder";
import { BuilderPublication, PageBuilder, PageBuilderCollections } from "@/components/page-builder/page-builder";

export const revalidate = 60

type HomePageData = {
  homePage?: (Partial<HomePageSettings> & {
    pageBuilderEnabled?: boolean
    sections?: PageBuilderSection[]
  }) | null
  opening?: PageBuilderCollections["opening"]
  featuredPubs?: BuilderPublication[]
  latestPublications?: PageBuilderCollections["latestPublications"]
  featuredPublications?: PageBuilderCollections["featuredPublications"]
  latestNews?: PageBuilderCollections["latestNews"]
  galleryItems?: PageBuilderCollections["galleryItems"]
  members?: PageBuilderCollections["members"]
  researchItems?: PageBuilderCollections["researchItems"]
}

export default async function Home() {
  let data: HomePageData | null = null

  try {
    const draft = await draftMode()
    const sanityClient = draft.isEnabled && process.env.SANITY_API_READ_TOKEN
      ? client.withConfig({
        token: process.env.SANITY_API_READ_TOKEN,
        useCdn: false,
        perspective: "drafts",
        stega: {
          enabled: true,
          studioUrl: "/studio",
        },
      })
      : client

    data = await sanityClient.fetch<HomePageData>(homePageBuilderQuery)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Failed to load homepage CMS data. Rendering legacy fallback.", error)
    }
  }

  const homePage = withDefaults(defaultHomePageSettings, data?.homePage);
  const homeSections = data?.homePage?.sections?.filter(
    (section) => section._type !== "researchSection"
  )
  const filteredHomePage = data?.homePage ? { ...data.homePage, sections: homeSections } : data?.homePage

  if (hasValidPageBuilderHome(filteredHomePage)) {
    return (
      <PageBuilder
        sections={homeSections}
        collections={{
          opening: data?.opening,
          latestPublications: data?.latestPublications,
          featuredPublications: data?.featuredPublications,
          latestNews: data?.latestNews,
          galleryItems: data?.galleryItems,
          members: data?.members,
          researchItems: data?.researchItems,
        }}
      />
    )
  }

  const featuredPubs = (data?.featuredPubs || []).filter(
    (pub): pub is BuilderPublication & { _id: string; title: string } => Boolean(pub?._id && pub?.title)
  )

  return <LegacyHome opening={data?.opening || {}} featuredPubs={featuredPubs} latestNews={data?.latestNews || []} homePage={homePage} />
}
