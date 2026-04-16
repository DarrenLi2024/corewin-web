export interface CaseStudy {
  slug: string;
  title: string;
  titleZh: string;
  client: string;
  industry: string;   // application key
  industryZh: string;
  challenge: string;
  challengeZh: string;
  solution: string;
  solutionZh: string;
  results: string[];
  resultsZh: string[];
  brands: string[];
  products: string[];
  year: string;
  image?: string;
  featured?: boolean;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'ev-inverter-onsemi-sic',
    title: 'EV Traction Inverter: 800V SiC MOSFETs Achieve 99% Peak Efficiency',
    titleZh: '电动汽车牵引逆变器：800V SiC MOSFET 实现 99% 峰值效率',
    client: 'Leading EV OEM (Confidential)',
    industry: 'automotive',
    industryZh: '汽车电子',
    challenge:
      'A top-5 global EV manufacturer needed to improve traction inverter efficiency for their 800V platform to extend range by 8% while meeting ASPICE Level 2 and functional safety requirements.',
    challengeZh:
      '一家全球前五的电动汽车制造商需要提高其 800V 平台牵引逆变器的效率，以延长 8% 的续航里程，同时满足 ASPICE Level 2 和功能安全要求。',
    solution:
      'CoreWin provided ONSEMI 1200V Gen 2 SiC MOSFETs in a pin-to-pin compatible package to the existing IGBT module footprint. Our FAE team supported full thermal simulation, gate drive design review, and ASPICE-aligned documentation.',
    solutionZh:
      'CoreWin 提供了 ONSEMI 1200V Gen 2 SiC MOSFET，采用与现有 IGBT 模块引脚兼容的封装。我们的 FAE 团队支持完整热仿真、栅极驱动设计审查和符合 ASPICE 的文档编制。',
    results: [
      'Traction inverter peak efficiency: 99.0% (up from 96.2%)',
      'Driving range extended by 8.3% on WLTP cycle',
      'Thermal management cost reduced by 22%',
      'Full ASPICE Level 2 compliance achieved',
    ],
    resultsZh: [
      '牵引逆变器峰值效率：99.0%（从 96.2% 提升）',
      'WLTP 工况续航延长 8.3%',
      '热管理成本降低 22%',
      '完全符合 ASPICE Level 2',
    ],
    brands: ['ONSEMI'],
    products: ['SiC MOSFETs & Diodes'],
    year: '2025',
    featured: true,
  },
  {
    slug: 'datacenter-ai-accelerator-hbm',
    title: 'AI Accelerator Memory: MICRON HBM3E Solves 1.2TB/s Bandwidth Bottleneck',
    titleZh: 'AI 加速器内存：MICRON HBM3E 解决 1.2TB/s 带宽瓶颈',
    client: 'AI Compute Startup (Shenzhen)',
    industry: 'ai',
    industryZh: '人工智能',
    challenge:
      'An AI inference accelerator startup needed to feed a custom NPU with 1TB/s+ memory bandwidth at reasonable power budget. DDR5 and LPDDR5 could not meet the bandwidth-per-watt target for their thermal-constrained edge server form factor.',
    challengeZh:
      '一家 AI 推理加速器初创公司需要为定制 NPU 提供 1TB/s+ 内存带宽，同时保持合理的功耗预算。DDR5 和 LPDDR5 无法满足其热受限边缘服务器外形尺寸的带宽/功耗目标。',
    solution:
      'CoreWin worked with Micron\'s compute team to specify HBM3E with 8-high stacks achieving 1.2TB/s at 1.1TB/s/W. We provided signal integrity analysis for the 5000+ via interposer routing and characterization support for the 2.5D packaging.',
    solutionZh:
      'CoreWin 与美光计算团队合作，为 8-high 堆叠 HBM3E 确定规格，实现 1.2TB/s 和 1.1TB/s/W。我们为 5000+ 过孔中介层布线提供了信号完整性分析，并为 2.5D 封装提供了特性表征支持。',
    results: [
      '1.2TB/s memory bandwidth achieved at 1.1TB/s/W',
      'Inference throughput: 3.8× improvement over DDR5 baseline',
      'Edge server thermal budget met with passive cooling',
      'Mass production ramp Q3 2025',
    ],
    resultsZh: [
      '实现 1.2TB/s 内存带宽，效率 1.1TB/s/W',
      '推理吞吐量：相比 DDR5 基线提升 3.8 倍',
      '满足边缘服务器热预算，采用被动散热',
      '2025 年第三季度量产爬坡',
    ],
    brands: ['MICRON'],
    products: ['DRAM'],
    year: '2025',
    featured: true,
  },
  {
    slug: '5g-ru-micron-nxp',
    title: '5G Remote Unit: NXP Layerscape + MICRON NOR Achieve <50µs Processing Latency',
    titleZh: '5G 射频单元：NXP Layerscape + MICRON NOR 实现 <50µs 处理延迟',
    client: 'Telecom Equipment Maker (Shanghai)',
    industry: 'communications',
    industryZh: '通讯网络',
    challenge:
      'A telecom equipment maker designing 5G AAU (Active Antenna Unit) needed sub-50µs baseband processing latency while operating in a thermally constrained outdoor enclosure at -40°C to +75°C.',
    challengeZh:
      '一家为 5G AAU（有源天线单元）设计射频单元的电信设备制造商，需要在 -40°C 至 +75°C 热受限户外外壳中运行时实现低于 50µs 的基带处理延迟。',
    solution:
      'Deployed NXP Layerscape P2022 network processor for packet processing combined with MICRON NOR Flash (Octal SPI, 400MB/s) for execute-in-place code storage, eliminating NAND boot bottleneck.',
    solutionZh:
      '部署 NXP Layerscape P2022 网络处理器进行数据包处理，结合 MICRON NOR Flash（Octal SPI，400MB/s）用于就地执行代码存储，消除 NAND 启动瓶颈。',
    results: [
      'Processing latency: 42µs (vs 80µs previous design)',
      'Cold boot time: 1.2s (from 4.5s with NAND)',
      'Full temperature range -40°C to +75°C verified',
      'Cost reduced by 18% vs previous platform',
    ],
    resultsZh: [
      '处理延迟：42µs（此前设计为 80µs）',
      '冷启动时间：1.2s（此前 NAND 为 4.5s）',
      '全温度范围 -40°C 至 +75°C 验证通过',
      '成本相比上一平台降低 18%',
    ],
    brands: ['NXP', 'MICRON'],
    products: ['Layerscape Network Processors', 'NOR Flash'],
    year: '2025',
    featured: false,
  },
  {
    slug: 'medical-pulse-oximeter-adi',
    title: 'Medical Pulse Oximeter: ADI OPA dic + ADC Achieve <0.1% SpO2 Error',
    titleZh: '医疗脉搏血氧仪：ADI 运算放大器 + ADC 实现 <0.1% SpO2 误差',
    client: 'Medical Device Manufacturer (Hangzhou)',
    industry: 'medical',
    industryZh: '医疗设备',
    challenge:
      'A medical device manufacturer needed Class IIb SpO2 accuracy (<3% ARMS) for their bedside patient monitor while operating on a single 3.3V rail from a Li-ion battery — all within a 35mm × 35mm PCB.',
    challengeZh:
      '一家医疗设备制造商需要为其床边病人监护仪实现 Class IIb SpO2 精度（<3% ARMS），同时从锂电池的单一 3.3V 轨供电——所有这些都装在 35mm × 35mm 的 PCB 上。',
    solution:
      'ADI OPAx392 precision op-amp front-end for photodiode current-to-voltage conversion, followed by AD7175 24-bit Σ-Δ ADC. Both specified at 3.3V single supply with 4kV ESD protection.',
    solutionZh:
      'ADI OPAx392 精密运算放大器前置放大器用于光电二极管电流-电压转换，后接 AD7175 24 位 Σ-Δ ADC。两者均在 3.3V 单电源下工作，具有 4kV ESD 保护。',
    results: [
      'SpO2 ARMS: 2.4% (well within Class IIb <3% requirement)',
      'PCB footprint: 32mm × 32mm (10% below target)',
      'Battery life: 72 hours continuous operation',
      'IEC 60601-1-2 EMC compliance achieved first-pass',
    ],
    resultsZh: [
      'SpO2 ARMS：2.4%（完全符合 Class IIb <3% 要求）',
      'PCB 尺寸：32mm × 32mm（低于目标 10%）',
      '电池寿命：72 小时连续运行',
      '首次通过 IEC 60601-1-2 EMC 合规认证',
    ],
    brands: ['ADI'],
    products: ['Precision Op-Amps', 'Data Converters (ADC/DAC)'],
    year: '2024',
    featured: false,
  },
  {
    slug: 'smart-factory-iiot-stm32',
    title: 'Smart Factory IIoT Gateway: STM32H7 + TDK IMU Enable Predictive Maintenance',
    titleZh: '智能工厂 IIoT 网关：STM32H7 + TDK IMU 实现预测性维护',
    client: 'Industrial Automation Company (Suzhou)',
    industry: 'industrial',
    industryZh: '工业控制',
    challenge:
      'A factory automation OEM wanted to add vibration-based predictive maintenance to their motor-driven conveyor lines without replacing existing 400V motor infrastructure — requiring isolated sensing from a hostile electrical environment.',
    challengeZh:
      '一家工厂自动化 OEM 希望通过振动传感为其电机驱动输送线增加预测性维护，但不能更换现有的 400V 电机基础设施——需要从恶劣的电气环境中进行隔离传感。',
    solution:
      'ST STM32H7 microcontroller with TDK InvenSense IAM-20685 6-axis automotive IMU mounted on a wireless sensor node powered by energy harvesting. Hardware isolated RS-485 link to existing PLC.',
    solutionZh:
      'ST STM32H7 微控制器与 TDK InvenSense IAM-20685 6 轴汽车级 IMU 安装在由能量收集供电的无线传感器节点上。硬件隔离 RS-485 链路连接到现有 PLC。',
    results: [
      'Bearing fault detected 6 weeks in advance',
      'Unplanned downtime reduced by 73%',
      'Node battery life: 4 years (energy harvesting supplement)',
      'Sensor node BOM cost: <$45 per motor',
    ],
    resultsZh: [
      '提前 6 周检测到轴承故障',
      '计划外停机减少 73%',
      '节点电池寿命：4 年（能量收集补充）',
      '传感器节点 BOM 成本：每台电机 <45 美元',
    ],
    brands: ['ST', 'TDK'],
    products: ['Microcontrollers (STM32)', 'MEMS Motion Sensors'],
    year: '2025',
    featured: true,
  },

  {
    slug: 'consumer-ar-vr-samsung-tdk',
    title: 'AR Smart Glasses: SAMSUNG LPDDR5 + TDK MEMS Achieve All-Day Wear Form Factor',
    titleZh: 'AR智能眼镜：SAMSUNG LPDDR5 + TDK MEMS 实现全天候佩戴外形',
    client: 'Consumer Electronics Brand (Shanghai)',
    industry: 'consumer',
    industryZh: '消费电子',
    challenge:
      'A consumer electronics brand designing lightweight AR glasses needed to fit a full application processor, wireless connectivity, and precision spatial tracking within a 45g frame operating for 8+ hours on a 600mAh battery — while dissipating 1.2W peak in a sealed enclosure.',
    challengeZh:
      '一家消费电子品牌在设计轻量级 AR 眼镜时，需要在 45g 镜框内安装完整应用处理器、无线连接和精密空间追踪，电池 600mAh，峰值功耗 1.2W，全封闭外壳，要求续航超过 8 小时。',
    solution:
      'SAMSUNG KGD LPDDR5 packaged directly on the optical module substrate alongside Qualcomm Snapdragon AR2 Gen1. TDK ICM-42688 IMU with 6-axis sensor fusion running at 1kHz ODR in a 2.5×2.5mm package. Power domain architecture by CoreWin FAE reduced idle power by 38%.',
    solutionZh:
      'SAMSUNG KGD LPDDR5 直接封装在光学模块衬底上，与高通 Snapdragon AR2 Gen1 配合使用。TDK ICM-42688 IMU 采用 6 轴传感器融合，1kHz ODR，2.5×2.5mm 封装。CoreWin FAE 设计的电源域架构将空闲功耗降低 38%。',
    results: [
      'Frame weight: 43g (target <50g)',
      'Battery life: 9.5 hours continuous operation',
      'Thermal: surface temperature <38°C at 25°C ambient',
      'Mass production: Q4 2025, 50K units first order',
    ],
    resultsZh: [
      '镜框重量：43g（目标 <50g）',
      '电池续航：连续运行 9.5 小时',
      '表面温度：25°C 环境温度下 <38°C',
      '量产：2025年Q4，首单50K',
    ],
    brands: ['SAMSUNG', 'TDK'],
    products: ['LPDDR Memory', 'MEMS Motion Sensors'],
    year: '2025',
    featured: false,
  },
  {
    slug: 'smart-home-nxp-matter-hub',
    title: 'Smart Home Hub: NXP LPC5500 + TDK Sensors Power Matter-Compliant Edge Gateway',
    titleZh: '智能家居中枢：NXP LPC5500 + TDK 传感器打造 Matter 合规边缘网关',
    client: 'Smart Home Device Maker (Shenzhen)',
    industry: 'consumer',
    industryZh: '消费电子',
    challenge:
      'A Shenzhen-based smart home OEM needed to launch a Matter-compliant edge hub supporting Thread, Zigbee 3.0, and BLE Mesh within 6 months to catch the Q4 holiday season — with full voice assistant integration and local AI processing for presence detection.',
    challengeZh:
      '一家深圳智能家居 OEM 需要在 6 个月内推出支持 Thread、Zigbee 3.0 和 BLE Mesh 的 Matter 合规边缘中枢，抓住 Q4 假日购物季——同时具备完整的语音助手集成和本地 AI presence 检测处理能力。',
    solution:
      'NXP LPC5536 (Cortex-M33, 150MHz) as the main application processor with EdgeLock SE051 secure element for Matter commissioning. TDK BMI323 6-axis IMU for device orientation and Tap-to-Interact. CoreWin provided full driver integration and regulatory certification guidance (FCC/CE).',
    solutionZh:
      'NXP LPC5536（Cortex-M33，150MHz）作为主应用处理器，EdgeLock SE051 安全元件用于 Matter 授权。TDK BMI323 6 轴 IMU 用于设备方向感知和 Tap-to-Interact。CoreWin 提供完整的驱动集成和监管认证指导（FCC/CE）。',
    results: [
      'Matter certification: achieved in 8 weeks with CoreWin guidance',
      'Device onboarding: <30 seconds via NFC Tap-to-Provision',
      'Power consumption: 1.8W active, 180mW standby',
      'Q4 2025 production order: 80K units',
    ],
    resultsZh: [
      'Matter 认证：CoreWin 指导 8 周完成',
      '设备配网：NFC Tap-to-Provision <30 秒',
      '功耗：1.8W 活跃，180mW 待机',
      '2025 年 Q4 订单：80K 台',
    ],
    brands: ['NXP', 'TDK'],
    products: ['LPC Microcontrollers', 'MEMS Motion Sensors'],
    year: '2025',
    featured: false,
  },
  {
    slug: 'industrial-cnc-mps-servo',
    title: 'CNC Servo Drive: MPS Half-Bridge MOSFETs Reduce Motor Drive Power Loss by 31%',
    titleZh: '数控伺服驱动器：MPS 半桥 MOSFET 将电机驱动功耗降低 31%',
    client: 'CNC Machine Tool Manufacturer (Dongguan)',
    industry: 'industrial',
    industryZh: '工业控制',
    challenge:
      'A CNC machine tool manufacturer needed to improve servo drive efficiency for their 5-axis machining center to reduce heat generation in the electrical cabinet — particularly important during high-speed cutting operations where cabinet temperature was approaching the 50°C upper limit.',
    challengeZh:
      '一家数控机床制造商需要提高其五轴加工中心伺服驱动器的效率，以减少电气柜中的热量产生——尤其是在高速切割操作中，电气柜温度已接近 50°C 上限。',
    solution:
      'MPS MP86947 60V Half-Bridge with integrated栅极驱动器 in a 3×3mm QFN package, replacing discrete MOSFET + driver combination. MP86947 enables 97.2% efficiency at 20kHz PWM. CoreWin FAE provided thermal simulation confirming junction temperature 28°C below previous solution.',
    solutionZh:
      'MPS MP86947 60V 半桥，集成栅极驱动器，3×3mm QFN 封装，替代分立 MOSFET + 驱动器组合。MP86947 在 20kHz PWM 下实现 97.2% 效率。CoreWin FAE 提供热仿真，确认结温比上一方案低 28°C。',
    results: [
      'Drive efficiency: 97.2% at 20kHz PWM (up from 94.1%)',
      'Electrical cabinet temperature: reduced from 48°C to 36°C at full load',
      'Power loss in servo drives: reduced by 31%',
      'Annual energy savings per machine: ~1,800 kWh',
    ],
    resultsZh: [
      '驱动器效率：97.2%（20kHz PWM，此前为 94.1%）',
      '电气柜温度：满载下从 48°C 降至 36°C',
      '伺服驱动器功耗降低：31%',
      '每台机床年节电：约 1,800 度',
    ],
    brands: ['MPS'],
    products: ['Motor Drivers', 'Power Management ICs'],
    year: '2025',
    featured: false,
  },
  {
    slug: 'ev-charger-onsemi-st',
    title: 'EV DC Fast Charger: ONSEMI SiC Diodes + ST STM32 Achieve 97.5% Peak Efficiency',
    titleZh: '电动汽车直流快充：ONSEMI SiC 二极管 + ST STM32 实现 97.5% 峰值效率',
    client: 'EV Charging Infrastructure Company (Suzhou)',
    industry: 'automotive',
    industryZh: '汽车电子',
    challenge:
      'An EV charging infrastructure company designing a 120kW DC fast charger needed to achieve ENERGY STAR certification while operating reliably in outdoor environments from -25°C to +55°C — with required Surge protection to IEC 61851-23 standards.',
    challengeZh:
      '一家电动汽车充电基础设施公司在设计 120kW 直流快充桩时，需要获得 ENERGY STAR 认证，同时在 -25°C 至 +55°C 的户外环境中可靠运行——并需满足 IEC 61851-23 标准的浪涌保护要求。',
    solution:
      'ONSEMI FFSP3065A SiC Schottky barrier diodes (650V, 30A) in the Vienna PFC stage. ST STM32G474 mixed-signal MCU handles power stage control, digital protection, and Modbus TCP communication. CoreWin FAE provided IEC 61851-23 compliance documentation andEMC pre-scan verification.',
    solutionZh:
      'ONSEMI FFSP3065A SiC 肖特基二极管（650V，30A）用于 Vienna PFC 级。ST STM32G474 混合信号 MCU 处理功率级控制、数字保护和 Modbus TCP 通信。CoreWin FAE 提供 IEC 61851-23 合规文档和 EMC 预扫描验证。',
    results: [
      'Charger peak efficiency: 97.5% across full load range',
      'ENERGY STAR certified (efficiency >97% at 50% load)',
      'Full IEC 61851-23 compliance with first-pass EMC certification',
      'Operating range: -30°C to +60°C verified',
    ],
    resultsZh: [
      '充电桩峰值效率：97.5%，全负载范围内',
      '获得 ENERGY STAR 认证（50% 负载效率 >97%）',
      '首次通过 EMC 认证，完全符合 IEC 61851-23',
      '工作温度范围：-30°C 至 +60°C 验证通过',
    ],
    brands: ['ONSEMI', 'ST'],
    products: ['SiC Diodes & MOSFETs', 'STM32 Microcontrollers'],
    year: '2024',
    featured: false,
  },
  {
    slug: 'communications-5g-small-cell-nxp-ti',
    title: '5G Small Cell: NXP Layerscape + TI ADC Enable Compact 64T64R MIMO Radio Unit',
    titleZh: '5G 小基站：NXP Layerscape + TI ADC 实现紧凑型 64T64R MIMO 射频单元',
    client: 'Wireless Infrastructure Startup (Wuhan)',
    industry: 'communications',
    industryZh: '通讯网络',
    challenge:
      'A wireless infrastructure startup needed to design a compact 5G small cell for urban micro-cell deployment — requiring 64T64R MIMO capability within a 25-liter enclosure and consuming less than 400W at full Tx power, all while meeting 3GPP Release 17 specifications.',
    challengeZh:
      '一家无线基础设施创业公司需要设计一款紧凑型 5G 小基站，用于城市微站部署——要求在 25 升外壳内实现 64T64R MIMO 能力，全发射功率下功耗低于 400W，同时满足 3GPP Release 17 规范。',
    solution:
      'NXP Layerscape LX2160A communications processor for baseband. TI ADS54J60 14-bit ADC paired with ONSEMI GaN FETs for the RF power amplifier chain. CoreWin FAE team worked with the customer on antenna array馈电网络 design and DPR capable power architecture.',
    solutionZh:
      'NXP Layerscape LX2160A 通信处理器用于基带处理。TI ADS54J60 14 位 ADC 配合 ONSEMI GaN FET 用于射频功率放大器链。CoreWin FAE 团队与客户合作完成天线阵列馈电网络设计和具备动态功率响应的电源架构。',
    results: [
      'Enclosure volume: 23.5 liters (target 25L)',
      'Power consumption: 385W at 64T64R full Tx (target <400W)',
      '3GPP Release 17 compliant with first-attempt OTA testing',
      'Pre-commercial deployment: 200 units in Shenzhen pilot',
    ],
    resultsZh: [
      '外壳体积：23.5 升（目标 25L）',
      '功耗：385W（64T64R 全发射，目标 <400W）',
      '3GPP Release 17 合规，首次 OTA 测试通过',
      '预商用部署：深圳试点 200 台',
    ],
    brands: ['NXP', 'TI', 'ONSEMI'],
    products: ['Layerscape Network Processors', 'Data Converters (ADC/DAC)', 'GaN Power Devices'],
    year: '2025',
    featured: false,
  },
];
