export interface BlogPost {
  slug: string;
  title: string;
  titleZh: string;
  excerpt: string;
  excerptZh: string;
  category: string;
  categoryZh: string;
  date: string;
  readTime: string;
  featured?: boolean;
  image?: string;
  content: string;
  contentZh: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'sic-mosfet-design-guide-2026',
    title: 'SiC MOSFET Design Guide: Optimizing High-Efficiency Power Converters in 2026',
    titleZh: 'SiC MOSFET 设计指南：2026 年高效率功率转换器优化',
    excerpt: 'A comprehensive guide to designing with Silicon Carbide MOSFETs, covering gate drive, thermal management, and layout best practices for achieving peak efficiency in power converter applications.',
    excerptZh: '全面的碳化硅 MOSFET 设计指南，涵盖栅极驱动、热管理和布局最佳实践，帮助您在功率转换应用中实现最高效率。',
    category: 'Power Electronics',
    categoryZh: '电力电子',
    date: '2026-03-15',
    readTime: '12 min read',
    featured: true,
    content: `
## Introduction

Silicon Carbide (SiC) MOSFETs have become the preferred choice for high-efficiency power converter designs, offering superior switching performance compared to traditional silicon devices.

## Key Design Considerations

### 1. Gate Drive Design
- Use a gate resistor (Rg) between 2.2Ω and 10Ω for most applications
- Implement negative turn-off voltage (-2V to -5V) to prevent spurious turn-on
- Select gate driver with high peak current (>4A) for fast switching

### 2. Thermal Management
- Calculate power losses accurately using datasheet curves
- Design heatsinks with thermal resistance adequate for RθJC + RθCS + RθSA
- Consider junction-to-case thermal impedance for peak temperature estimation

### 3. PCB Layout Best Practices
- Minimize loop area in the power stage
- Place gate resistors close to the MOSFET gate pin
- Use Kelvin source connection to separate power and signal grounds
- Implement proper shielding for high dV/dt nodes

## Conclusion

Proper SiC MOSFET design requires attention to gate drive, thermal management, and layout. Following these guidelines will help engineers achieve reliable, high-efficiency designs.
    `,
    contentZh: `
## 引言

碳化硅（SiC）MOSFET 已成为高效率功率转换器设计的首选，与传统硅器件相比具有更优越的开关性能。

## 关键设计考量

### 1. 栅极驱动设计
- 大多数应用中使用 2.2Ω 到 10Ω 之间的栅极电阻（Rg）
- 实现负关断电压（-2V 至 -5V）以防止误导通
- 选择高峰值电流（>4A）的栅极驱动器以实现快速开关

### 2. 热管理
- 使用 datasheet 曲线准确计算功率损耗
- 设计具有足够热阻的散热片（RθJC + RθCS + RθSA）
- 考虑结到外壳热阻抗以估算峰值温度

### 3. PCB 布局最佳实践
- 最小化功率级的回路面积
- 将栅极电阻放置在靠近 MOSFET 栅极引脚的位置
- 使用 Kelvin 源极连接分离功率地和信号地
- 对高 dV/dt 节点实施适当屏蔽

## 结论

正确的 SiC MOSFET 设计需要关注栅极驱动、热管理和布局。遵循这些指南将帮助工程师实现可靠、高效率的设计。
    `,
  },
  {
    slug: 'st-stm32-mcu-selection-guide',
    title: 'STM32 MCU Selection Guide: Choosing the Right Cortex-M for Your Application',
    titleZh: 'STM32 MCU 选型指南：如何为您的应用选择合适的 Cortex-M',
    excerpt: 'Navigate STMicroelectronics\' extensive STM32 portfolio with our comprehensive selection guide, covering the key differences between series and helping you match requirements to the optimal MCU.',
    excerptZh: '通过我们的全面选型指南，了解 STMicroelectronics 广泛的 STM32 产品系列，涵盖各系列之间的关键差异，帮助您将需求与最佳 MCU 相匹配。',
    category: 'Microcontrollers',
    categoryZh: '微控制器',
    date: '2026-01-20',
    readTime: '10 min read',
    content: `
## Overview

STMicroelectronics' STM32 family is one of the most comprehensive Arm Cortex-M microcontroller portfolios available. With over 1000 part numbers across multiple series, selecting the right MCU can be challenging.

## Series Comparison

| Series | Core | Target Applications |
|--------|------|---------------------|
| STM32L0/L4/L5 | Cortex-M0+/M4/M33 | Ultra-low power |
| STM32G0/G4 | Cortex-M0+/M4 | General purpose |
| STM32H7 | Cortex-M7 | High performance |
| STM32MP1 | Cortex-A7 + M4 | MPU + MCU |

## Selection Criteria

1. **Compute Requirements**: Determine needed DMIPS and DSP performance
2. **Memory**: Flash (up to 2MB) and SRAM (up to 1MB) configurations
3. **Peripherals**: USB, Ethernet, CAN, ADC channels needed
4. **Power Budget**: Active current and wake-up time constraints
5. **Package**: QFN, LQFP, or BGA options for your form factor
    `,
    contentZh: `
## 概述

STMicroelectronics 的 STM32 系列是业界最全面的 Arm Cortex-M 微控制器产品组合之一。凭借超过 1000 个型号和多个系列，选择合适的 MCU 可能具有挑战性。

## 系列对比

| 系列 | 内核 | 目标应用 |
|------|------|---------|
| STM32L0/L4/L5 | Cortex-M0+/M4/M33 | 超低功耗 |
| STM32G0/G4 | Cortex-M0+/M4 | 通用型 |
| STM32H7 | Cortex-M7 | 高性能 |
| STM32MP1 | Cortex-A7 + M4 | MPU + MCU |

## 选型标准

1. **计算需求**：确定所需的 DMIPS 和 DSP 性能
2. **内存**：Flash（最高 2MB）和 SRAM（最高 1MB）配置
3. **外设**：所需的 USB、Ethernet、CAN、ADC 通道
4. **功耗预算**：工作电流和唤醒时间约束
5. **封装**：QFN、LQFP 或 BGA 选项以适合您的外形尺寸
    `,
   },
  {
    slug: 'hbm3e-memory-selection-guide',
    title: 'HBM3 vs HBM3E vs HBM4: A Memory Selection Guide for AI Accelerators',
    titleZh: 'HBM3 vs HBM3E vs HBM4：AI 加速器内存选型指南',
    excerpt: 'As AI compute demands push memory bandwidth requirements beyond 1TB/s, understanding the differences between HBM3, HBM3E, and the upcoming HBM4 becomes critical for hardware architects designing next-generation AI accelerators.',
    excerptZh: '随着 AI 计算需求将内存带宽要求推至 1TB/s 以上，了解 HBM3、HBM3E 和即将推出的 HBM4 之间的差异，对于设计下一代 AI 加速器的硬件架构师来说至关重要。',
    category: 'AI & Data Center',
    categoryZh: 'AI与数据中心',
    date: '2026-03-28',
    readTime: '10 min read',
    featured: true,
    content: `
## Why Memory Bandwidth Matters for AI Inference

In neural network inference, the dominant bottleneck is often not compute — it is memory bandwidth. A GPU or NPU that can perform 500 TOPS of matrix multiplications cannot sustain that performance if its memory subsystem can only supply data at 500 GB/s.

## HBM3: The Current Standard

HBM3, specified by JEDEC in 2022, achieves:
- Data rates from 6.4 Gbps to 9.2 Gbps per pin
- 1024-bit per stack (HBM3 stacks are 12 DRAM dies thick)
- Bandwidth per stack: up to 1.2 TB/s with 9.2 Gbps at 1000MHz clock

HBM3 is currently used in NVIDIA H100, AMD MI300X, and most cloud AI training accelerators.

## HBM3E: The Near-Term Upgrade

HBM3E extends HBM3 with higher data rates (up to 12.8 Gbps per pin) through improved signal integrity techniques and more efficient thermal interface materials. Key improvements:
- Up to 1.6 TB/s per stack
- Better thermal performance for sustained workloads
- Pin-compatible with HBM3, enabling drop-in upgrades

## HBM4: What We Know So Far

JEDEC HBM4 is expected to double the per-pin data rate to 20+ Gbps and increase stack height from 12 to 16 DRAM dies. Bandwidth projections exceed 2.5 TB/s per stack.

## Selection Criteria

| Parameter | HBM3 | HBM3E | HBM4 (projected) |
|-----------|------|--------|---------|
| Bandwidth/stack | 1.0–1.2 TB/s | 1.4–1.6 TB/s | 2.5+ TB/s |
| Data rate/pin | 6.4–9.2 Gbps | 12.8 Gbps | 20+ Gbps |
| Stack height | 12 dies | 12 dies | 16 dies |
| Status | In production | Sampling now | 2027+ |

## Conclusion

For inference accelerators targeting production deployment in 2026, HBM3E is the practical choice. HBM4 is too early and HBM3 is being phased out. The critical decision is how many HBM3E stacks your interposer can physically accommodate.
    `,
    contentZh: `
## 为什么内存带宽对 AI 推理至关重要

在神经网络推理中，主要瓶颈往往不是计算——而是内存带宽。一个能够执行 500 TOPS 矩阵乘法的 GPU 或 NPU，如果其内存子系统只能以 500 GB/s 的速度提供数据，则无法维持该性能。

## HBM3：当前标准

HBM3 于 2022 年由 JEDEC 指定，实现：
- 每引脚数据率 6.4 Gbps 至 9.2 Gbps
- 每个堆栈 1024 位（HBM3 堆栈为 12 个 DRAM 裸片）
- 每个堆栈带宽：9.2 Gbps @ 1000MHz 时钟，最高 1.2 TB/s

## HBM3E：近期升级

HBM3E 通过改进的信号完整性技术和更高效的热界面材料，将数据率提高至每引脚 12.8 Gbps。主要改进：每个堆栈 1.6 TB/s，更好的热性能以维持持续工作负载，与 HBM3 引脚兼容。

## 选择标准

对于 2026 年生产部署的推理加速器，HBM3E 是实用选择。关键决策是您的中介层在物理上能容纳多少个 HBM3E 堆栈。
    `,
  },
  {
    slug: 'motor-driver-selection-guide',
    title: 'BLDC Motor Driver Selection: How to Match MOSFETs, Gate Drivers, and Control ICs',
    titleZh: '无刷直流电机驱动选型：如何匹配 MOSFET、栅极驱动器和控制 IC',
    excerpt: 'Designing a BLDC motor drive requires careful matching of power devices, gate drivers, and control algorithms. This guide walks through the key tradeoffs from MOSFET Rds-on to control loop bandwidth for industrial and consumer motor applications.',
    excerptZh: '设计无刷直流电机驱动器需要仔细匹配功率器件、栅极驱动器和控制算法。本指南深入探讨从 MOSFET Rds-on 到工业和消费电机应用控制回路带宽的关键权衡。',
    category: 'Motor Control',
    categoryZh: '电机控制',
    date: '2026-02-20',
    readTime: '14 min read',
    content: `
## BLDC Motor Drive Architecture

A modern BLDC motor drive consists of three power stages: a MOSFET-based three-phase inverter, a gate driver IC, and a motor control MCU or dedicated control IC.

## MOSFET Selection Criteria

For BLDC drives, MOSFET selection is dominated by three parameters:
- **Rds(on)**: Determines conduction losses. At 20A motor current, a 2mΩ MOSFET drops 0.8W vs 5mΩ at 2W.
- **Qg (total gate charge)**: Determines switching speed and driver current requirements.
- **Vdss (breakdown voltage)**: Must exceed worst-case supply voltage + transients. Use 80% derating: 48V system → 80V MOSFET minimum.

## Gate Driver Matching

The gate driver must source/sink enough current to charge/discharge the MOSFET gate in your target switching time:
- 10ns switching → ~10A peak driver current required
- Calculate driver strength requirement: Ipeak = Qg / tsw

MPS motor driver ICs combine gate drivers with integrated MOSFETs (SmartFET) for currents up to 15A, reducing PCB footprint by 60%.

## Control Loop Bandwidth

Industrial servo drives typically require 2–5 kHz current loop bandwidth. Key considerations:
- PWM frequency: 20kHz minimum for audibly silent operation
- ADC sampling: at least 2× PWM frequency for accurate current measurement
- Phase current measurement using single-shunt with correct timing
    `,
    contentZh: `
## 无刷直流电机驱动器架构

现代无刷直流电机驱动器由三个功率级组成：基于 MOSFET 的三相逆变器、栅极驱动器 IC 和电机控制 MCU 或专用控制 IC。

## MOSFET 选型关键参数

选择 MOSFET 时主要考虑三个参数：
- **Rds(on)**：决定导通损耗。20A 电机电流下，2mΩ MOSFET 损耗 0.8W，5mΩ 则为 2W。
- **Qg（总栅极电荷）**：决定开关速度和驱动器电流要求。
- **Vdss（击穿电压）**：必须超过最坏情况电源电压 + 瞬态。

## 栅极驱动器匹配

驱动器必须提供足够的电流在目标开关时间内充放电 MOSFET 栅极：10ns 开关 → 需要约 10A 峰值驱动器电流。

工业伺服驱动器通常需要 2–5 kHz 电流回路带宽。
    `,
  },
  {
    slug: 'tdk-mems-sensor-guide',
    title: 'TDK MEMS Sensors for Industrial IoT: From IMU Selection to Vibration Analysis',
    titleZh: 'TDK MEMS 传感器在工业物联网中的应用：从 IMU 选型到振动分析',
    excerpt: 'TDK InvenSense IMUs are the backbone of industrial condition monitoring and predictive maintenance systems. This guide covers IMU selection criteria, sensor fusion algorithms, and practical implementation for vibration-based bearing fault detection.',
    excerptZh: 'TDK InvenSense IMU 是工业状态监测和预测性维护系统的核心。本指南涵盖 IMU 选型标准、传感器融合算法，以及振动轴承故障检测的实践实现。',
    category: 'Industrial IoT',
    categoryZh: '工业物联网',
    date: '2026-02-05',
    readTime: '11 min read',
    content: `
## Why MEMS IMUs for Industrial?

Traditional industrial vibration monitoring uses piezoelectric accelerometers — accurate but expensive ($200–$500 per sensor) and requiring dedicated signal conditioning. MEMS accelerometers from TDK (IAM-20685, ICM-42688) offer:
- Sub-$10 per axis at volume
- Integrated DSP with configurable digital filters
- I2C/SPI interface directly to microcontroller
- AEC-Q100 automotive grade options for harsh environments

## Key IMU Specifications for Vibration Monitoring

### Noise Density
Bearing fault detection typically requires vibration resolution of 0.01g at frequencies up to 5kHz. Calculate required noise density:
- Target resolution: 0.01g / √Hz at 5kHz bandwidth
- Required noise density: < 100 μg/√Hz
- TDK ICM-42688: 75 μg/√Hz (适合大多数轴承检测应用)

### Accelerometer Range
Industrial machinery vibrates up to 50g during events. Use ±50g or ±100g range IMUs — do not use ±2g/±4g consumer IMUs.

## Sensor Fusion for Orientation-Compensated Vibration

When the IMU is mounted on a rotating shaft, gravity coupling creates false vibration signatures. Solve this with a 6-axis sensor fusion algorithm using both accelerometer and gyroscope data. ST Microelectronics STM32 MotionFX library provides this out of the box.
    `,
    contentZh: `
## 为什么选择 MEMS IMU 进行工业监测

传统工业振动监测使用压电加速度计——精度高但价格昂贵（每个传感器 200–500 美元），且需要专用信号调理。TDK IAM-20685、ICM-42688 等 MEMS 加速度计提供：
- 批量使用时每轴低于 10 美元
- 集成 DSP，配置灵活的数字滤波器
- I2C/SPI 接口直接连接微控制器
- AEC-Q100 汽车级选项，适用于恶劣环境

## 振动监测关键 IMU 规格

### 噪声密度
轴承故障检测通常需要在最高 5kHz 频率下达到 0.01g 的振动分辨率。TDK ICM-42688 噪声密度 75 μg/√Hz，适合大多数应用。

### 加速度计量程
工业机械在事件期间振动高达 50g。使用 ±50g 或 ±100g 量程 IMU。
    `,
  },
  {
    slug: 'adi-precision-signal-chain-medical',
    title: 'Designing a Medical Signal Chain: From Photodiode to ADC for SpO2 and ECG',
    titleZh: '医疗信号链设计：从光电二极管到 ADC 的 SpO2 和 ECG 设计指南',
    excerpt: 'Medical device signal chains demand sub-μV noise floors, strict power budgets, and IEC 60601 compliance. This guide walks through the critical design decisions for precision photoplethysmography (PPG) and electrocardiography (ECG) front-ends using ADI components.',
    excerptZh: '医疗设备信号链要求低于 μV 的噪声底、严格的功耗预算和 IEC 60601 合规。本指南深入探讨使用 ADI 元件进行精密光电容积脉搏波（PPG）和心电图（ECG）前置放大的关键设计决策。',
    category: 'Medical Electronics',
    categoryZh: '医疗电子',
    date: '2026-01-15',
    readTime: '13 min read',
    content: `
## Medical Signal Chain Requirements

Designing a medical-grade analog front-end (AFE) is fundamentally different from industrial or consumer signal chain design. The three non-negotiable requirements:

1. **Noise**: SpO2 systems must resolve photodiode currents of 10nA to 1μA in the presence of 1μA to 100μA ambient light interference
2. **Power**: Portable medical devices must run from coin-cell or rechargeable Li-ion with weeks of battery life
3. **Compliance**: IEC 60601-1-2 EMC compliance requires careful PCB layout and filtering

## SpO2 AFE Design with ADI OPAx392 + AD7175

### Photodiode Current Amplification

A transimpedance amplifier (TIA) converts photodiode current to voltage. The OPA392 (single, dual, or quad) is ideal:
- 10pA input bias current (negligible compared to 10nA photodiode current)
- 4.5MHz GBP at 3.3V — supports >100kHz LED drive frequencies for ambient light rejection
- Single 3.3V supply operation

Critical design: use a 2-stage TIA — first stage at 10MΩ gain, second stage as driver — to manage bandwidth while keeping noise low.

### ADC Requirements

The AD7175 24-bit Σ-Δ ADC is the standard choice for medical AFE:
- 19.2 kSPS maximum sample rate — filter to 100Hz for SpO2, 500Hz for ECG
- 85nV RMS noise (20kHz BW) — achieves 22-bit effective resolution
- Integrated PGA with gains from 1× to 64×
    `,
    contentZh: `
## 医疗信号链要求

设计医疗级模拟前端（AFE）与工业或消费级信号链设计有着根本不同。三个不可妥协的要求：

1. **噪声**：SpO2 系统必须在存在 1μA 至 100μA 环境光干扰的情况下解析 10nA 至 1μA 的光电二极管电流
2. **功耗**：便携式医疗设备必须使用纽扣电池或可充电锂电池运行数周
3. **合规**：IEC 60601-1-2 EMC 合规需要仔细的 PCB 布局和滤波

## ADI OPAx392 + AD7175 设计

### 光电二极管电流放大

跨阻放大器（TIA）将光电二极管电流转换为电压。OPA392 是理想选择：10pA 输入偏置电流，4.5MHz GBP，支持 >100kHz LED 驱动频率以抑制环境光。

AD7175 24 位 Σ-Δ ADC 是医疗 AFE 的标准选择：85nV RMS 噪声，集成 PGA，增益 1× 至 64×。
    `,
  },
  {
    slug: 'onsemi-sic-design-guide',
    title: 'ONSEMI SiC MOSFET Application Guide: From Gate Drive Design to Thermal Management',
    titleZh: 'ONSEMI SiC MOSFET 应用指南：栅极驱动设计到热管理',
    excerpt: 'SiC MOSFETs enable dramatic efficiency improvements in EV inverters, EV chargers, and industrial motor drives — but only when designed correctly. This guide covers the practical pitfalls of SiC gate drive, PCB layout, and thermal design with ONSEMI Gen 2 SiC MOSFETs.',
    excerptZh: 'SiC MOSFET 在电动汽车逆变器、充电桩和工业电机驱动器中实现了显著的效率提升——但前提是设计正确。本指南涵盖 ONSEMI Gen 2 SiC MOSFET 的实际设计陷阱、栅极驱动、PCB 布局和热管理。',
    category: 'Power Electronics',
    categoryZh: '电力电子',
    date: '2025-12-20',
    readTime: '15 min read',
    content: `
## Why SiC MOSFETs Beat IGBTs in High-Voltage Applications

At 800V and above, SiC MOSFETs offer three compelling advantages over IGBTs:
1. **Lower switching losses**: SiC recovers in <50ns vs IGBT td(off) of 200–400ns
2. **Reduced cooling requirements**: 50–70% lower switching loss → dramatically smaller heatsinks
3. **Higher frequency operation**: Enables 50–100kHz switching vs 8–20kHz for IGBTs → smaller magnetics

## ONSEMI Gen 2 SiC MOSFET Overview

ONSEMI second-generation (Gen 2) SiC MOSFETs (1200V and 650V) improve on Gen 1 with:
- 25% lower Rds(on) for same die size → smaller conduction loss
- Improved Vth stability (ΔVth <0.5V over 1000h at 175°C)
- Kelvin source pin on all surface-mount packages → cleaner switching at high dI/dt

## Gate Drive Design

The #1 cause of SiC MOSFET failures is gate drive errors. Critical requirements:
- Gate charge (Qg) is ~3× lower than equivalent IGBT → use >4A peak gate current
- Vgs(on): +18V to +20V — do NOT use +15V (increased Rds(on))
- Vgs(off): -3V to -5V — negative off-voltage prevents spurious turn-on during fast dV/dt
- Gate resistor (Rg): 2.2Ω to 10Ω — start at 4.7Ω and adjust for dI/dt

## PCB Layout: The 4 Rules

1. Minimize power loop area (the loop formed by DC link → MOSFET → source → DC link return)
2. Place gate resistor within 5mm of gate pin — not at the driver
3. Use Kelvin source connection to separate power and signal grounds
4. Separate high-current power ground from sensitive signal ground at a single point
    `,
    contentZh: `
## 为什么 SiC MOSFET 在高压应用中优于 IGBT

在 800V 及以上，SiC MOSFET 相比 IGBT 有三个显著优势：
1. 更低的开关损耗：SiC 在 <50ns 内恢复，而 IGBT td(off) 为 200–400ns
2. 降低散热要求：开关损耗降低 50–70% → 大幅减小散热器体积
3. 更高频率运行：支持 50–100kHz 开关，而 IGBT 为 8–20kHz → 更小的磁性元件

## ONSEMI Gen 2 SiC MOSFET 栅极驱动设计

SiC MOSFET 故障的第一大原因是栅极驱动错误。关键要求：
- Vgs(on): +18V 至 +20V（不要使用 +15V）
- Vgs(off): -3V 至 -5V（负关断电压防止快速 dV/dt 下的误导通）
- 栅极电阻 (Rg)：2.2Ω 至 10Ω

## PCB 布局四条规则

1. 最小化功率回路面积
2. 栅极电阻放置在栅极引脚 5mm 以内
3. 使用 Kelvin 源极连接分离功率地和信号地
4. 在单点将高电流功率地与敏感信号地分离
    `,
  },
  {
    slug: 'nxp-i-mx-rt-smart-home-matter',
    title: 'NXP i.MX RT for Matter Smart Home: How to Build a Certified Edge Hub',
    titleZh: 'NXP i.MX RT 用于 Matter 智能家居：如何构建通过认证的边缘中枢',
    excerpt: "Matter, the new smart home standard backed by Apple, Google, and Amazon, requires careful hardware design to pass certification and achieve reliable multi-protocol operation. This guide covers i.MX RT MCU selection, radio coexistence, and security architecture for a production Matter edge hub.",
    excerptZh: 'Matter 是苹果、谷歌和亚马逊支持的新智能家居标准，需要精心设计硬件以通过认证并实现可靠的多协议运行。本指南涵盖 i.MX RT MCU 选型、射频共存和安全架构，以构建生产级 Matter 边缘中枢。',
    category: 'Smart Home',
    categoryZh: '智能家居',
    date: '2025-12-05',
    readTime: '12 min read',
    content: `
## Matter Overview

Matter (formerly Project CHIP) unifies smart home device categories under a single IP-based protocol. Supported categories: lights, locks, thermostats, sensors, cameras, Thread, Zigbee, and Matter itself.

A Matter edge hub must simultaneously:
- Act as a Matter controller (processes device commands from the cloud)
- Act as a Matter commissioner (onboards new devices)
- Bridge to legacy protocols (Zigbee 3.0, BLE Mesh, Thread)

## NXP i.MX RT Selection

For a production Matter hub, the i.MX RT 500 or RT 600 series is the right choice:
- **i.MX RT595**: Dual-core (Cortex-M33 + DSP), 300MHz, integrated 2.4GHz and 5GHz WiFi 6 + BT 5.3
- **i.MX RT685**: Single-core 300MHz, more cost-optimized, requires external WiFi chip

The Cortex-M33 core provides hardware TrustZone for Matter security domains and hardware cryptographic acceleration for Matter's SPAKE2+ protocol.

## Multi-Protocol Radio Coexistence

Running WiFi + BLE + Thread Zigbee simultaneously in a compact enclosure requires careful RF design:
- Use different WiFi channels than neighboring APs
- Implement packet traffic arbitration (PTA) with external co-processor
- Shield the Zigbee/Thread antenna from WiFi TX harmonics

## Security Architecture

Matter requires a 726-bit immutable device identity (DAC — Device Attestation Certificate). Use NXP EdgeLock SE050 secure element for:
- Secure key storage (never in flash)
- ECDP256 signature generation for Matter commissioning
- Attestation certificate provisioning during manufacturing
    `,
    contentZh: `
## Matter 概述

Matter 统一了智能家居设备类别，使用单一基于 IP 的协议。支持类别：灯具、锁具、恒温器、传感器、摄像头、Thread、Zigbee 和 Matter 本身。

Matter 边缘中枢必须同时：
- 充当 Matter 控制器
- 充当 Matter 授权者
- 桥接至传统协议（Zigbee 3.0、BLE Mesh、Thread）

## NXP i.MX RT 选型

对于生产级 Matter 中枢，i.MX RT 500 或 600 系列是正确的选择：
- Cortex-M33 提供硬件 TrustZone 用于 Matter 安全域
- 硬件加密加速用于 Matter 的 SPAKE2+ 协议

## 多协议射频共存

同时运行 WiFi + BLE + Thread/Zigbee 需要仔细的射频设计：
- 使用与相邻 AP 不同的 WiFi 信道
- 使用 PTA（数据包流量仲裁）
- 屏蔽 Zigbee/Thread 天线免受 WiFi TX 谐波干扰
    `,
  },
]
