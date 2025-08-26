import React, { useState, useMemo } from "react";

/* ===== 轻量 UI 组件 ===== */
const Button = ({ variant, className = "", children, ...props }) => (
  <button
    className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-2xl transition border ${
      variant === "outline"
        ? "bg-white border-gray-200 text-gray-900 hover:bg-gray-50"
        : "bg-gray-900 border-gray-900 text-white hover:opacity-90"
    } ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Card = ({ className = "", children }) => (
  <div className={`rounded-2xl border border-gray-100 bg-white ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);
const CardContent = ({ className = "", children }) => (
  <div className={`p-4 pt-0 ${className}`}>{children}</div>
);
const CardTitle = ({ className = "", children }) => (
  <h3 className={`font-semibold ${className}`}>{children}</h3>
);

/* ===== 图标 ===== */
const Icon = ({ name, className = "h-5 w-5" }) => {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "ship":
      return (
        <svg {...common}>
          <path d="M3 18l3 2h12l3-2v-5H3v5z" />
          <path d="M3 13l9-4 9 4" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common}>
          <rect x="1" y="3" width="15" height="11" />
          <path d="M16 8h4l3 4v2h-7z" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M8 12l-2 8 6-3 6 3-2-8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};

/* ===== 多语言文本 ===== */
const i18n = {
  zh: {
    nav: { about: "关于我们", services: "服务", advantages: "优势", contact: "联系" },
    brand: {
      nameZh: "武汉世纪高捷国际货运代理有限公司",
      nameEn: "shijigaojie",
      tagline: "一站式国际物流与供应链服务",
      sub: "海运 · 陆运 · 报关 · 供应链方案",
    },
    hero: { primary: "立即咨询", pdf: "下载公司介绍(PDF)" },
    about: {
      title: "关于我们",
      intro:
        "我们专注国际货运代理与综合物流服务，依托阳逻港口区位优势，为制造、跨境电商、化工、汽配等行业提供安全、可视、可控的端到端解决方案。",
      bullets: [
        "国际货运代理（海运/铁海联运）",
        "进出口报关报检与合规咨询",
        "国内公路普货运输与城配",
        "项目物流与一体化供应链方案",
      ],
    },
    services: {
      title: "核心服务",
      items: [
        {
          icon: "ship",
          title: "海运服务",
          desc: "整箱 FCL / 拼箱 LCL、特种柜与散杂货，覆盖主要航线港口。",
        },
        {
          icon: "truck",
          title: "拖车与陆运",
          desc: "口岸拖车、短倒、同城与干线运输，整车/零担，时效稳定。",
        },
      ],
    },
    advantages: {
      title: "为什么选择我们",
      items: [
        {
          icon: "shield",
          title: "合规与风控",
          desc: "严格遵循海关与商检规范，完善风控流程与保险配置，保障货权安全。",
        },
        {
          icon: "award",
          title: "性价比与时效",
          desc: "航线资源与运力稳定，兼顾成本与交货时效，为客户创造确定性。",
        },
        {
          icon: "check",
          title: "可视化与协同",
          desc: "里程碑节点透明化，异常预警与对账自动化，提升跨团队协同效率。",
        },
      ],
    },
    gm: {
      title: "管理团队",
      name: "总经理 唐继祥",
      bio: "唐继祥先生在国际物流与供应链行业拥有二十年以上从业与管理经验，熟悉海运整箱与拼箱业务、散杂货项目物流、报关合规与国际贸易条款，主导过制造业与跨境电商客户的端到端方案设计与落地。擅长基于时效与成本目标统筹运力与舱位，构建里程碑可视化与异常预警机制，确保大宗与高价值货物的安全与交付确定性。",
    },
    contact: {
      title: "联系我们",
      tip: "请在下方填写贵司信息与需求（可包含起运地/目的地、货类、体积重量、时效要求等），并留下电话或邮箱。提交后系统将发送给我们。",
      textarea: "公司与需求信息",
      contact: "联系方式（电话或邮箱）",
      submit: "提交",
      ok: "提交成功，我们会尽快联系您。",
      fail: "提交失败，请稍后重试或直接发送邮件。",
    },
    footer: {
      icp: "（示例）鄂ICP备XXXXXX号",
      legal: "© 2016-2025 武汉世纪高捷国际货运代理有限公司 保留所有权利",
    },
    langSwitch: "EN",
  },

  en: {
    nav: { about: "About", services: "Services", advantages: "Advantages", contact: "Contact" },
    brand: {
      nameZh: "Wuhan Century Gaojie International Freight Forwarding Co., Ltd.",
      nameEn: "Wuhan Century Gaojie International Freight Forwarding Co., Ltd.",
      tagline: "One-stop International Logistics and Supply Chain",
      sub: "Ocean Freight · Trucking · Customs · Supply Chain",
    },
    hero: { primary: "Get Quote", pdf: "Download Company Profile (PDF)" },
    about: {
      title: "About Us",
      intro:
        "We provide end-to-end international forwarding and logistics leveraging Yangluo Port advantages for manufacturing, cross-border e-commerce, chemicals and auto parts.",
      bullets: [
        "International forwarding (ocean & rail-sea)",
        "Customs brokerage and compliance",
        "Domestic trucking and city distribution",
        "Project logistics and integrated supply chain solutions",
      ],
    },
    services: {
      title: "Core Services",
      items: [
        {
          icon: "ship",
          title: "Ocean Freight",
          desc: "FCL/LCL, special containers and breakbulk across major trade lanes.",
        },
        {
          icon: "truck",
          title: "Trucking & Drayage",
          desc: "Port drayage, local shuttles and line-haul, FTL/LTL with reliable SLA.",
        },
      ],
    },
    advantages: {
      title: "Why Us",
      items: [
        {
          icon: "shield",
          title: "Compliance & Risk Control",
          desc: "Customs-compliant operations with robust risk control and insurance.",
        },
        {
          icon: "award",
          title: "Cost & Lead Time",
          desc: "Stable capacity and schedules balancing cost and delivery time.",
        },
        {
          icon: "check",
          title: "Visibility & Collaboration",
          desc: "Milestone tracking, exception alerts and automated reconciliation.",
        },
      ],
    },
    gm: {
      title: "Leadership",
      name: "General Manager Jixiang Tang",
      bio: "Mr. Tang has 20+ years in international logistics and supply chain, covering FCL/LCL, breakbulk projects, customs compliance and Incoterms. He has delivered end-to-end solutions for manufacturers and cross-border sellers, orchestrating capacity and schedules to meet cost and lead-time targets with milestone visibility and exception management.",
    },
    contact: {
      title: "Contact Us",
      tip: "Describe your company and needs (origin/destination, cargo, volume/weight, lead time, etc.) and leave your phone or email. The request will be sent to us.",
      textarea: "Company and requirements",
      contact: "Contact (phone or email)",
      submit: "Submit",
      ok: "Submitted. We'll get back soon.",
      fail: "Submit failed. Please try again later.",
    },
    footer: {
      icp: "ICP placeholder",
      legal:
        "© 2016-2025 Wuhan Century Gaojie International Freight Forwarding Co., Ltd.",
    },
    langSwitch: "中文",
  },
};

/* ===== 表单端点 + PDF ===== */
const FORM_ENDPOINT = "https://formspree.io/f/xyzdywge";
const exportProfilePDF = () => window.print();

export default function App() {
  const [lang, setLang] = useState("zh");
  const t = useMemo(() => i18n[lang], [lang]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [body, setBody] = useState("");
  const [contact, setContact] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [hp, setHp] = useState("");
  const [notice, setNotice] = useState({ open: false, ok: true, msg: "" });

  async function onSubmit(e) {
    e.preventDefault();
    if (hp) return;
    const payload = { message: body, contact, lang, _gotcha: hp };
    try {
      setSubmitting(true);
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Form submit failed");
      setNotice({ open: true, ok: true, msg: t.contact.ok });
      setBody("");
      setContact("");
    } catch (err) {
      console.error(err);
      setNotice({ open: true, ok: false, msg: t.contact.fail });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-gray-100 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-semibold">
              GJ
            </div>
            <div>
              <div className="font-bold leading-tight">{t.brand.nameZh}</div>
              <div className="text-xs text-gray-500">{t.brand.nameEn}</div>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            <button onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>{t.nav.about}</button>
            <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>{t.nav.services}</button>
            <button onClick={() => document.getElementById("advantages")?.scrollIntoView({ behavior: "smooth" })}>{t.nav.advantages}</button>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{t.nav.contact}</button>
            <Button onClick={exportProfilePDF} variant="outline">{t.hero.pdf}</Button>
            <Button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>{t.hero.primary}</Button>
            <button className="ml-2 text-xs border rounded-xl px-2 py-1" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>{t.langSwitch}</button>
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-sm">
              {["about","services","advantages","contact"].map((id,i)=>(
                <button key={i} onClick={()=>{setMenuOpen(false);document.getElementById(id)?.scrollIntoView({behavior:"smooth"});}}>
                  {t.nav[id]}
                </button>
              ))}
              <div className="flex gap-2">
                <Button className="rounded-2xl flex-1" variant="outline" onClick={exportProfilePDF}>{t.hero.pdf}</Button>
                <Button className="rounded-2xl flex-1" onClick={()=>{setMenuOpen(false);document.getElementById("contact")?.scrollIntoView({behavior:"smooth"});}}>{t.hero.primary}</Button>
              </div>
              <button className="text-xs border rounded-xl px-2 py-1 w-min" onClick={()=>setLang(lang==="zh"?"en":"zh")}>{t.langSwitch}</button>
            </div>
          </div>
        )}
      </header>

{/* ===== Hero（修复 PDF 缺图） ===== */}
<section className="relative overflow-hidden">
  {/* 背景渐变，确保在最底层 */}
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-white to-white" />

  <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
    {/* 左侧文字 */}
    <div className="relative z-10 min-h-[220px]">
      <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-gray-900">
        {t?.brand?.tagline ?? (lang === "zh" ? "一站式国际物流与供应链服务" : "One-stop International Logistics and Supply Chain")}
      </h1>
      <p className="mt-4 text-gray-600 md:text-lg">
        {t?.brand?.sub ?? (lang === "zh" ? "海运 · 陆运 · 报关 · 供应链方案" : "Ocean Freight · Trucking · Customs · Supply Chain")}
      </p>

      <div className="mt-6 flex items-center gap-3">
        <Button
          className="rounded-2xl px-6"
          onClick={() =>
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          {t.hero.primary}
        </Button>
        <Button variant="outline" className="rounded-2xl px-6" onClick={exportProfilePDF}>
          {t.hero.pdf ?? (lang === "zh" ? "下载公司介绍(PDF)" : "Download Company Profile (PDF)")}
        </Button>
      </div>
    </div>

    {/* 右侧图片 (img 标签保证 PDF 正常显示) */}
    <div className="relative">
      <div className="aspect-[5/4] rounded-3xl bg-gradient-to-br from-gray-900 to-gray-700" />
      <div className="absolute inset-4 rounded-3xl border-4 border-white shadow-2xl overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1544989164-31dc3c645987?q=80&w=1400&auto=format&fit=crop"
          alt="Logistics background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>


      {/* 关于我们 + 服务 */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t.about.title}</h2>
            <p className="mt-4 text-gray-600">{t.about.intro}</p>
            <ul className="mt-6 space-y-2">
              {t.about.bullets.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <Icon name="check" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid sm:grid-cols-2 gap-4" id="services">
            {t.services.items.map((s, i) => (
              <Card key={i} className="rounded-2xl shadow-sm hover:shadow-md transition">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Icon name={s.icon} />
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-gray-600">
                  <p>{s.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 管理团队 */}
      <section id="gm" className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold">{t.gm.title}</h2>
        <Card className="mt-6">
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle>{t.gm.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700">{t.gm.bio}</CardContent>
        </Card>
      </section>

      {/* 优势 */}
      <section id="advantages" className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold">{t.advantages.title}</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          {t.advantages.items.map((a, i) => (
            <Card key={i} className="rounded-2xl shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name={a.icon} />
                  <CardTitle className="text-base">{a.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <p>{a.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 联系我们 */}
      <section id="contact" className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{t.contact.title}</h2>
            <p className="mt-4 text-gray-300">{t.contact.tip}</p>
          </div>
          <Card className="bg-white text-gray-900 rounded-2xl shadow-xl">
            <CardHeader>
              <CardTitle>{t.contact.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={onSubmit}>
                {/* honeypot 反机器人 */}
                <input
                  type="text"
                  name="_gotcha"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <textarea
                  placeholder={t.contact.textarea}
                  rows={6}
                  className="border rounded-xl px-3 py-2 focus:outline-none focus:ring w-full"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  required
                />
                <input
                  placeholder={t.contact.contact}
                  className="border rounded-xl px-3 py-2 focus:outline-none focus:ring w-full"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <Button className="rounded-2xl w-full" type="submit" disabled={submitting}>
                  {submitting ? "..." : t.contact.submit}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-600 flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-2xl bg-gray-900 text-white flex items-center justify-center font-semibold">
              GJ
            </div>
            <span>{t.footer.legal}</span>
          </div>
          <div className="text-xs">{t.footer.icp}</div>
        </div>
      </footer>

      {/* 打印导出仅保留 About + GM */}
      <style>{`
        @media print {
          header, #advantages, #contact, footer { display: none; }
          #about, #gm { break-inside: avoid; }
          body { background: white; }
        }
      `}</style>

      {/* Toast */}
      {notice.open && (
        <div
          role="alert"
          className={`fixed bottom-6 right-6 z-50 max-w-sm rounded-2xl shadow-lg px-4 py-3 ${
            notice.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="text-sm">{notice.msg}</div>
            <button
              onClick={() => setNotice({ open: false, ok: true, msg: "" })}
              className="ml-2 text-white/90"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



