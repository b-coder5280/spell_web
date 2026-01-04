export interface NewsItem {
    id: string
    title: string
    date: string
    category: "Award" | "Conference" | "Daily"
    image?: string
    description?: string
}

export const newsItems: NewsItem[] = [
    {
        id: "n1",
        title: "Best Paper Award at IEDM 2023",
        date: "2023-12-15",
        category: "Award",
        image: "/images/news-placeholder-1.jpg",
        description: "Prof. Hong and Alice Kim received the Best Paper Award at IEDM 2023 for their work on Perovskite LEDs."
    },
    {
        id: "n2",
        title: "SPELL Lab Workshop in Jeju",
        date: "2023-08-20",
        category: "Daily",
        image: "/images/news-placeholder-2.jpg",
        description: "Our lab members attended the annual Summer Workshop in Jeju Island."
    },
    {
        id: "n3",
        title: "Oral Presentation at MRS Fall",
        date: "2023-11-30",
        category: "Conference",
        image: "/images/news-placeholder-3.jpg",
        description: "Bob Lee presented his research on neuromorphic computing at the MRS Fall Meeting."
    },
    {
        id: "n4",
        title: "Dr. Alice Kim joins as Post-Doc",
        date: "2023-03-01",
        category: "Daily",
        description: "We welcome Dr. Alice Kim to the SPELL Lab family!"
    }
]
