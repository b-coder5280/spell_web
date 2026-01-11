export interface NewsItem {
    id: string
    title: string
    date: string
    category: "Award" | "Conference" | "Daily" | "Grant"
    image?: string
    detailImages?: string[]
    description?: string
}

export const newsItems: NewsItem[] = [
    {
        id: "n17",
        title: "2025년도 이공분야 학술연구지원사업 신규과제 선정",
        date: "2025.08",
        category: "Grant",
        image: "/images/NRF.png",
        description: "박상증 학생 2025년도 3차 이공분야 학술연구지원사업 신규과제(석사과정생 연구장려금) 선정."
    },
    {
        id: "n16",
        title: "Public Program at Nano Korea 2025",
        date: "2025.07",
        category: "Conference",
        image: "/images/nano2.jpg",
        detailImages: ["/images/nano2.jpg", "/images/nano2.1.jpg", "/images/nano2.2.jpg", "/images/nano2.3.jpg", "/images/nano2.4.jpg"], // Example multi-image
        description: "We organized a public session, “To the Dream Display! Showcasing the Future with Perovskite (꿈의 화면으로! 페로브스카이트 디스플레이로 미래를 보여주다)” at Nano Korea 2025. In this session, we demonstrated experiments on the fabrication and characterization of perovskite LEDs for high school students."
    },
    {
        id: "n15",
        title: "PIERS(Photonics and Electromagnetics Research Symposium) 2025 YSA(Young Scientist Award) 수상",
        date: "2025.05",
        category: "Award",
        image: "/images/piers.png",
        description: "김호범 교수님 PIERS(Photonics and Electromagnetics Research Symposium) 2025 YSA(Young Scientist Award) 수상."
    },
    {
        id: "n14",
        title: "2025 고분자학회 춘계학술대회 포스터 발표 수상 ",
        date: "2025.04",
        category: "Award",
        image: "/images/polyj.jpg",
        detailImages: ["/images/polyj.jpg", "/images/polsj.jpg"],
        description: "손연지(우수논문발표상), 박상증(장려상) 학생 2025 고분자학회 춘계학술대회 포스터 발표 수상."
    },
    {
        id: "n13",
        title: "2025 고분자학회 춘계학술대회 신진학술상 수상",
        date: "2025.04",
        category: "Award",
        image: "/images/25pol.jpg",
        description: "김호범 교수님 2025 고분자학회 춘계학술대회 신진학술상 수상."
    },
    {
        id: "n12",
        title: "과학기술정보통신부 기초연구사업 글로벌 매칭형(독일) 연구과제 선정",
        date: "2024.12",
        category: "Grant",
        image: "/images/NRF.png",
        description: "'근적외선 발광 페로브스카이트의 결함-전하동역학 이해 기반 고효율·고안정성 근적외선 발광다이오드 개발'을 주제로 연구과제 선정. 연구기간 : 2024.12.01 ~ 2027.11.30"
    },
    {
        id: "n11",
        title: "7th Korea Toray Fellowship",
        date: "2024.09",
        category: "Award",
        image: "/images/toery1.jpg",
        detailImages: ["/images/toery1.jpg", "/images/toery2.jpg"],
        description: "Prof. Hobeom Kim has been awarded the 7th Korea Toray Fellowship by the Korea Toray Science Foundation."
    },
    {
        id: "n10",
        title: "Paper published",
        date: "2024.09",
        category: "Daily",
        image: "/images/Small.png",
        description: "Prof. Hobeom Kim's paper, “Efficient Polycrystalline Single-Cation Perovskite Light-Emitting Diodes by Simultaneous Intracrystal and Interfacial Defect Passivation”  has been published in Small. This article also appears in Hot Topic: Surfaces and interfaces and Selected for Front cover"
    },
    {
        id: "n9",
        title: "Public Program at Nano Korea 2024",
        date: "2024.07",
        category: "Conference",
        image: "/images/nano1.png",
        detailImages: ["/images/nano1.png", "/images/nano1.1.png", "/images/nano1.2.png", "/images/nano1.3.png", "/images/nano1.4.png"],
        description: "We organized a public session, “To the Dream Display! Showcasing the Future with Perovskite (꿈의 화면으로! 페로브스카이트 디스플레이로 미래를 보여주다)” at Nano Korea 2024. In this session, we demonstrated experiments on the fabrication and characterization of perovskite LEDs for high school students."
    },
    {
        id: "n8",
        title: "Paper published",
        date: "2024.07",
        category: "Daily",
        image: "/images/paper2.jpg",
        description: "Prof. Hobeom Kim's paper, “Shallow-level Defect Passivation by 6H Perovskite Polytype for Highly Efficient and Stable Perovskite Solar Cells”  has been published in Nature Communications. Featured in Editor’s highlights, 'Devices' and Behind the paper"
    },
    {
        id: "n7",
        title: "2025년도 이공분야 학술연구지원사업 신규과제 선정",
        date: "2024.05",
        category: "Grant",
        image: "/images/NRF.png",
        description: "박준모 학생 2024년도 이공분야 학술연구지원사업 신규과제(석사과정생 연구장려금) 선정."
    },
    {
        id: "n6",
        title: "이공분야 기초연구사업 - 우수신진연구 연구과제 선정",
        date: "2024.05",
        category: "Grant",
        image: "/images/NRF.png",
        description: "'단결정 페로브스카이트 결정다형체 기반 고효율 고안정성 적색 발광다이오드 개발'을 주제로 연구과제 선정. 연구기간 : 2024.05.01 ~ 2029.04.30"
    },
    {
        id: "n5",
        title: "다학제 융합클러스터사업 연구과제 선정",
        date: "2023.10",
        category: "Grant",
        image: "/images/nst.jpg",
        description: "'미래 마이크로 디스플레이 기술 개발을 위한 융합클러스터'를 주제로 연구과제 선정. 연구기간 : 2023.11.01 ~ 2025.10.31"
    },
    {
        id: "n4",
        title: "디지털연구혁신 선도기관 육성 사업 연구과제 선정",
        date: "2023.09",
        category: "Grant",
        image: "/images/NRF.png",
        description: "'인공지능 디지털 트윈 기반 고효율 적층형 반도체 소자 개발 자동화 연구실'을 주제로 연구과제 선정. 연구기간 : 2023.09.01 ~ 2026.12.31 "
    },
    {
        id: "n3",
        title: "대학 혁신역량 강화 기획지원 사업 연구과제 선정",
        date: "2023.09",
        category: "Grant",
        image: "/images/techno.jpg",
        description: "'차세대 마이크로 디스플레이 기술개발'을 주제로 연구과제 선정. 연구기간 : 2023.09.01 ~ 2023.12.31 '우수 과제 선정' "
    },
    {
        id: "n2",
        title: "Paper published",
        date: "2022.10",
        category: "Daily",
        image: "/images/paper1.jpg",
        description: "Prof. Hobeom Kim's paper, 'Asymmetrically substituted 10H,10'H-9,9'-spirobi[acridine] derivatives as hole-transporting materials for perovskite solar cells' has been published in Angewandte Chemie."
    },
    {
        id: "n1",
        title: "New position as an Assistant Professor",
        date: "2022.10",
        category: "Daily",
        image: "/images/GIST_media.jpg",
        description: "Dr. Hobeom Kim has started a new position as an Assistant Professor at the Department of MSE at GIST."
    },
]
