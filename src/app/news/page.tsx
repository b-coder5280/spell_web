import { client } from "@/sanity/lib/client"
import { newsQuery } from "@/sanity/lib/queries"
import { NewsClient, NewsItemModel } from "./news-client"

export const revalidate = 60

export default async function NewsPage() {
    const fetchedNews = await client.fetch<NewsItemModel[]>(newsQuery) || [];

    // Ensure _id exists for React keys
    const processedNews = fetchedNews.map((item: any) => ({
        ...item,
        _id: item._id || item.id || Math.random().toString(36).substring(7)
    }));

    return <NewsClient newsItems={processedNews as NewsItemModel[]} />
}
