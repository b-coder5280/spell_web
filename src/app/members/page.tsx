import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { MemberCard } from "@/components/people/member-card"

const members = [
    {
        role: "M.S./Ph.D. Candidates",
        people: [
            { name: "Yeonji Son (Lab Manager 📌)", role: "M.S./Ph.D. Candidates", interest: "Perovskite defect engineering, Perovskite LEDs.", email: "sonyeonjz@gm.gist.ac.kr", image: "/images/yj.jpg" },
            { name: "Junmo Park", role: "M.S./Ph.D. Candidates", interest: "Synthesis of high-crystalline Perovskites, Perovskite LEDs.", email: "dtb06235@gm.gist.ac.kr", image: "/images/jm.jpg" },
            { name: "Byungjun Yoo", role: "M.S./Ph.D. Candidates", interest: "Interfacial layer engineering of Perovskite LEDs.", email: "timdthy7@gm.gist.ac.kr", image: "/images/bj.png" },
            { name: "Sunghwan Park", role: "M.S./Ph.D. Candidates", interest: "AI Digital-Twin based auto lab for developing high-efficiency.", email: "sung0630@gm.gist.ac.kr", image: "/images/sh.jpg" },
            { name: "Dongbeen Lee", role: "M.S./Ph.D. Candidates", interest: "Artificial intelligence for material & device design.", email: "dongbeen@gm.gist.ac.kr", image: "/images/db.png" },
        ]
    },
    {
        role: "M.S. Candidates",
        people: [
            { name: "Suji Moon", role: "M.S. Candidates", interest: "Dry process silicon/perovskite tandem solar cell.", email: "moondduzy@gm.gist.ac.kr", image: "/images/sjm.jpg" },
            { name: "Sangjeung Park", role: "M.S. Candidates", interest: "Perovskite memristor.", email: "partist001@gm.gist.ac.kr", image: "/images/sj.jpg" },
            { name: "Seungwoo Song", role: "M.S. Candidates", interest: "Development of NIR PeLEDs.", email: "seungw00@gm.gist.ac.kr", image: "/images/sw.png" },
        ]
    }
]

export default function MembersPage() {
    return (
        <div className="pb-24 pt-16">
            <Container>
                <div className="mb-16">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight">Members</h1>

                </div>

                <div className="space-y-20">
                    {members.map((group) => (
                        <section key={group.role}>
                            <h2 className="mb-8 text-2xl font-bold tracking-tight border-b pb-4">{group.role}</h2>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4 xl:gap-x-10">
                                {group.people.map((person) => (
                                    <MemberCard
                                        key={person.name}
                                        name={person.name}
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
