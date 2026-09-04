import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'
import { publications } from '../src/data/publications'
import { thrusts } from '../src/data/research'

type SanitySeedDocument = {
    _type: string
    [key: string]: unknown
}

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2025-01-01',
    token: process.env.SANITY_API_WRITE_TOKEN,
    useCdn: false,
})

async function uploadImage(imagePath: string) {
    if (!imagePath) return null;

    // Convert generic web paths like "/images/file.jpg" back to a local path
    const absolutePath = path.join(__dirname, '..', 'public', imagePath)

    try {
        if (!fs.existsSync(absolutePath)) {
            console.warn(`File not found: ${absolutePath}`)
            return null;
        }

        const imageFile = fs.readFileSync(absolutePath)
        const asset = await client.assets.upload('image', imageFile, {
            filename: path.basename(absolutePath)
        })
        console.log(`Uploaded image: ${path.basename(absolutePath)}`)
        return asset._id
    } catch (err) {
        console.error(`Failed to upload ${imagePath}:`, err)
        return null;
    }
}

async function migrate() {
    console.log('Starting second Sanity migration...\n')

    // --- Migrate Publications ---
    console.log('--- Migrating Publications ---')
    for (const pub of publications) {
        try {
            const pubDoc: SanitySeedDocument = {
                _type: 'publication',
                title: pub.title,
                authors: pub.authors,
                journal: pub.journal,
                year: pub.year,
                volume: pub.volume,
                selected: pub.selected,
                doi: pub.doi,
                description: pub.description,
            }

            if (pub.image) {
                const assetId = await uploadImage(pub.image)
                if (assetId) {
                    pubDoc.image = {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: assetId }
                    }
                }
            }

            await client.create(pubDoc)
            console.log(`Created publication: ${pub.title.substring(0, 30)}...`)
        } catch (error) {
            console.error(`Failed to migrate publication ${pub.title}:`, error)
        }
    }

    // --- Migrate Research Thrusts ---
    console.log('\n--- Migrating Research ---')
    for (const r of thrusts) {
        try {
            const researchDoc: SanitySeedDocument = {
                _type: 'research',
                title: r.title,
                description: r.description,
                details: r.details,
                tags: r.tags,
            }

            if (r.image) {
                const assetId = await uploadImage(r.image)
                if (assetId) {
                    researchDoc.image = {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: assetId }
                    }
                }
            }

            await client.create(researchDoc)
            console.log(`Created research item: ${r.title}`)
        } catch (error) {
            console.error(`Failed to migrate research ${r.title}:`, error)
        }
    }

    // --- Create Professor Singleton ---
    console.log('\n--- Creating Professor Singleton ---')
    try {
        const profDoc = {
            _id: 'professor',
            _type: 'professor',
            education: [
                {
                    _key: 'e1',
                    role: 'Assistant Professor',
                    description: 'Department of Materials Science and Engineering, Gwangju Institute of Science and Technology (GIST) (2022-Present)',
                    highlight: true
                },
                {
                    _key: 'e2',
                    role: 'Postdoctoral Researcher',
                    description: 'Institute of Chemical Sciences and Engineering (ISIC), École Polytechnique Fédérale de Lausanne (EPFL), Switzerland (Advisor: Prof. Mohammad Khaja Nazeeruddin) (2018-2022)',
                    highlight: false
                },
                {
                    _key: 'e3',
                    role: 'Postdoctoral Researcher',
                    description: 'Research Institute of Advanced Materials, Seoul National University (SNU), Republic of Korea (Advisor: Prof. Tae-Woo Lee) (2017-2018)',
                    highlight: false
                },
                {
                    _key: 'e4',
                    role: 'Ph.D. in Materials Science and Engineering',
                    description: 'Pohang University of Science and Technology (POSTECH), South Korea (Advisor: Prof. Tae-Woo Lee) (2011-2017)',
                    highlight: false
                },
                {
                    _key: 'e5',
                    role: 'B.S. in Advanced Materials Science and Engineering',
                    description: 'Sungkyunkwan University (SKKU), South Korea (2004-2011)',
                    highlight: false
                }
            ],
            grants: [
                "과학기술정보통신부 기초연구사업 - 신진연구자 인프라 지원 연구과제 선정, '차세대 반도체·발광 소재 및 소자 결함 분석을 위한 DLTS (Deep-Level Transient Spectroscopy) 장비 구축' (2026.03 - 2027.02)",
                "과학기술정보통신부 기초연구사업 글로벌 매칭형(독일) 연구과제 선정, '근적외선 발광 페로브스카이트의 결함-전하동역학 이해 기반 고효율·고안정성 근적외선 발광다이오드 개발' (2024.12 - 2027.11)",
                "이공분야 기초연구사업 - 우수신진연구 연구과제 선정, '단결정 페로브스카이트 결정다형체 기반 고효율 고안정성 적색 발광다이오드 개발' (2024.05 - 2029.04)",
                "다학제 융합클러스터사업 연구과제 선정, '미래 마이크로 디스플레이 기술 개발을 위한 융합클러스터' (2023.11 - 2025.10)",
                "디지털연구혁신 선도기관 육성 사업 연구과제 선정, '인공지능 디지털 트윈 기반 고효율 적층형 반도체 소자 개발 자동화 연구실' (2023.09 - 2026.12)",
                "대학 혁신역량 강화 기획지원 사업 연구과제 선정, '차세대 마이크로 디스플레이 기술개발' (2023.09 - 2023.12)"
            ],
            awards: [
                "Young Scientist Award, PIERS 2025, Abu Dhabi",
                "Young Scientist Award, The Polymer Society of Korea, 한국고분자학회 신진학술상 (2025 춘계)",
                "Korea Toray Fellowship, Korea Toray Science Foundation, 한국도레이 펠로십, 한국도레이과학진흥재단 (2024)",
                "PRIME SPECIALE, School of Basic Sciences, EPFL, Switzerland (2019)",
                "LG Award, Korean Expert Association on Material Science and Technology in Europe (KEMST) (2019)",
                "Rising Scientist, Inter-Academy Seoul Science Forum (IASSF), The Korea Academy of Science and Technology (KAST), Republic of Korea (2017)",
                "Best Paper Award of Year, Department of Materials Science and Engineering, POSTECH, Republic of Korea (2017)",
                "Excellent Paper Presentation Award,The Korean Society of Industrial and Engineering Chemistry, Republic of Korea (2015)"
            ]
        }
        await client.createOrReplace(profDoc)
        console.log('Created Professor singleton')
    } catch (error) {
        console.error('Failed to create professor singleton:', error)
    }

    // --- Create Opening Singleton ---
    console.log('\n--- Creating Opening Singleton ---')
    try {
        const opDoc = {
            _id: 'opening',
            _type: 'opening',
            koreanDescription: [
                "차세대 반도체/광반도체 소재·소자(페로브스카이트 LED, 태양전지, 뉴로모픽, 센서, 레이징 등) 연구와 더불어, 인공지능 기반 소재 탐색 및 소자 성능 최적화에 관심있는 대학원생, 박사후연구원을 모집합니다. (인턴 환영)",
                "신소재, 화공, 물리, 화학, 컴공, AI 등 이공계 전 분야 지원 가능하며, 학부 전공보다 연구 몰입도를 우선적으로 고려합니다.",
                "관심있는 학생들은 김호범 교수님께 간단한 이메일(자유 양식)로 컨택 바랍니다(e-mail: hobkim@gist.ac.kr)"
            ],
            englishIntro: "The SPELL is looking for passionate researchers to join our journey in pioneering the next generation of semiconductors and AI-integrated technologies.",
            researchAreas: [
                { _key: 'ra1', title: "Next-Gen Materials & Optoelectronic Devices:", description: "Perovskite LEDs, Solar Cells, Neuromorphic Devices, Sensors, and Lasing etc." },
                { _key: 'ra2', title: "AI-Driven Research:", description: "AI-based materials discovery, device performance prediction, and process optimization." }
            ],
            openingPositions: [
                "Graduate Students (M.S./Ph.D. integrated or Ph.D. candidates)",
                "Postdoctoral Researchers",
                "Undergraduate Interns (Warmly welcome!)"
            ],
            eligibility: [
                "Open to all STEM fields: Materials Science, Chemical Engineering, Physics, Chemistry, Computer Science, AI, etc.",
                "We prioritize your passion, dedication, and fundamental research potential over your specific undergraduate major."
            ],
            howToApply: "Interested candidates are encouraged to contact Prof. Kim via email (free format).\nEmail: hobkim@gist.ac.kr"
        }
        await client.createOrReplace(opDoc)
        console.log('Created Opening singleton')
    } catch (error) {
        console.error('Failed to create opening singleton:', error)
    }

    console.log('\n✅ Full migration completed successfully!')
}

migrate()
