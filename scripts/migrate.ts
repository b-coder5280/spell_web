import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import * as dotenv from 'dotenv'

// We need to read the raw files because `members` is inside a component, not exported cleanly as JSON/data.
// To keep the script simple, we'll manually define the member data here as it was inside `page.tsx`.
const membersData = [
    {
        role: "Post Doc.",
        people: [
            { name: "유소민 (So-Min Yoo)", role: "Post Doc.", interest: "Perovskite solar cells", email: "yoosomin01@gist.ac.kr", image: "/images/sm.jpg" },
        ]
    },
    {
        role: "M.S./Ph.D. Candidates",
        people: [
            { name: "손연지 (Yeonji Son)", position: "Lab Manager 📌", role: "M.S./Ph.D. Candidates", interest: "Perovskite LEDs", email: "sonyeonjz@gm.gist.ac.kr", image: "/images/yj.jpg" },
            { name: "박준모 (Junmo Park)", role: "M.S./Ph.D. Candidates", interest: "Single crystal perovskites", email: "dtb06235@gm.gist.ac.kr", image: "/images/jm.jpg" },
            { name: "유병준 (Byungjun Yoo)", role: "M.S./Ph.D. Candidates", interest: "Perovskite LEDs", email: "timdthy7@gm.gist.ac.kr", image: "/images/bj.png" },
            { name: "박성환 (Sunghwan Park)", role: "M.S./Ph.D. Candidates", interest: "Perovskite solar cells", email: "sung0630@gm.gist.ac.kr", image: "/images/sh.jpg" },
            { name: "이동빈 (Dongbeen Lee)", role: "M.S./Ph.D. Candidates", interest: "AI for perovskite optoelectronics", email: "dongbeen@gm.gist.ac.kr", image: "/images/db.png" },
        ]
    },
    {
        role: "M.S. Candidates",
        people: [
            { name: "박상증 (Sangjeung Park)", role: "M.S. Candidates", interest: "Perovskite memristors", email: "partist001@gm.gist.ac.kr", image: "/images/sj.jpg" },
            { name: "송승우 (Seungwoo Song)", role: "M.S. Candidates", interest: "NIR Perovskite LEDs", email: "seungw00@gm.gist.ac.kr", image: "/images/sw.png" },
        ]
    },
    {
        role: "Intern",
        people: [
            { name: "정지호 (Jiho Chung)", role: "Intern", email: "zeusregcjh@gm.gist.ac.kr", image: "/images/jh.jpg" },
            { name: "Mifzal Al Fatih Rahayudin", role: "Intern", email: "20255255@gm.gist.ac.kr", image: "/images/ft.jpg" },
            { name: "정주영 (Juyeong Jeong)", role: "Intern", email: "juyeong6255@gmail.com", image: "/images/jy.jpg" },
        ]
    },
    {
        role: "Alumni",
        people: [
            { name: "문수지 (Suji Moon)", role: "Alumni", interest: "한국화학연구원(KRICT)", email: "moondduzy@gm.gist.ac.kr", image: "/images/sjm.jpg" }
        ]
    }
]

// Dynamically import data to avoid TS issues with running this file directly if needed
import { newsItems } from '../src/data/news'
import { galleryItems } from '../src/data/gallery'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables. Add SANITY_API_WRITE_TOKEN to .env.local')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    token,
    apiVersion: '2024-03-11' // use current date
})

async function uploadImage(imagePath: string) {
    if (!imagePath) return null;

    try {
        // Assume images are in the `public` folder
        const fullPath = path.join(process.cwd(), 'public', imagePath)

        if (!fs.existsSync(fullPath)) {
            console.warn(`Image not found: ${fullPath}`);
            return null;
        }

        const imageBuffer = fs.readFileSync(fullPath)
        const filename = path.basename(fullPath)

        const asset = await client.assets.upload('image', imageBuffer, {
            filename: filename
        })

        console.log(`Uploaded image: ${filename}`)
        return {
            _type: 'image',
            asset: {
                _type: 'reference',
                _ref: asset._id
            }
        }
    } catch (error) {
        console.error(`Failed to upload image ${imagePath}:`, error)
        return null;
    }
}

async function migrateNews() {
    console.log('\n--- Migrating News ---')
    for (const item of newsItems) {
        const imageAsset = item.image ? await uploadImage(item.image) : null;

        const detailImageAssets = [];
        if (item.detailImages && item.detailImages.length > 0) {
            for (const detailImgPath of item.detailImages) {
                const asset = await uploadImage(detailImgPath);
                if (asset) detailImageAssets.push(asset);
            }
        }

        const doc: any = {
            _type: 'news',
            title: item.title,
            date: item.date,
            category: item.category || 'General',
        }

        if (imageAsset) doc.image = imageAsset;
        if (detailImageAssets.length > 0) doc.detailImages = detailImageAssets;
        if (item.description) doc.description = item.description;

        await client.create(doc)
        console.log(`Created news: ${item.title}`)
    }
}

async function migrateGallery() {
    console.log('\n--- Migrating Gallery ---')
    for (const item of galleryItems) {
        const imageAssets = [];
        if (item.images && item.images.length > 0) {
            for (const imgPath of item.images) {
                const asset = await uploadImage(imgPath);
                if (asset) imageAssets.push(asset);
            }
        }

        if (imageAssets.length > 0) {
            const doc = {
                _type: 'gallery',
                title: item.title,
                date: item.date,
                images: imageAssets
            }
            await client.create(doc)
            console.log(`Created gallery item: ${item.title}`)
        } else {
            console.warn(`Skipped gallery item due to missing images: ${item.title}`);
        }
    }
}

async function migrateMembers() {
    console.log('\n--- Migrating Members ---')
    let order = 1;
    for (const group of membersData) {
        for (const person of group.people) {
            const imageAsset = person.image ? await uploadImage(person.image) : null;

            const doc: any = {
                _type: 'member',
                name: person.name,
                role: group.role,
                order: order++,
            }

            const p = person as any;
            if (p.position) doc.position = p.position; // Custom property not strictly in schema but safe
            if (p.interest) doc.interest = p.interest;
            if (person.email) doc.email = person.email;
            if (imageAsset) doc.image = imageAsset;

            await client.create(doc)
            console.log(`Created member: ${person.name}`)
        }
    }
}

async function main() {
    console.log('Starting Sanity migration...')
    try {
        await migrateMembers()
        await migrateNews()
        await migrateGallery()
        console.log('\n✅ Migration completed successfully!')
    } catch (error) {
        console.error('Migration failed:', error)
    }
}

main()
