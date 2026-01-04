export interface Publication {
    id: string
    title: string
    authors: string[]
    journal: string
    year: number
    selected: boolean
    doi?: string
    pdf?: string
}

export const publications: Publication[] = [
    {
        id: "p1",
        title: "High-efficiency perovskite light-emitting diodes with high color purity",
        authors: ["G. Hong", "A. Kim", "et al."],
        journal: "Nature Electronics",
        year: 2023,
        selected: true,
        doi: "https://doi.org/10.1038/s41928-023-009...",
    },
    {
        id: "p2",
        title: "Neuromorphic computing using synaptic transistors based on 2D materials",
        authors: ["B. Lee", "G. Hong"],
        journal: "Advanced Materials",
        year: 2022,
        selected: true,
        doi: "https://doi.org/...",
    },
    {
        id: "p3",
        title: "Flexible and transparent electrodes for wearable electronics",
        authors: ["C. Park", "G. Hong"],
        journal: "ACS Nano",
        year: 2021,
        selected: false,
        doi: "https://doi.org/...",
    },
    {
        id: "p4",
        title: "Stability improvement of tandem solar cells under ambient conditions",
        authors: ["D. Choi", "G. Hong"],
        journal: "Energy & Environmental Science",
        year: 2020,
        selected: false,
    },
    {
        id: "p5",
        title: "Ultra-sensitive gas sensors using graphene aerogels",
        authors: ["E. Jung", "G. Hong"],
        journal: "Sensors and Actuators B",
        year: 2019,
        selected: false,
    }
]
