export interface ResearchThrust {
    id: string;
    title: string;
    description: string;
    details: string;
    tags: string[];
    image: string;
}

export const thrusts: ResearchThrust[] = [
    {
        id: "perovskite",
        title: "Perovskite LED",
        description: "Developing highly efficient and stable perovskite light-emitting diodes for next-generation displays and lighting specifically focusing on color purity and operational lifetime.",
        details: "Our research focuses on defect engineering and surface passivation strategies to enhance the external quantum efficiency (EQE) of PeLEDs. We are also exploring lead-free alternatives for environmentally friendly emission.",
        tags: ["Efficiency", "Stability", "Display"],
        image: "/images/research_perovskite_1766563387855.png"
    },
    {
        id: "neuromorphic",
        title: "Neuromorphic Computing",
        description: "Mimicking biological neural networks in hardware to enable energy-efficient AI processing at the edge, utilizing synaptic devices and memristors.",
        details: "We build artificial synapses using oxide semiconductors and ferroelectric materials. Our devices demonstrate Spike-Timing-Dependent Plasticity (STDP) and other learning rules essential for hardware-based neural networks.",
        tags: ["AI Hardware", "Synaptic", "Low Power"],
        image: "/images/research_neuromorphic_1766563403635.png"
    },
    {
        id: "flexible",
        title: "Flexible Electronics",
        description: "Creating stretchable and transparent electronic systems that can integrate seamlessly with the human body for health monitoring and soft robotics.",
        details: "Using novel polymer composites and nanomaterial networks, we fabricate circuits that maintain performance under severe mechanical deformation. Applications include e-skin and implantable bio-sensors.",
        tags: ["Wearables", "Stretchable", "Bio-integration"],
        image: "/images/research_flexible_1766563419177.png"
    },
    {
        id: "solar",
        title: "Next-Gen Solar Cells",
        description: "Improving the power conversion efficiency of tandem solar cells and exploring new materials for sustainable energy harvesting.",
        details: "Our focus is on Perovskite-Silicon tandem cells to break the Shockley-Queisser limit. We optimize the interface layers to minimize recombination losses and improve long-term stability.",
        tags: ["Energy", "Sustainability", "Photovoltaics"],
        image: "/images/research_solar_1766563436158.png"
    },
    {
        id: "sensors",
        title: "Smart Sensors",
        description: "Fabricating ultra-sensitive sensors for environmental monitoring and varying stimuli detection using novel nanomaterials.",
        details: "We develope gas and optical sensors with high sensitivity and selectivity. By integrating them with IoT platforms, we aim to create smart environmental monitoring systems.",
        tags: ["IoT", "Sensing", "Nanomaterials"],
        image: "/images/research_sensors_1766563457131.png"
    },
    {
        id: "photonics",
        title: "Optoelectronic Devices",
        description: "Investigating light-matter interactions to build faster and smaller optical components for communication and computing systems.",
        details: "Researching silicon photonics and plasmonic devices to increase data transmission speeds while reducing power consumption in data centers.",
        tags: ["Photonics", "Communication", "Speed"],
        image: "/images/global_bg_1766563370615.png"
    }
];
