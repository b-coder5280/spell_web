import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { MemberCard } from "@/components/people/member-card"

const members = [
    {
        role: "Post-Doc",
        people: [
            { name: "Dr. Alice Kim", role: "Post-Doc Researcher", interest: "High-efficiency Perovskite LEDs and device physics.", email: "alice@example.com" },
        ]
    },
    {
        role: "Ph.D. Students",
        people: [
            { name: "Bob Lee", role: "Ph.D. Student", interest: "Neuromorphic systems and synaptic transistors.", email: "bob@example.com" },
            { name: "Charlie Park", role: "Ph.D. Student", interest: "Flexible bio-sensors for health monitoring.", email: "charlie@example.com" },
            { name: "David Choi", role: "Ph.D. Student", interest: "Tandem solar cells and stability analysis.", email: "david@example.com" },
        ]
    },
    {
        role: "M.S. Students",
        people: [
            { name: "Eve Jung", role: "M.S. Student", interest: "Novel materials for optoelectronics.", email: "eve@example.com" },
            { name: "Frank Han", role: "M.S. Student", interest: "Machine learning for hardware optimization.", email: "frank@example.com" },
        ]
    }
]

export default function MembersPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-16">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Members</h1>
                    <p className="max-w-2xl text-xl text-muted-foreground">
                        Meet the researchers pushing the boundaries of technology at SPELL Lab.
                    </p>
                </div>

                <div className="space-y-20">
                    {members.map((group) => (
                        <section key={group.role}>
                            <h2 className="mb-8 text-2xl font-bold tracking-tight border-b pb-4">{group.role}</h2>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-8">
                                {group.people.map((person) => (
                                    <MemberCard
                                        key={person.name}
                                        name={person.name}
                                        role={person.role}
                                        interest={person.interest}
                                        email={person.email}
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
