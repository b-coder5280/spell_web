import { Container } from "@/components/ui/container"
import { MemberCard } from "@/components/people/member-card"
import { client } from "@/sanity/lib/client"
import { membersQuery } from "@/sanity/lib/queries"

export const revalidate = 60

// Desired order of roles
const ROLE_ORDER = [
    "Post Doc.",
    "M.S./Ph.D. Candidates",
    "M.S. Candidates",
    "Intern",
    "Alumni"
];

export default async function MembersPage() {
    const fetchedMembers = await client.fetch<any[]>(membersQuery) || [];

    // Group fetched members by role
    const sanityMembersGrouped = fetchedMembers.reduce((acc, member) => {
        if (!acc[member.role]) acc[member.role] = [];
        acc[member.role].push(member);
        return acc;
    }, {} as Record<string, any[]>);

    // Sort roles according to predefined order, and append any new roles that aren't in the array
    const roles = Object.keys(sanityMembersGrouped).sort((a, b) => {
        const orderA = ROLE_ORDER.indexOf(a)
        const orderB = ROLE_ORDER.indexOf(b)

        if (orderA === -1 && orderB === -1) return 0
        if (orderA === -1) return 1
        if (orderB === -1) return -1
        return orderA - orderB
    })

    const combinedMembers = roles.map(role => ({
        role,
        people: sanityMembersGrouped[role].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
    }))

    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-16">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Members</h1>
                </div>

                <div className="space-y-20">
                    {combinedMembers.map((group) => (
                        <section key={group.role}>
                            <h2 className="mb-8 text-2xl font-bold tracking-tight border-b pb-4">{group.role}</h2>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-10">
                                {group.people.map((person: any) => (
                                    <MemberCard
                                        key={person.name || person._id}
                                        name={person.position ? `${person.name} ${person.position}` : person.name}
                                        role={person.role}
                                        interest={person.interest}
                                        email={person.email}
                                        image={person.image}
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
