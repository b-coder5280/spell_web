import { client } from "@/sanity/lib/client"
import { newsPageQuery, newsQuery } from "@/sanity/lib/queries"
import { NewsClient, NewsItemModel } from "./news-client"
import { defaultNewsPageSettings, NewsPageSettings, withDefaults } from "@/lib/site-content"
import type { Metadata } from "next"

export const revalidate = 60
export const metadata: Metadata = {
    title: "News",
    description: "Latest updates and stories from SPELL Lab.",
}

type NewsItemWithOptionalId = NewsItemModel & {
    id?: string
}

export default async function NewsPage() {
    const fetchedNews = await client.fetch<NewsItemWithOptionalId[]>(newsQuery) || [];
    const page = withDefaults(defaultNewsPageSettings, await client.fetch<Partial<NewsPageSettings>>(newsPageQuery));

    // Ensure _id exists for React keys
    const processedNews = fetchedNews.map((item, index) => ({
        ...item,
        _id: item._id || item.id || `news-${index}`
    }));

    return <NewsClient newsItems={processedNews as NewsItemModel[]} page={page} />
}
