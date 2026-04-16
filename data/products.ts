// Brand → Category mapping
export const BRAND_CATEGORIES: Record<string, string> = {
  SAMSUNG: 'storage',
  MICRON: 'storage',
  ADI: 'analog',
  MPS: 'analog',
  TI: 'analog',
  ST: 'digital',
  NXP: 'digital',
  ONSEMI: 'discrete',
  NEXPERIA: 'discrete',
  TDK: 'sensors',
};

// Category keys — authoritative list, derived from CATEGORY_COLORS
export const CATEGORY_KEYS = Object.keys(BRAND_CATEGORIES).reduce<string[]>((cats, brand) => {
  const cat = BRAND_CATEGORIES[brand];
  if (!cats.includes(cat)) cats.push(cat);
  return cats;
}, []);

export const CATEGORY_COLORS: Record<string, string> = {
  storage: '#3B82F6',   // Blue
  analog: '#00D4AA',    // Cyan/Teal
  digital: '#8B5CF6',   // Purple
  discrete: '#FF9500',  // Amber
  sensors: '#EC4899',   // Pink
};

export interface Product {
  brand: string;
  category: string;       // category key e.g. 'storage', 'analog'
  productLine: string;      // e.g. 'NAND Flash', 'Op-Amps'
  specs: string;
  description: string;
  tag: string;
  tagColor: string;
  applications?: string[]; // application keys
}

export const products: Product[] = [
  // ═══════════════════════════════════════════
  // STORAGE — SAMSUNG
  // ═══════════════════════════════════════════
  {
    brand: 'SAMSUNG',
    category: 'storage',
    productLine: 'NAND Flash',
    specs: 'UFS 4.0 · eMMC 5.1 · V-NAND TLC/QLC',
    description: 'Industry-leading V-NAND flash solutions spanning from automotive-grade UFS to consumer eMMC, delivering industry-best write endurance and sequential speeds.',
    tag: 'V-NAND',
    tagColor: '#3B82F6',
    applications: ['datacenter', 'consumer', 'automotive'],
  },
  {
    brand: 'SAMSUNG',
    category: 'storage',
    productLine: 'DRAM',
    specs: 'LPDDR5X · DDR5 · GDDR7 · HBM3E',
    description: 'High-bandwidth, low-power DRAM solutions for mobile, server, and AI accelerator applications. LPDDR5X achieves 8.5Gbps with 50% power reduction vs LPDDR5.',
    tag: 'Flagship',
    tagColor: '#3B82F6',
    applications: ['datacenter', 'ai', 'consumer'],
  },
  {
    brand: 'SAMSUNG',
    category: 'storage',
    productLine: 'SSD Controller',
    specs: 'PCIe 5.0 NVMe · 14GB/s Read · 8-ch',
    description: 'Purpose-built SSD controllers enabling next-gen NVMe SSDs with hardware-rooted security, advanced LDPC ECC, and smart power management for data center workloads.',
    tag: 'Enterprise',
    tagColor: '#1D4ED8',
    applications: ['datacenter', 'ai'],
  },

  // ═══════════════════════════════════════════
  // STORAGE — MICRON
  // ═══════════════════════════════════════════
  {
    brand: 'MICRON',
    category: 'storage',
    productLine: 'NAND Flash',
    specs: 'PCIe 4.0 NVMe · 232-Layer 3D NAND · QLC/TLC',
    description: 'Micron\'s 232-layer 3D NAND delivers best-in-class areal density and write performance for client and edge computing storage applications.',
    tag: '232-Layer 3D',
    tagColor: '#3B82F6',
    applications: ['datacenter', 'consumer'],
  },
  {
    brand: 'MICRON',
    category: 'storage',
    productLine: 'DRAM',
    specs: 'DDR5 · LPDDR5X · HBM3 · 12nm/1β node',
    description: 'Industry\'s first 1β (1-beta) DRAM node in mass production, enabling 50% higher memory bandwidth and 25% better power efficiency for AI and high-performance computing.',
    tag: '1β Node',
    tagColor: '#1D4ED8',
    applications: ['datacenter', 'ai', 'automotive'],
  },
  {
    brand: 'MICRON',
    category: 'storage',
    productLine: 'NOR Flash',
    specs: 'Octal SPI · 1Gb-8Gb · 400MB/s Read',
    description: 'High-speed Octal SPI and xSPI-compliant NOR flash for automotive ADAS, industrial IoT, and 5G front-haul where execute-in-place code storage is critical.',
    tag: 'Automotive',
    tagColor: '#3B82F6',
    applications: ['automotive', 'industrial', 'communications'],
  },

  // ═══════════════════════════════════════════
  // ANALOG — ADI
  // ═══════════════════════════════════════════
  {
    brand: 'ADI',
    category: 'analog',
    productLine: 'Precision Op-Amps',
    specs: 'Zero-Drift · Rail-to-Rail · 1µV Offset',
    description: 'Industry\'s lowest-noise zero-drift operational amplifiers for precision instrumentation, weigh scales, and medical diagnostic equipment.',
    tag: 'Zero-Drift',
    tagColor: '#00D4AA',
    applications: ['medical', 'industrial', 'ai'],
  },
  {
    brand: 'ADI',
    category: 'analog',
    productLine: 'Data Converters (ADC/DAC)',
    specs: '24-bit Σ-Δ ADC · 18-bit SAR · 5MSPS JESD204B',
    description: 'Best-in-class precision ADCs and DACs for test & measurement, defense radar, and scientific instrumentation. The AD7606C 16/18-channel DAS is an industry benchmark.',
    tag: 'Precision',
    tagColor: '#00D4AA',
    applications: ['medical', 'industrial', 'communications'],
  },
  {
    brand: 'ADI',
    category: 'analog',
    productLine: 'Power Management',
    specs: 'µModule · Silent Switcher · 98% Efficiency',
    description: 'Highly integrated µModule (micromodule) regulators combining MOSFETs, inductors, and controllers in a single BGA package. Silent Switcher technology eliminates EMI.',
    tag: 'µModule',
    tagColor: '#059669',
    applications: ['datacenter', 'industrial', 'communications'],
  },
  {
    brand: 'ADI',
    category: 'analog',
    productLine: 'RF & Microwave',
    specs: '24–86GHz · 5G mmWave · Phased Array',
    description: 'Full signal chain solutions for 5G mmWave, phased-array radar, and satellite communications. Industry-leading integrated transceivers reduce BOM by 50%.',
    tag: 'mmWave',
    tagColor: '#00D4AA',
    applications: ['communications', 'automotive', 'ai'],
  },

  // ═══════════════════════════════════════════
  // ANALOG — MPS
  // ═══════════════════════════════════════════
  {
    brand: 'MPS',
    category: 'analog',
    productLine: 'DC-DC Converters',
    specs: '18V–160V · 99% Efficiency · 3mm×3mm QFN',
    description: 'Monolithic and module DC-DCs renowned for ultra-high power density, fast transient response, and minimal EMI. Used in server PSUs, base stations, and motor drives worldwide.',
    tag: 'High Density',
    tagColor: '#00D4AA',
    applications: ['datacenter', 'industrial', 'communications'],
  },
  {
    brand: 'MPS',
    category: 'analog',
    productLine: 'Motor Drivers',
    specs: 'Stepper · BLDC · Gate Driver · SmartFET',
    description: 'Highly integrated motor control ICs combining gate drivers, power stages, and control logic. MPS Halleffect sensorless BLDC drivers reduce system cost by 30%.',
    tag: 'Smart Motor',
    tagColor: '#00D4AA',
    applications: ['industrial', 'automotive', 'consumer'],
  },
  {
    brand: 'MPS',
    category: 'analog',
    productLine: 'Battery Management (BMS)',
    specs: '3-18S · Cell Balancing · 1mA Idle',
    description: 'Fully integrated multi-cell lithium battery management ICs with passive/active cell balancing, autonomous cell monitoring, and ASIL-D safety compliance.',
    tag: 'ASIL-D',
    tagColor: '#059669',
    applications: ['automotive', 'industrial', 'consumer'],
  },

  // ═══════════════════════════════════════════
  // ANALOG — TI
  // ═══════════════════════════════════════════
  {
    brand: 'TI',
    category: 'analog',
    productLine: 'Amplifiers & Signal Chain',
    specs: 'Op-Amp · INA · Comparator · PGA · 0.1µV/°C Drift',
    description: 'The gold standard for general-purpose and precision signal chain. TI amplifiers offer the widest portfolio, best-in-class specs, and immediate availability from authorized stock.',
    tag: 'Gold Standard',
    tagColor: '#00D4AA',
    applications: ['industrial', 'medical', 'automotive'],
  },
  {
    brand: 'TI',
    category: 'analog',
    productLine: 'Data Converters',
    specs: 'SAR ADC · Δ-Σ ADC · High-Speed DAC · JESD204C',
    description: 'From 16-bit 1MSPS SAR ADCs to 14-bit 10GSPS RF DACs, TI covers the full precision-to-high-speed data converter spectrum with proven reference designs.',
    tag: 'Broad Portfolio',
    tagColor: '#FF9500',
    applications: ['communications', 'industrial', 'datacenter'],
  },
  {
    brand: 'TI',
    category: 'analog',
    productLine: 'Power Management',
    specs: 'LDO · DC-DC · Hot Rod QFN · GaN',
    description: 'From 100mA low-noise LDOs to multi-phase 500W DC-DCs, TI\'s power portfolio is unmatched in breadth. GaN-based high-power converters enable 3× power density improvement.',
    tag: 'GaN Power',
    tagColor: '#FF9500',
    applications: ['datacenter', 'consumer', 'industrial'],
  },
  {
    brand: 'TI',
    category: 'analog',
    productLine: 'Embedded Processors',
    specs: 'Arm Cortex-M/R/A · MSP430 · DSP C6000',
    description: 'Sitara MPUs for industrial HMI and edge computing, C2000 DSPs for real-time power conversion control, and MSP430 for ultra-low-power sensing — complete embedded coverage.',
    tag: 'Broad Portfolio',
    tagColor: '#FF9500',
    applications: ['industrial', 'communications', 'ai'],
  },

  // ═══════════════════════════════════════════
  // DIGITAL — ST
  // ═══════════════════════════════════════════
  {
    brand: 'ST',
    category: 'digital',
    productLine: 'Microcontrollers (STM32)',
    specs: 'Arm Cortex-M0+ to M7 · 0.5µA–1A · 20+ series',
    description: 'The world\'s most popular 32-bit MCU family. STM32 spans ultra-low-power STM32L0/L4 to high-performance STM32H7, with wireless STM32W for IoT — all with single-vendor simplicity.',
    tag: '#1 Arm MCU',
    tagColor: '#8B5CF6',
    applications: ['consumer', 'industrial', 'automotive', 'ai'],
  },
  {
    brand: 'ST',
    category: 'digital',
    productLine: 'Smart Power (SPC)',
    specs: 'SPC5 32-bit MCU · IGBT/MOSFET Gate Driver · Vcore 5V',
    description: 'SPC5 automotive microcontrollers integrate Vcore power stages and gate drivers on a single die for BCM, motor control, and powertrain management — reducing PCB area by 40%.',
    tag: 'Automotive',
    tagColor: '#8B5CF6',
    applications: ['automotive', 'industrial'],
  },
  {
    brand: 'ST',
    category: 'digital',
    productLine: 'MEMS & Sensors',
    specs: '6-DoF IMU · 3-Axis Accelerometer · Pressure · ToF',
    description: 'ST\'s MEMS sensors power smartphones, wearables, drones, and industrial condition monitoring. The LSM6DSV 6-axis IMU with AI-core enables on-sensor gesture recognition.',
    tag: 'AI Sensors',
    tagColor: '#8B5CF6',
    applications: ['consumer', 'automotive', 'industrial', 'ai'],
  },

  // ═══════════════════════════════════════════
  // DIGITAL — NXP
  // ═══════════════════════════════════════════
  {
    brand: 'NXP',
    category: 'digital',
    productLine: 'i.MX Applications Processors',
    specs: 'Cortex-A35/A53/A72 · GPU/VPU · 5V tolerant I/O',
    description: 'Scalable applications processors from cost-optimized i.MX 6ULL (Cortex-A7) to high-performance i.MX 8QuadMax (Cortex-A72 + GPU) for automotive IVI, industrial HMI, and edge AI.',
    tag: 'Scalable',
    tagColor: '#8B5CF6',
    applications: ['automotive', 'industrial', 'ai', 'smartHome'],
  },
  {
    brand: 'NXP',
    category: 'digital',
    productLine: 'S32 Automotive Platform',
    specs: 'S32G vehicle network · S32K MCU · Radar processing',
    description: 'Domain/zonal E/E architecture processors for software-defined vehicles. S32G gateway processors handle vehicle cloud connectivity and real-time body control simultaneously.',
    tag: 'Software-Defined',
    tagColor: '#7C3AED',
    applications: ['automotive'],
  },
  {
    brand: 'NXP',
    category: 'digital',
    productLine: 'Layerscape Network Processors',
    specs: '1G–100G Ethernet · packet inspection · TSN',
    description: 'Purpose-built network processors for switches, routers, 5G RAN, and edge computing. Layerscape QorIQ family delivers wire-speed packet processing with hardware trust architecture.',
    tag: 'Wire-Speed',
    tagColor: '#8B5CF6',
    applications: ['communications', 'datacenter'],
  },

  // ═══════════════════════════════════════════
  // DISCRETE — ONSEMI
  // ═══════════════════════════════════════════
  {
    brand: 'ONSEMI',
    category: 'discrete',
    productLine: 'SiC MOSFETs & Diodes',
    specs: '650V–1200V · Gen 2 · 15mΩ Rds(on)',
    description: 'Elite SiC MOSFETs and SiC Schottky barrier diodes for EV traction inverters, OBCs, and solar PV inverters. onSemi\'s SiC technology is IATF16949 certified for automotive production.',
    tag: 'Automotive SiC',
    tagColor: '#FF9500',
    applications: ['automotive', 'industrial', 'datacenter'],
  },
  {
    brand: 'ONSEMI',
    category: 'discrete',
    productLine: 'IGBTs & SuperJunction MOSFETs',
    specs: '600V–1700V · FS/Trench · 10µs Short Circuit',
    description: 'High-voltage IGBTs for motor drives and inverters, and superjunction MOSFETs for server SMPS and telecom power. Wide package options including PressFit and EVpak for automotive.',
    tag: 'High Voltage',
    tagColor: '#FF9500',
    applications: ['industrial', 'automotive', 'communications'],
  },
  {
    brand: 'ONSEMI',
    category: 'discrete',
    productLine: 'Power Modules (IGBT/SiC)',
    specs: 'E2B/DCM/PIM packages · 30A–400A · Integrated Shunt',
    description: 'Factory-integrated power module solutions combining IGBT or SiC switches with gate drivers, shunt resistors, and temperature sensing in a single rugged package.',
    tag: 'Power Module',
    tagColor: '#F59E0B',
    applications: ['industrial', 'automotive'],
  },

  // ═══════════════════════════════════════════
  // DISCRETE — NEXPERIA
  // ═══════════════════════════════════════════
  {
    brand: 'NEXPERIA',
    category: 'discrete',
    productLine: 'MOSFETs',
    specs: '20V–650V · Trench/SJ · 0.5mΩ–10Ω Rds(on)',
    description: 'Europe\'s largest discrete semiconductor supplier. Nexperia MOSFETs cover everything from sub-1Ω load switching to ultra-low Rds(on) synchronous rectification in advanced LFPAK/EPC packages.',
    tag: 'LFPAK',
    tagColor: '#FF9500',
    applications: ['automotive', 'consumer', 'industrial'],
  },
  {
    brand: 'NEXPERIA',
    category: 'discrete',
    productLine: 'GaN Power Devices',
    specs: '650V · 7.5mΩ · 650V GaN-on-Si · Trench Gate',
    description: 'Automotive-grade 650V GaN HEMTs in Nexperia\'s proprietary Trench Gate technology, achieving 10× better figure-of-merit vs silicon SJ-MOSFETs in a highly reliable, AEC-Q101-qualified package.',
    tag: 'Automotive GaN',
    tagColor: '#FF9500',
    applications: ['automotive', 'industrial', 'datacenter'],
  },
  {
    brand: 'NEXPERIA',
    category: 'discrete',
    productLine: 'Logic & Interface ICs',
    specs: '74HC/74HCT/74AUC · I2C/SPI · 1.8V–5.5V',
    description: 'The industry-standard logic family — over 300 logic functions from gates to bus switches, level translators, and voltage supervisors. Available in tiny 6-pin packages to QFN40.',
    tag: 'Standard Logic',
    tagColor: '#F59E0B',
    applications: ['consumer', 'industrial', 'automotive'],
  },

  // ═══════════════════════════════════════════
  // SENSORS — TDK
  // ═══════════════════════════════════════════
  {
    brand: 'TDK',
    category: 'sensors',
    productLine: 'MEMS Motion Sensors',
    specs: '6-DoF/7-DoF IMU · Accelerometer · Gyroscope',
    description: 'TDK InvenSense MEMS IMUs dominate in drones, TWS earbuds, AR/VR, and automotive ADAS. The IAM-20685 6-axis automotive-grade IMU meets ASPICE and AEC-Q100 Grade 2.',
    tag: 'MEMS IMU',
    tagColor: '#EC4899',
    applications: ['automotive', 'consumer', 'industrial', 'ai'],
  },
  {
    brand: 'TDK',
    category: 'sensors',
    productLine: 'Pressure Sensors',
    specs: '1–500kPa · MEMS Barometer · Digital Output',
    description: 'Ultra-compact MEMS pressure sensors for wearable blood pressure, industrial process control, and automotive MAP/BMAP sensors. InvenSense barometers achieve ±0.5hPa absolute accuracy.',
    tag: 'MEMS Barometer',
    tagColor: '#EC4899',
    applications: ['medical', 'consumer', 'automotive', 'industrial'],
  },
  {
    brand: 'TDK',
    category: 'sensors',
    productLine: 'Magnetic Sensors',
    specs: 'Hall Effect · TMR · 0.5µT resolution',
    description: 'TDK\'s Tunneling Magnetoresistance (TMR) sensors offer 100× better sensitivity than conventional Hall sensors, enabling precise position sensing in automotive BLDC motor commutation.',
    tag: 'TMR Sensor',
    tagColor: '#EC4899',
    applications: ['automotive', 'industrial', 'consumer'],
  },
  {
    brand: 'TDK',
    category: 'sensors',
    productLine: 'Power Inductors & Magnetics',
    specs: ' automotive AEC-Q200 · 10µH–1mH · 20A Isat',
    description: 'Automotive-grade (AEC-Q200) inductors, common-mode chokes, and integrated magnetic components for EV OBC, DC-DC converters, and CAN/LIN bus EMI suppression.',
    tag: 'AEC-Q200',
    tagColor: '#BE185D',
    applications: ['automotive', 'industrial', 'datacenter'],
  },
];

