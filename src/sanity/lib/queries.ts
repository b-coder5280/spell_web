import { groq } from 'next-sanity'

export const newsQuery = groq`
  *[_type == "news"] | order(date desc) {
    _id,
    title,
    date,
    category,
    "image": image.asset->url,
    "detailImages": detailImages[].asset->url,
    description
  }
`

export const membersQuery = groq`
  *[_type == "member"] | order(order asc) {
    _id,
    name,
    role,
    order,
    interest,
    email,
    position,
    "image": image.asset->url
  }
`

export const galleryQuery = groq`
  *[_type == "gallery"] | order(date desc) {
    _id,
    title,
    date,
    description,
    "images": images[].asset->url
  }
`
