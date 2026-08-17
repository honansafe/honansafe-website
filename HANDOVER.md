# 交付文档 — HonanSafe 外贸独立站

**项目**:HongAn Fire Equipment Co., Ltd.(鸿安消防设备有限公司)英文 B2B 独立站
**域名**:honansafe.com
**版本**:v1.0.0(初始版)
**交付方**:郑在出海 | Warren | 微信:HK-1912

---

## 1. 站点结构

| 文件 | 说明 |
|---|---|
| `index.html` | 首页:Hero(源头工厂/OEM-ODM/工程配套)、6 产品线、Why Us、工程案例(占位)、证书(占位)、CTA |
| `products.html` | 产品总览 + 定制能力 |
| `products/fire-extinguishers.html` | 灭火器及灭火器箱 |
| `products/hose-nozzles.html` | 消防水带/水枪/接口 |
| `products/hydrant-systems.html` | 消火栓系统 |
| `products/sprinkler-systems.html` | 喷淋/自动水系统 |
| `products/fire-alarm.html` | 火灾报警系统 |
| `products/other.html` | 气体灭火/PPE |
| `about.html` | 关于我们(工厂实力为占位) |
| `contact.html` | 询盘表单 + 联系信息 |
| `faq.html` | 常见问题(MOQ/认证/定制/交期/付款) |
| `privacy.html` | 隐私政策(noindex) |
| `assets/styles.css` | 设计系统(深蓝 #0B2545 + 深灰 + 红色 #E63946,B2B 工业简约风,全响应式) |
| `assets/script.js` | 移动端导航、滚动动效、询盘表单(mailto 提交) |
| `robots.txt` / `sitemap.xml` / `llms.txt` | SEO/GEO 资产 |

## 2. 部署清单(Deployment Checklist)

1. 将全部文件原样上传至托管平台(推荐 Cloudflare Pages / GitHub Pages / 任意静态托管)。
2. 域名解析指向托管平台后,站点即可访问。
3. 站点为纯静态,无需服务器、数据库或环境变量。

## 3. DNS 清单(DNS Checklist)

域名 **honansafe.com** 需在注册商处配置(推荐将 DNS 托管到 Cloudflare):

- **Cloudflare Pages 方案**:在 Cloudflare 添加站点 honansafe.com → 按提示修改注册商 NS 指向 Cloudflare 提供的两个 NS → 在 Pages 项目绑定 honansafe.com 与 www.honansafe.com(自动创建 CNAME)。
- **根域名(apex)**:Cloudflare 自动处理 CNAME flattening,无需 A 记录。
- 若域名不在 Cloudflare 注册,先在注册商关闭 WHOIS 隐私保护或完成邮箱验证,以便 Cloudflare 接管。
- DNS 生效时间:NS 变更通常 5 分钟–24 小时。

## 4. SEO 清单(SEO Checklist)

已完成:
- 全站 title / meta description / canonical(https://honansafe.com/)
- JSON-LD:首页 Organization、产品总览 ItemList、6 产品页 Product、FAQ 页 FAQPage
- robots.txt + sitemap.xml(11 个可索引 URL,privacy 已排除)
- llms.txt(GEO/AI 搜索可见性)
- 语义化 HTML、单一 h1、alt 文本待图片补充后完善

上线后建议:
1. Google Search Console 提交 sitemap 并验证站点所有权。
2. Bing Webmaster Tools 同步提交。
3. 上传 Logo/产品图/工厂实景图后,补充每页 alt 文本与产品图片尺寸优化。
4. 补充真实工程案例与证书后,更新对应版块并保持 URL 不变。

## 5. 账号交接清单(Account Handover Checklist)

| 事项 | 说明 | 负责人 |
|---|---|---|
| 域名注册商账号 | honansafe.com 管理权限 | 客户 |
| Cloudflare 账号 | DNS 托管(推荐) | 客户/交付方 |
| 托管平台账号 | Cloudflare Pages 或 GitHub | 客户/交付方 |
| Google Search Console | 站点验证与收录监控 | 客户 |
| 业务邮箱 | zwanl@hongan119.com(主)/ haffthuang@hongan119.com(备) | 客户 |
| WhatsApp | +86 152 5942 8489(已在全站展示) | 客户 |

## 6. 变更日志(Change Log)

| 日期 | 版本 | 变更 |
|---|---|---|
| 2026-08-17 | v1.0.0 | 初始建站:12 页面、设计系统、SEO 资产、询盘表单、占位内容标注 |

## 7. 待用户补充的内容(Placeholders)

以下内容当前为占位符,提供后即可替换上线:

1. **Logo + 产品图 + 工厂实景图**(用户正在准备,可随时上传替换)。
2. **工程案例**:3 个市场(东南亚/中东/南美)的真实项目描述与照片。
3. **认证清单**:工厂实际持有的证书名称与编号(如 ISO 9001、CE、EN 3、UL/FM、SASO/GCC 等),只填真实信息。
4. **公司信息**:成立年份、工厂规模/月产能、里程碑时间线。
5. **业务参数**:各产品线 MOQ、付款方式(T/T、L/C 等)确认后更新 FAQ。
6. **多语言版本**:俄文/葡萄牙语/印地语版可后续分批制作。

---

**郑在出海 | Warren | 微信:HK-1912**
