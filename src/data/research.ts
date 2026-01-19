export interface ResearchThrust {
    id: string;
    title: string;
    description: string;
    details: string;
    tags: string[];
    image: string;
    detailImage?: string;
}

export const thrusts: ResearchThrust[] = [
    {
        id: "perovskite LED",
        title: "Perovskite LEDs",
        description: "Next-generation optoelectronic devices: Perovskite LEDs.",
        details: "LEDs exhibit significantly higher energy efficiency than conventional incandescent or fluorescent lamps. Although OLED and QLED technologies currently dominate the display market, there is a growing demand for next-generation LED technologies that can deliver more vivid color reproduction with lower fabrication costs. In particular, with the rapid development of AR and VR technologies, the demand for more immersive and lifelike displays is increasing, highlighting the importance of light-emitting materials that simultaneously achieve high brightness and excellent color reproduction. Our research focuses on the development of high-efficiency, long-lifetime perovskite LEDs based on organic–inorganic metal halide perovskite materials with high color purity and outstanding optoelectronic properties.",
        tags: ["Efficiency", "Stability", "Display"],
        image: "/images/sw_led.png",
    },
    {
        id: "perovskite solar cell",
        title: "Perovskite Solar Cells",
        description: "Next-generation optoelectronic devices: Perovskite solar cells.",
        details: "Perovskite materials exhibit advantages such as high absorption coefficients and low-cost fabrication processes when applied to solar cells. In particular, perovskite solar cells have achieved power conversion efficiencies (PCE) very close to those of conventional silicon solar cells, attracting significant attention as next-generation photovoltaic technologies. However, the instability of perovskite materials against moisture and heat remains a major obstacle to commercialization, especially in terms of device lifetime. Our research focuses on the development of high-efficiency, stable, and long-lifetime perovskite solar cells through defect engineering and interface engineering within the devices.",
        tags: ["AI Hardware", "Synaptic", "Low Power"],
        image: "/images/sw_sol.png"
    },
    {
        id: "neuromorphic",
        title: "Neuromorphics",
        description: "Next-generation neuromorphic devices: Perovskite-based artificial synapses.",
        details: "In the era of artificial intelligence, the demand for energy-efficient, high-speed data processing has driven the rise of neuromorphic computing as an alternative to conventional von Neumann architectures, which suffer from high energy consumption. Metal-halide perovskite memristors, with their low set voltage, high energy efficiency, tunable multilevel states, and multifunctional resistive switching, have emerged as key enablers of neuromorphic computing. Our research focuses on enhancing the stability, retention time, and reliability of these memristors through a detailed analysis of their structural and optoelectronic properties. Ultimately, we aim to integrate this technology into neuromorphic computing applications, including inference, classification, and optical image recognition.",
        tags: ["Wearables", "Stretchable", "Bio-integration"],
        image: "/images/sj_nc.png"
    },
    {
        id: "laser",
        title: "Perovskite-based Lasers",
        description: "Perovskite-based lasing technologies.",
        details: "The development of compact and efficient lasing sources is essential for the advancement of next-generation integrated photonic technologies. Metal halide perovskites have emerged as a promising gain medium owing to their high optical gain, defect tolerance, and color tunability. However, despite their immense potential, perovskite lasing studies are limited to optically pumped lasing due to the challenges of maintaining stability under the high current densities required for laser operation. Our research aims to develop electrically driven perovskite lasers for integration into core components of diverse applications, including on-chip photonic circuits, high-sensitivity bio-sensing, and next-generation LiDAR systems.",
        tags: ["Energy", "Sustainability", "Photovoltaics"],
        image: "/images/jm_laser.png"
    },
    {
        id: "sensors",
        title: "Perovskite-based Sensors",
        description: "Perovskite-based sensing technologies.",
        details: "As on chip photonics and advanced sensing platforms continue to evolve, high responsivity and low noise photodetectors as well as low power chemical sensors are increasingly required. Metal halide perovskites have emerged as a promising sensor material platform, enabled by strong optical absorption, composition tunable bandgaps, and favorable charge transport characteristics. We develop wavelength selective and multispectral perovskite image sensors through bandgap and device architecture engineering, improving the signal-to-noise ratio by suppressing dark current via trap state passivation, interface engineering, and energy level alignment. For gas sensing, we exploit adsorption and desorption induced modulation of electronic states to generate high response chemiresistive electrical response, with performance and operational stability optimized through additive engineering, composition tuning, and morphology control.",
        tags: ["IoT", "Sensing", "Nanomaterials"],
        image: "/images/sj_sen.png"
    },
    {
        id: "AI",
        title: "Artificial Intelligence",
        description: "Development of machine learning models for materials and device design.",
        details: "Material development has traditionally been time-consuming and resource-intensive, requiring significant investment to discover and optimize new substances through experimental methods. Machine learning plays a crucial role in accelerating this process by predicting material properties and simulating device architectures. These models enable the rapid identification of high-performance devices, streamlining the design process and fostering the development of more efficient, reliable devices for various applications. Our research aims to utilize machine learning to accelerate the design of perovskite materials and devices. By learning from experimental and simulated data, ML models predict key properties and suggest design guidelines, thereby speeding up the development of high-performance perovskite-based devices.",
        tags: ["Photonics", "Communication", "Speed"],
        image: "/images/db_research.png"
    }
];
