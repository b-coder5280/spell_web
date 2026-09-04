import { Container } from "@/components/ui/container"
import { MemberCard } from "@/components/people/member-card"
import { client } from "@/sanity/lib/client"
import { membersPageQuery, membersQuery } from "@/sanity/lib/queries"
import { defaultMembersPageSettings, MembersPageSettings, withDefaults } from "@/lib/site-content"
import type { Metadata } from "next"

export const revalidate = 60
export const metadata: Metadata = {
    title: "Members",
    description: "Members of Semiconductor Photonics and Electronics Lab.",
}

type Member = {
    _id: string
    name: string
    role: string
    order?: number
    interest?: string
    email?: string
    image?: string
    position?: string
}

export default async function MembersPage() {
    const fetchedMembers = await client.fetch<Member[]>(membersQuery) || [];
    const page = withDefaults(defaultMembersPageSettings, await client.fetch<Partial<MembersPageSettings>>(membersPageQuery));

    // Group fetched members by role
    const sanityMembersGrouped = fetchedMembers.reduce((acc, member) => {
        if (!acc[member.role]) acc[member.role] = [];
        acc[member.role].push(member);
        return acc;
    }, {} as Record<string, Member[]>);

    // Sort roles according to predefined order, and append any new roles that aren't in the array
    const roles = Object.keys(sanityMembersGrouped).sort((a, b) => {
        const orderA = page.roleOrder.indexOf(a)
        const orderB = page.roleOrder.indexOf(b)

        if (orderA === -1 && orderB === -1) return 0
        if (orderA === -1) return 1
        if (orderB === -1) return -1
        return orderA - orderB
    })

    const combinedMembers = roles.map(role => ({
        role,
        people: sanityMembersGrouped[role].sort((a, b) => (a.order || 0) - (b.order || 0))
    }))

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-16">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">{page.title}</h1>
                </div>

                <div className="space-y-20">
                    {combinedMembers.map((group) => (
                        <section key={group.role}>
                            <h2 className="mb-8 text-2xl font-bold tracking-tight border-b pb-4">{group.role}</h2>
                            <div className="grid gap-7 lg:grid-cols-2">
                                {group.people.map((person) => (
                                    <MemberCard
                                        key={person.name || person._id}
                                        name={person.position ? `${person.name} ${person.position}` : person.name}
                                        role={person.role}
                                        interest={person.interest}
                                        email={person.email}
                                        image={person.image}
                                        photoPlaceholder={page.photoPlaceholder}
                                        linkedinLabel={page.linkedinLabel}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </Container>
        </div>
    )
}
