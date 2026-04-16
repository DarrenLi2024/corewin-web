# Corewin Web 升级开发计划

## ✅ 已完成
- [x] 项目结构分析
- [x] i18n 国际化系统（中英文切换，完整的翻译词库）
- [x] SEO 优化（meta/sitemap/robots.txt/JSON-LD 结构化数据）
- [x] 产品搜索与筛选功能（ProductSearch 组件）
- [x] Blog/News 模块（4 篇示例文章）
- [x] PWA 支持（manifest.json + service worker）
- [x] 询价表单后端对接（/api/contact API 路由）
- [x] 全站 path alias 配置（@/ → 项目根目录）
- [x] 国际化 Navbar（语言切换按钮）
- [x] 案例研究页面（4 个真实场景案例）
- [x] 产品详情页（SiC 产品页 + 规格表）
- [x] **品牌架构重组**（10 大品牌重塑为 5 大产品类别）
- [x] **应用领域重构**（8 大应用领域全面更新）
- [x] **产品数据重建**（26 个产品覆盖 10 品牌 × 5 类别）
- [x] **案例研究重建**（5 个新案例对应新品牌与应用场景）
- [x] **翻译词库扩展**（新增 5 类别 + 8 领域的中英文词条）
- [x] **ProductShowcase 重构**（按品牌分组 + 类别筛选 + 颜色编码）
- [x] **ApplicationSection 重构**（8 领域网格 + 品牌标签 + 详细描述）
- [x] **Footer 更新**（品牌墙更新 + 5 大类别链接）

## 🚧 进行中
- [ ] 在线客服入口
- [ ] 邮件/CRM 真实集成（当前 API 路由为 placeholder）

## 📋 待办
- [ ] 深色/浅色主题切换
- [ ] 动态品牌墙 CMS
- [ ] 更多产品详情页（GaN, MCU 等分类）
- [ ] 博客文章详情页

---

## 已新增文件

### lib/i18n/
- `translations.ts` — 中英文翻译词库（扩展版：含 5 类别 + 8 领域）
- `I18nProvider.tsx` — i18n Context Provider
- `index.ts` — 统一导出

### data/
- `products.ts` — 产品数据（10 品牌 × 5 类别 × 26 个产品线）
- `case-studies.ts` — 案例研究数据（5 个新案例）

### content/blog/
- `index.ts` — 博客文章数据（4 篇）

### components/
- `ProductSearch.tsx` — 产品搜索 + 品牌筛选
- `ProductShowcase.tsx` — Client Component 包装器

### app/
- `blog/page.tsx` — 博客列表页
- `blog/layout.tsx` — 博客布局 + metadata
- `case-studies/page.tsx` — 案例研究列表页
- `case-studies/layout.tsx` — 案例研究布局 + metadata
- `products/[slug]/page.tsx` — 产品详情页（动态路由）
- `products/[slug]/layout.tsx` — 产品详情布局
- `api/contact/route.ts` — 联系表单 API
- `sitemap.ts` — SEO sitemap
- `robots.ts` — robots.txt

### public/
- `manifest.json` — PWA manifest
- `sw.js` — Service Worker

### 更新的文件
- `app/layout.tsx` — I18nProvider + PWA meta + JSON-LD + SW 注册
- `app/page.tsx` — 集成 ProductShowcase
- `app/sitemap.ts` — 包含 /case-studies
- `components/Navbar.tsx` — 语言切换按钮 + Blog 链接
- `components/ContactSection.tsx` — 对接真实 API
- `components/ProductLines.tsx` — 从 data/products.ts 导入
