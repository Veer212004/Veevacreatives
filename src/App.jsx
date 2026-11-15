import React, { useState, useEffect, useRef } from "react";
import "./index.css";

/* ===== CONFIG: edit here ===== */
const CONTACT = {
  phone: "+91 88807 17978",
  tel: "tel:+918880717978",
  email: "veevacreatives26@gmail.com",
  ig: "https://instagram.com/veeva_creatives?rpxt=bWpodGVsZTEzc2ky",
};
const ENQUIRY_ENDPOINT = "/api/enquiries";

const PORTFOLIO_PAGES = [
  "/assets/portfolio/pdf-page-1.jpg",
  "/assets/portfolio/pdf-page-2.jpg",
  "/assets/portfolio/pdf-page-3.jpg",
  "/assets/portfolio/pdf-page-4.jpg",
  "/assets/portfolio/pdf-page-5.jpg",
  "/assets/portfolio/pdf-page-6.jpg",
  "/assets/portfolio/pdf-page-7.jpg",
  "/assets/portfolio/pdf-page-8.jpg",
  "/assets/portfolio/pdf-page-9.jpg",
  "/assets/portfolio/pdf-page-10.jpg",
  "/assets/portfolio/pdf-page-11.jpg",
  "/assets/portfolio/pdf-page-12.jpg",
  "/assets/portfolio/pdf-page-13.jpg",
  "/assets/portfolio/pdf-page-14.jpg",
  "/assets/portfolio/pdf-page-15.jpg",
  "/assets/portfolio/pdf-page-16.jpg",
  "/assets/portfolio/pdf-page-17.jpg",
  "/assets/portfolio/pdf-page-18.jpg",
];

/* ===== PORTFOLIO DATA: one entry = one work. Similar posters go in the same `images` array. =====
   Add image files to /assets/portfolio and list their paths. Empty `images` shows a labelled placeholder. */
const I = (k) => k.map((x) => `/assets/portfolio/${x}.jpg`);
const BASE_WORKS = [
  {
    id: "veeva-logo",
    title: "VEEVA CREATIVES – Brand Logo",
    cat: "Logos & Branding",
    tags: ["Logo", "Brand Identity", "VEEVA CREATIVES", "Primary Logo"],
    desc: "Official VEEVA CREATIVES logo featuring a distinctive dual-leaf symbol with a pink gradient filled leaf and a white outlined leaf, paired with elegant white VEEVA typography and CREATIVES lettering on a black background.",
    objective:
      "Establish a premium, elegant and recognizable visual identity for VEEVA CREATIVES.",
    approach:
      "Minimalist luxury branding with a black background, vibrant pink gradient leaf, white outlined leaf symbol, sophisticated typography and generous letter spacing.",
    deliver: ["Primary Logo", "Brand Identity"],
    images: I(["veeva-logo"]),
  },
  {
    id: "launch",
    title: "Official Launch & Services Posters",
    cat: "Posters",
    tags: ["Poster", "Launch"],
    desc: "Launch announcement and services overview posters.",
    objective: "Announce the studio and clearly list what it offers.",
    approach: "Bold black-and-pink layouts with strong typography.",
    deliver: ["Launch poster", "Services poster"],
    images: I(["launch", "svc"]),
  },
  {
    id: "why",
    title: "Why Design Matters \u2014 Carousel Series",
    cat: "Social Media Creatives",
    tags: ["Carousel", "Social"],
    desc: "Educational Instagram carousel on the value of good design.",
    objective: "Show business owners why design drives trust and growth.",
    approach:
      "Consistent dark layout with pink highlights, one idea per slide.",
    deliver: ["Carousel slides"],
    images: I(["d1", "d2", "d3", "d4", "d6", "d7"]),
  },
  {
    id: "italy",
    title: "Italy in Bowl \u2014 Gourmet Pasta Sauce",
    cat: "Product Advertising",
    tags: ["Product", "Food"],
    desc: "Advertising creatives for a gourmet pasta sauce.",
    objective: "Present the product as premium and appetising.",
    approach: "Rich red tones, fresh ingredients and strong product focus.",
    deliver: ["Product ad creatives"],
    images: I([ "i2", "i3", "i4", "i5"]),
  },
  {
    id: "brands",
    title: "Nutella & Tropicana \u2014 Product Ads",
    cat: "Product Advertising",
    tags: ["Product", "Beverage"],
    desc: "Concept advertising creatives for well-known food and drink products.",
    objective: "Make the product the hero with energetic, appetising visuals.",
    approach: "Splash and motion effects with bold brand colours.",
    deliver: ["Product ad creatives"],
    images: I(["nut", "juice"]),
  },
  {
    id: "cafe",
    title: "Caf\u00e9 & Bakery Promotions",
    cat: "Posters",
    tags: ["Offer", "Social"],
    desc: "Promotional creatives for a coffee shop and organic cookies.",
    objective: "Drive footfall and interest with clear offers.",
    approach: "Warm colour palettes and simple, readable layouts.",
    deliver: ["Offer poster", "Product creative", "Instagram mockup"],
    images: I(["coffee", "cookies", "coffee2"]),
  },
  {
    id: "ganesh",
    title: "Ganesh Festival Creative",
    cat: "Festival & Promotional Designs",
    tags: ["Festival"],
    desc: "Festival-inspired creative for Ganesh Chaturthi.",
    objective: "Celebrate the festival while promoting creative work.",
    approach: "Playful illustration with a warm pink palette.",
    deliver: ["Festival creative"],
    images: I(["gan"]),
  },
  {
    id: "lara",
    title: "Conference Event Poster",
    cat: "Posters",
    tags: ["Event", "Poster"],
    desc: "Event poster with bold typography and a striking portrait.",
    objective: "Create a high-impact poster for a conference event.",
    approach: "Oversized type layered with a red-and-white portrait.",
    deliver: ["Event poster"],
    images: I(["lara"]),
  },
  {
    id: "brochure",
    title: "Brochure Designs",
    cat: "Print & Outdoor",
    tags: ["Brochure", "Print"],
    desc: "Trifold brochure layouts shown in mockups.",
    objective: "Present product information in a clean printed format.",
    approach: "Dark, structured layouts with a clear feature hierarchy.",
    deliver: ["Brochure mockups"],
    images: I(["br1", "br2"]),
  },
  {
    id: "hoard",
    title: "Outdoor Hoarding",
    cat: "Print & Outdoor",
    tags: ["Outdoor", "Billboard"],
    desc: "Billboard creative shown on a building.",
    objective: "Catch attention from a distance.",
    approach: "Large headline with simple imagery.",
    deliver: ["Hoarding design"],
    images: I(["hoard"]),
  },
];
const CATS = [
  "All Work",
  "Posters",
  "Social Media Creatives",
  "Product Advertising",
  "Logos & Branding",
  "Festival & Promotional Designs",
  "Print & Outdoor",
];
const SERVICES = [
  [
    "🎨",
    "Poster & Social Media Design",
    "Instagram posts, stories, promotional posters, campaign creatives, reel covers and digital ads.",
  ],
  [
    "💻",
    "Website Design & Development",
    "Business websites, landing pages, portfolios, restaurant sites, service sites and e-commerce.",
  ],
  [
    "✦",
    "Branding & Visual Identity",
    "Logo design, brand colours, typography systems, visual identity and guidelines.",
  ],
  [
    "📐",
    "UI/UX Design",
    "Website and app interfaces, wireframes, prototypes and user-focused experiences.",
  ],
  [
    "📄",
    "Creative Collaterals",
    "Brochures, flyers, menus, visiting cards, invitations and other print or digital materials.",
  ],
  [
    "⚙️",
    "Custom Digital Solutions",
    "Custom web apps, enquiry forms, dashboards, integrations and business-specific solutions.",
  ],
];
const DEMOS = [
  {
    id: "urban",
    name: "Urban Spice",
    cat: "Restaurant Website",
    desc: "Menu, featured dishes, table reservations, location.",
    ac: "#e8a33d",
    bg: "#1a0f0a",
    feats: ["Menu", "Reservations", "Visit"],
  },
  {
    id: "business",
    name: "Modern Business",
    cat: "Business Website",
    desc: "Services, process, about and an enquiry form.",
    ac: "#1d4ed8",
    bg: "#eff6ff",
    feats: ["Services", "Process", "Enquiry"],
  },
  {
    id: "p",
    name: "Portfolio Website",
    cat: "Portfolio",
    desc: "Projects, skills and a project enquiry section.",
    ac: "#8b5cf6",
    bg: "#faf9ff",
    feats: ["Projects", "Skills", "Enquiry"],
  },
  {
    id: "g",
    name: "Gym & Fitness",
    cat: "Fitness",
    desc: "Programs, trainers, class schedule, membership enquiry.",
    ac: "#c6ff00",
    bg: "#0b0b0c",
    feats: ["Programs", "Schedule", "Plans"],
  },
  {
    id: "s",
    name: "Salon & Beauty",
    cat: "Beauty",
    desc: "Services with pricing, gallery and appointment booking.",
    ac: "#d6336c",
    bg: "#fff1ee",
    feats: ["Pricing", "Gallery", "Booking"],
  },
  {
    id: "c",
    name: "Clothing Brand",
    cat: "Fashion",
    desc: "Campaign banner, category filters and a working cart.",
    ac: "#111",
    bg: "#f1ece4",
    feats: ["Shop", "Filters", "Cart"],
  },
];

/* ===== helpers ===== */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("v");
          // stagger delays must not linger and slow down hover effects
          setTimeout(() => (e.target.style.transitionDelay = ""), 1600);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".rv").forEach((n) => io.observe(n));
    return () => io.disconnect();
  });
}
const Leaf = () => (
  <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
    <path d="M16 3C8 8 6 17 16 29c10-12 8-21 0-26z" fill="#F2265B" />
    <path d="M16 3c-3 8-2 16 0 26" stroke="#fff" strokeWidth="2" fill="none" />
  </svg>
);
const Head = ({ e, t, s }) => (
  <div className="rv rv-l">
    <div className="eyebrow">{e}</div>
    <h2 className="h2">{t}</h2>
    <div className="line" />
    {s && (
      <p className="mu" style={{ maxWidth: 640, margin: 0 }}>
        {s}
      </p>
    )}
  </div>
);
const go = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

function Nav() {
  const [s, setS] = useState(false),
    [o, setO] = useState(false),
    [a, setA] = useState("home");
  useEffect(() => {
    const f = () => {
      setS(scrollY > 20);
      const ids = ["home", "work", "websites", "about", "contact"];
      let c = "home";
      ids.forEach((i) => {
        const el = document.getElementById(i);
        if (el && el.getBoundingClientRect().top < 160) c = i;
      });
      setA(c);
    };
    f();
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  const L = [
    ["home", "Home"],
    ["work", "Posters & Branding"],
    ["websites", "Website Designs"],
    ["about", "About"],
    ["contact", "Contact"],
  ];
  return (
    <nav className={s ? "s" : ""}>
      <div className="wrap">
        <button
          className="logo"
          onClick={() => go("home")}
          aria-label="Veeva Creatives home"
        >
          <img src="/assets/portfolio/veeva-logo.png" alt="" />
          <span>VEEVA CREATIVES</span>
        </button>
        <button
          className="burger"
          aria-expanded={o}
          aria-label="Menu"
          onClick={() => setO(!o)}
        >
          {o ? "✕" : "☰"}
        </button>
        <div className={"links" + (o ? " o" : "")}>
          {L.map(([i, t]) => (
            <a
              key={i}
              href={"#" + i}
              className={a === i ? "on" : ""}
              onClick={(e) => {
                e.preventDefault();
                setO(false);
                go(i);
              }}
            >
              {t}
            </a>
          ))}
          <a
            className="btn" data-magnet
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setO(false);
              go("contact");
            }}
          >
            Let's Talk
          </a>
        </div>
      </div>
    </nav>
  );
}


/* ===== FX: scroll progress, cursor glow, tilt / spotlight / magnetic / parallax ===== */
function FX() {
  const bar = useRef(null),
    glow = useRef(null),
    ring = useRef(null);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight;
      if (bar.current)
        bar.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`;
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    if (reduce || !fine)
      return () => {
        removeEventListener("scroll", onScroll);
        removeEventListener("resize", onScroll);
      };
    let tx = innerWidth / 2,
      ty = innerHeight / 2,
      x = tx,
      y = ty,
      rx = tx,
      ry = ty,
      raf = 0;
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      rx += (tx - rx) * 0.3;
      ry += (ty - ry) * 0.3;
      if (glow.current)
        glow.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current)
        ring.current.style.transform = `translate(${rx}px,${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    loop();
    const touched = new Set();
    const clear = (el) => {
      ["--rx", "--ry", "--gx", "--gy", "--mx", "--my", "--px", "--py", "--tx", "--ty", "--hx", "--hy"].forEach((n) =>
        el.style.removeProperty(n),
      );
    };
    const move = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      document.documentElement.classList.add("fx-on");
      const now = new Set();
      const hot = e.target.closest?.("a,button,[data-tilt],[data-spot],input,select,textarea,summary");
      ring.current?.classList.toggle("hot", !!hot);
      const tl = e.target.closest?.("[data-tilt]");
      if (tl) {
        const r = tl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5,
          py = (e.clientY - r.top) / r.height - 0.5;
        tl.style.setProperty("--rx", `${(-py * 12).toFixed(2)}deg`);
        tl.style.setProperty("--ry", `${(px * 14).toFixed(2)}deg`);
        tl.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
        tl.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
        now.add(tl);
      }
      const sp = e.target.closest?.("[data-spot]");
      if (sp) {
        const r = sp.getBoundingClientRect();
        const mx = e.clientX - r.left,
          my = e.clientY - r.top;
        sp.style.setProperty("--mx", `${mx}px`);
        sp.style.setProperty("--my", `${my}px`);
        sp.style.setProperty("--px", ((mx / r.width - 0.5) * 2).toFixed(3));
        sp.style.setProperty("--py", ((my / r.height - 0.5) * 2).toFixed(3));
        now.add(sp);
      }
      const mg = e.target.closest?.("[data-magnet]");
      if (mg) {
        const r = mg.getBoundingClientRect();
        mg.style.setProperty("--tx", `${((e.clientX - (r.left + r.width / 2)) * 0.25).toFixed(1)}px`);
        mg.style.setProperty("--ty", `${((e.clientY - (r.top + r.height / 2)) * 0.35).toFixed(1)}px`);
        now.add(mg);
      }
      const hr = e.target.closest?.(".hero");
      if (hr) {
        const r = hr.getBoundingClientRect();
        hr.style.setProperty("--hx", (((e.clientX - r.left) / r.width - 0.5) * 2).toFixed(3));
        hr.style.setProperty("--hy", (((e.clientY - r.top) / r.height - 0.5) * 2).toFixed(3));
        now.add(hr);
      }
      touched.forEach((el) => {
        if (!now.has(el)) clear(el);
      });
      touched.clear();
      now.forEach((el) => touched.add(el));
    };
    const leave = () => {
      document.documentElement.classList.remove("fx-on");
      touched.forEach(clear);
      touched.clear();
    };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("fx-on");
    };
  }, []);
  return (
    <>
      <div className="fx-bar" ref={bar} aria-hidden="true" />
      <div className="fx-glow" ref={glow} aria-hidden="true" />
      <div className="fx-ring" ref={ring} aria-hidden="true" />
    </>
  );
}

function SplitWords({ text, offset = 0 }) {
  return text.split(" ").map((w, k) => (
    <React.Fragment key={k}>
      <span className="w" aria-hidden="true">
        <span style={{ "--i": k + offset }}>{w}</span>
      </span>{" "}
    </React.Fragment>
  ));
}

function Count({ to, suffix = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now(),
          D = 1400;
        const step = (t) => {
          const k = Math.min(1, (t - t0) / D);
          setN(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Stats() {
  const artworks = BASE_WORKS.reduce((a, w) => a + w.images.length, 0);
  const items = [
    [BASE_WORKS.length, "Projects showcased"],
    [artworks, "Artworks designed"],
    [SERVICES.length, "Creative services"],
    [DEMOS.length, "Website concepts"],
  ];
  return (
    <section className="stats-band" aria-label="Studio at a glance">
      <div className="wrap stats-grid">
        {items.map(([n, l], k) => (
          <div className="stat rv" key={l} style={{ transitionDelay: `${k * 90}ms` }}>
            <b className="sg">
              <Count to={n} suffix="+" />
            </b>
            <span>{l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

const HERO_SLIDES = [
  { name: "launchp", label: "Social & print creatives", tag: "Posters · Print" },
  { name: "svc", label: "Creative studio services", tag: "Studio" },
  { name: "web", label: "Web design & development", tag: "Websites" },
];
const SLIDE_MS = 4200;

function HeroShowcase() {
  const [a, setA] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(
      () => setA((c) => (c + 1) % HERO_SLIDES.length),
      SLIDE_MS,
    );
    return () => clearTimeout(t);
  }, [a, paused]);
  const cur = HERO_SLIDES[a];
  const next = () => setA((c) => (c + 1) % HERO_SLIDES.length);
  return (
    <div
      className={"showcase" + (paused ? " paused" : "")}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="sc-glow" aria-hidden="true" />
      <span className="sc-chip sc-chip-a" aria-hidden="true">✦ Brand-ready</span>
      <span className="sc-chip sc-chip-b" aria-hidden="true">● Live concepts</span>
      <div className="sc-tilt" data-tilt>
        <div className="sc-tilt-in">
          <div className="sc-frame">
            <i className="sc-corner tl" />
            <i className="sc-corner tr" />
            <i className="sc-corner bl" />
            <i className="sc-corner br" />
            <div className="sc-inner">
              <div className="sc-bar">
                <span />
                <span />
                <span />
                <em>veevacreatives / {cur.tag.split(" ")[0].toLowerCase()}</em>
              </div>
              <div
                className="sc-stage"
                onClick={next}
                role="button"
                tabIndex={0}
                aria-label="Show next creative"
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), next())}
              >
                {HERO_SLIDES.map((s, k) => (
                  <img
                    key={s.name}
                    className={k === a ? "on" : ""}
                    src={`/assets/portfolio/${s.name}.jpg`}
                    alt={k === a ? s.label : ""}
                  />
                ))}
                <span className="sc-next" aria-hidden="true">Next →</span>
              </div>
              <div className="sc-caption">
                <div>
                  <small>{cur.tag}</small>
                  <b>{cur.label}</b>
                </div>
                <strong>
                  {String(a + 1).padStart(2, "0")}
                  <span> / {String(HERO_SLIDES.length).padStart(2, "0")}</span>
                </strong>
              </div>
            </div>
            <span className="sc-glare" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="sc-thumbs">
        {HERO_SLIDES.map((s, k) => (
          <button
            key={s.name}
            type="button"
            className={k === a ? "on" : ""}
            onClick={() => setA(k)}
            aria-label={"Show " + s.label}
            aria-pressed={k === a}
          >
            <img src={`/assets/portfolio/${s.name}.jpg`} alt="" />
            <span className="sc-prog">
              <i />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function Marquee() {
  const W = ["Posters", "Branding", "Websites", "Social Media", "UI/UX", "Print", "Product Ads", "Campaigns"];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[...W, ...W, ...W].map((w, i) => (
          <span key={i}>
            {w} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div
        className="orb"
        style={{ width: 420, height: 420, top: "5%", right: "-8%", "--d": 50 }}
      />
      <div
        className="orb"
        style={{
          width: 260,
          height: 260,
          bottom: "0",
          left: "-5%",
          opacity: 0.18,
          "--d": -34,
        }}
      />
      <div className="wrap hgrid">
        <div>
          <div className="eyebrow up">Veeva Creatives · Digital studio</div>
          <h1 style={{ marginTop: 14 }} aria-label="We turn ideas into digital experiences.">
            <SplitWords text="WE TURN IDEAS INTO" />
            <span className="pk">
              <SplitWords text="DIGITAL EXPERIENCES." offset={4} />
            </span>
          </h1>
          <p className="up" style={{ animationDelay: ".25s" }}>
            From eye-catching creative designs to modern, high-performing
            websites, we help brands express their identity and build their
            digital presence.
          </p>
          <div
            className="up"
            style={{
              animationDelay: ".4s",
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
            }}
          >
            <a
              className="btn" data-magnet
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                go("work");
              }}
            >
              Explore Our Work
            </a>
            <a
              className="btn g" data-magnet
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                go("contact");
              }}
            >
              Start a Project
            </a>
          </div>
        </div>
        <HeroShowcase />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          color: "var(--mu)",
          fontSize: 12,
        }}
      >
        ↓ scroll
      </div>
    </section>
  );
}

function WelcomeIntro({ onComplete }) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 5000);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  return (
    <div className="welcome-intro" role="dialog" aria-label="Welcome to Veeva Creatives">
      <div className="welcome-shutter welcome-shutter-left" aria-hidden="true" />
      <div className="welcome-shutter welcome-shutter-right" aria-hidden="true" />
      <div className="welcome-grid" aria-hidden="true" />
      <div className="welcome-noise" aria-hidden="true" />
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          className="welcome-particle"
          aria-hidden="true"
          key={index}
          style={{ "--particle": index, "--particle-x": `${8 + (index * 37) % 84}%`, "--particle-y": `${12 + (index * 61) % 76}%` }}
        />
      ))}
      <div className="welcome-content">
        <div className="welcome-mark-wrap">
          <span className="welcome-orbit welcome-orbit-one" aria-hidden="true" />
          <span className="welcome-orbit welcome-orbit-two" aria-hidden="true" />
          <span className="welcome-ring" aria-hidden="true" />
          <img className="welcome-logo" src="/assets/portfolio/veeva-logo.png" alt="Veeva Creatives logo" />
        </div>
        <div className="welcome-copy">
          <span>Welcome to</span>
          <strong>VEEVA CREATIVES</strong>
          <p>We create. You grow.</p>
          <div className="welcome-services">
            <span>Design</span><i /> <span>Brand</span><i /> <span>Digital</span>
          </div>
        </div>
      </div>
      <button className="welcome-skip" type="button" onClick={onComplete}>Skip intro</button>
      <span className="welcome-line" aria-hidden="true" />
    </div>
  );
}

function Services() {
  return (
    <section style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <Head
          e="What we do"
          t="CREATIVE THINKING. DIGITAL EXECUTION."
          s="We combine design and technology to help businesses communicate clearly, stand out visually, and grow online."
        />
        <div className="grid">
          {SERVICES.map(([i, t, d], n) => (
            <div
              className="card svc-card rv"
              data-spot
              key={t}
              style={{ transitionDelay: `${n * 80}ms` }}
            >
              <span className="svc-n">{String(n + 1).padStart(2, "0")}</span>
              <div className="ic">{i}</div>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="svc-arrow" aria-hidden="true">→</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40 }}>
          <a
            className="btn" data-magnet
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              go("contact");
            }}
          >
            Discuss Your Project
          </a>
        </div>
      </div>
    </section>
  );
}

function Art({ w, i = 0 }) {
  const im = w.images[i];
  return (
    <div className="art">
      {im ? (
        <img src={im} alt={w.title + " – design " + (i + 1)} loading="lazy" />
      ) : (
        <span>
          Add artwork to
          <br />
          <b>WORKS → {w.id}.images</b>
        </span>
      )}
    </div>
  );
}

function Modal({ w, onClose, onNav }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
  }, [w.id]);
  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
      if (w.images.length > 1 && e.key === "ArrowRight") {
        setI((current) => (current + 1) % w.images.length);
      }
      if (w.images.length > 1 && e.key === "ArrowLeft") {
        setI((current) => (current - 1 + w.images.length) % w.images.length);
      }
    };
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [onClose, w.id, w.images.length]);
  const moveImage = (direction) =>
    setI((current) => (current + direction + w.images.length) % w.images.length);
  return (
    <div className="mask" onClick={onClose}>
      <button className="x" aria-label="Close" onClick={onClose}>
        ✕
      </button>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={w.title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="project-viewer">
          <div className="project-viewer-image">
            <Art w={w} i={i} />
            {w.images.length > 1 && (
              <>
                <button
                  className="art-arrow art-arrow-prev"
                  onClick={() => moveImage(-1)}
                  aria-label="Previous artwork"
                >
                  ←
                </button>
                <button
                  className="art-arrow art-arrow-next"
                  onClick={() => moveImage(1)}
                  aria-label="Next artwork"
                >
                  →
                </button>
                <span className="art-counter" aria-live="polite">
                  {i + 1} / {w.images.length}
                </span>
              </>
            )}
          </div>
          {w.images.length > 1 && (
            <div className="thumbs">
              {w.images.map((m, k) => (
                <button
                  key={k}
                  className={k === i ? "on" : ""}
                  onClick={() => setI(k)}
                  aria-label={"Artwork " + (k + 1)}
                  aria-pressed={k === i}
                  title={"View artwork " + (k + 1)}
                >
                  <img src={m} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <div className="eyebrow">{w.cat}</div>
          <h2 className="sg" style={{ fontSize: 30, margin: "8px 0 14px" }}>
            {w.title}
          </h2>
          <h3 className="pk" style={{ fontSize: 14 }}>
            Creative objective
          </h3>
          <p className="mu" style={{ marginTop: 4 }}>
            {w.objective}
          </p>
          <h3 className="pk" style={{ fontSize: 14 }}>
            Design approach
          </h3>
          <p className="mu" style={{ marginTop: 4 }}>
            {w.approach}
          </p>
          <h3 className="pk" style={{ fontSize: 14 }}>
            Deliverables
          </h3>
          <p className="mu" style={{ marginTop: 4 }}>
            {w.deliver.join(" · ")}
            {w.images.length > 1 && ` · ${w.images.length} artworks`}
          </p>
          <div
            style={{
              display: "flex",
              gap: 10,
              margin: "18px 0",
              flexWrap: "wrap",
            }}
          >
            <button className="btn g" onClick={() => onNav(-1)}>
              ← Previous
            </button>
            <button className="btn g" onClick={() => onNav(1)}>
              Next →
            </button>
          </div>
          <a
            className="btn" data-magnet
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              setTimeout(() => go("contact"), 50);
            }}
          >
            Want a Design Like This? Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

function Reels() {
  const R = [
    ["Launch Announcement Reel", "l"],
    ["Italy in Bowl — Product Reel", "i"],
    ["Behind the Design — Process Reel", "p"],
    ["Veeva Logo Reveal", "v"],
  ];
  return (
    <div style={{ marginTop: 90 }}>
      <div className="eyebrow">Reels & Videos</div>
      <h2 className="h2" style={{ fontSize: "clamp(26px,4vw,42px)" }}>
        MOTION THAT TELLS THE STORY.
      </h2>
      <div className="line" />
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(auto-fill,minmax(210px,1fr))" }}
      >
        {R.map(([t, k]) => (
          <div className="card rv" key={k} style={{ padding: 14 }}>
            <video
              src={`/assets/video/${k}.mp4`}
              poster={`/assets/video/${k}.jpg`}
              controls
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                aspectRatio: "9/16",
                borderRadius: 12,
                background: "#000",
                objectFit: "contain",
              }}
            />
            <h3 className="sg" style={{ fontSize: 16, marginTop: 10 }}>
              {t}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function Work({ works = BASE_WORKS, adminUnlocked = false, onAdmin, onDeleteWork }) {
  const [f, setF] = useState("All Work"),
    [sel, setSel] = useState(null);
  const list = works.filter((w) => f === "All Work" || w.cat === f);
  const nav = (d) => {
    setSel((s) => {
      const k = list.findIndex((w) => w.id === s);
      return list[(k + d + list.length) % list.length].id;
    });
  };
  const cur = works.find((w) => w.id === sel);
  return (
    <section id="work">
      <div className="wrap">
        <Head
          e="Posters & Branding"
          t="DESIGNS THAT MAKE BRANDS STAND OUT."
          s="Explore our creative concepts, visual identities, and promotional designs."
        />
        {adminUnlocked && (
          <button className="section-admin-button" type="button" onClick={() => onAdmin("works")}>
            + Add new work
          </button>
        )}
        <div className="chips" role="tablist">
          {CATS.map((c) => (
            <button
              key={c}
              className={"chip" + (f === c ? " on" : "")}
              onClick={() => setF(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="work-grid">
          {list.map((w, index) => (
            <article className="work-card rv" data-spot key={w.id}>
              <button
                className="pbtn"
                onClick={() => setSel(w.id)}
                aria-label={"View project: " + w.title}
              >
                <div className="work-preview">
                  <span className="work-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Art w={w} />
                  {w.images.length > 1 && (
                    <span className="cnt">{w.images.length} designs</span>
                  )}
                  {w.images.length > 1 && (
                    <div className="work-thumbnails" aria-hidden="true">
                      {w.images.slice(0, 4).map((image, imageIndex) => (
                        <img key={image} src={image} alt="" />
                      ))}
                    </div>
                  )}
                  <div className="ov">
                    <span>View Project</span>
                    <b>Explore artwork →</b>
                  </div>
                </div>
                <div className="work-card-copy">
                  <div className="work-card-meta">
                    <span>{w.cat}</span>
                    <span>{w.images.length} {w.images.length === 1 ? "Artwork" : "Artworks"}</span>
                  </div>
                  <h3 className="sg">{w.title}</h3>
                  <p>{w.desc}</p>
                  <div className="work-tags">
                    {w.tags.slice(0, 3).map((t) => (
                      <span className="tag" key={t}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
              {adminUnlocked && (
                <button
                  className="work-admin-delete"
                  type="button"
                  onPointerDown={(event) => event.stopPropagation()}
                  onClick={(event) => {
                    event.stopPropagation();
                    if (window.confirm(`Delete "${w.title}"?`)) onDeleteWork(w.id);
                  }}
                >
                  Delete work
                </button>
              )}
            </article>
          ))}
        </div>
        {!list.length && <p className="mu">No work in this category yet.</p>}
        {f === "All Work" && <Reels />}
      </div>
      {cur && <Modal w={cur} onClose={() => setSel(null)} onNav={nav} />}
    </section>
  );
}

function PortfolioShowcase({ pages = PORTFOLIO_PAGES, adminUnlocked = false, onAdmin }) {
  const showcaseImages = pages;
  const openPortfolio = () => {
    window.location.assign("/?portfolio=1");
  };

  return (
    <section className="portfolio-book rv" id="portfolio">
      <div className="portfolio-book-grain" aria-hidden="true" />
      <div className="wrap portfolio-book-inner">
        <div className="portfolio-book-heading">
          <div>
            <span className="portfolio-kicker">Selected portfolio · 2024—2026</span>
            <h2>
              OUR IDEAS
              <span>IN THE WILD.</span>
            </h2>
          </div>
          <p>
            A visual scrapbook of identities, campaigns, launches and print
            stories made for brands that want to be remembered.
          </p>
        </div>
        {adminUnlocked && (
          <button className="section-admin-button" type="button" onClick={() => onAdmin("portfolio")}>
            + Upload portfolio pages
          </button>
        )}
        <div className="portfolio-experience">
          <div className="portfolio-desk" aria-hidden="true">
            {showcaseImages.slice(0, -1).map((image, index) => (
              <div
                className={`portfolio-project-card portfolio-project-card-${index + 1}`}
                key={`${image}-${index}`}
              >
                <img src={image} alt="" loading="lazy" />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
          <button
            className="portfolio-book-cover"
            type="button"
            onClick={openPortfolio}
            aria-label="Open the Veeva Creatives portfolio reader"
          >
            <span className="portfolio-cover-topline">Veeva Creatives · 2026</span>
            <div className="portfolio-cover-title">
              <span>PORT</span>
              <span className="portfolio-cover-title-bottom">
                <i aria-hidden="true">✦</i>FOLIO
              </span>
            </div>
            <div className="portfolio-cover-cookie" aria-hidden="true">
              <i /><i /><i /><i /><i /><i />
            </div>
            <div className="portfolio-cover-bee" aria-hidden="true">🐝</div>
            <span className="portfolio-cover-rule" />
            <span className="portfolio-cover-open">Explore the portfolio <b>↗</b></span>
          </button>
        </div>
      </div>
    </section>
  );
}

function PortfolioPage({ pages = PORTFOLIO_PAGES }) {
  const introSlides = pages;
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStart = useRef(null);

  useEffect(() => {
    document.body.classList.add("portfolio-page-open");
    document.title = "Portfolio | Veeva Creatives";
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") setActiveSlide((current) => (
        (current - 1 + introSlides.length) % introSlides.length
      ));
      if (event.key === "ArrowRight") setActiveSlide((current) => (
        (current + 1) % introSlides.length
      ));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("portfolio-page-open");
      document.title = "Veeva Creatives — We Create. You Grow.";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const exitPortfolio = () => {
    window.location.assign("/#portfolio");
  };
  const moveSlide = (direction) => {
    setActiveSlide((current) => (
      (current + direction + introSlides.length) % introSlides.length
    ));
  };
  return (
    <main className="portfolio-page">
      <header className="portfolio-page-header">
        <button type="button" onClick={exitPortfolio}>
          <span aria-hidden="true">←</span> Back to website
        </button>
        <div className="portfolio-page-brand">
          <span>VEEVA</span>
          <small>CREATIVES / PORTFOLIO 2026</small>
        </div>
        <a href="/portfolio%20(1).pdf" target="_blank" rel="noopener noreferrer">
          Open PDF ↗
        </a>
      </header>
      <section className="portfolio-story">
        <div className="portfolio-story-meta">
          <span>Introduction</span>
          <strong>{String(activeSlide + 1).padStart(2, "0")} / {String(introSlides.length).padStart(2, "0")}</strong>
        </div>
        <button type="button" className="portfolio-story-arrow portfolio-story-arrow-prev" onClick={() => moveSlide(-1)} aria-label="Previous portfolio page">
          ←
        </button>
        <div
          className="portfolio-story-frame"
          onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
          onTouchEnd={(event) => {
            if (touchStart.current === null) return;
            const distance = touchStart.current - event.changedTouches[0].clientX;
            if (Math.abs(distance) > 45) moveSlide(distance > 0 ? 1 : -1);
            touchStart.current = null;
          }}
        >
          <img key={introSlides[activeSlide]} src={introSlides[activeSlide]} alt={`Veeva portfolio page ${activeSlide + 1}`} />
        </div>
        <button type="button" className="portfolio-story-arrow portfolio-story-arrow-next" onClick={() => moveSlide(1)} aria-label="Next portfolio page">
          →
        </button>
        <div className="portfolio-story-controls">
          <div className="portfolio-page-navigator">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Go to previous portfolio page">←</button>
            <label>
              <span>Page {activeSlide + 1} of {introSlides.length}</span>
              <input type="range" min="1" max={introSlides.length} value={activeSlide + 1} onChange={(event) => setActiveSlide(Number(event.target.value) - 1)} aria-label="Choose portfolio page" />
            </label>
            <button type="button" onClick={() => moveSlide(1)} aria-label="Go to next portfolio page">→</button>
          </div>
          <div className="portfolio-story-thumbs" aria-label="Portfolio pages">
          {introSlides.map((slide, index) => (
            <button
              key={slide}
              type="button"
              className={index === activeSlide ? "active" : ""}
              onClick={() => setActiveSlide(index)}
              aria-label={`Show portfolio page ${index + 1}`}
            >
              <img src={slide} alt="" />
            </button>
          ))}
          </div>
          <a href="/portfolio%20(1).pdf" target="_blank" rel="noopener noreferrer">
            View complete portfolio <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  );
}

/* ===== DEMO SITES ===== */
const SITES = {
  urban: {
    name: "URBAN SPICE",
    ac: "#e8a33d",
    bg: "#1a0f0a",
    fg: "#f5e9dc",
    card: "#27170e",
    dark: 1,
    hero: [
      "Modern Indian, cooked with fire.",
      "Clay-oven classics and seasonal spice in a warm, candlelit room.",
      "Reserve a table",
      "See the menu",
    ],
    badge: ["Open daily", "12:00 – 23:00"],
    blocks: [
      {
        id: "Menu",
        t: "menu",
        d: [
          [
            "Paneer Tikka",
            "Starters",
            "₹320",
            "Charred cottage cheese, mint chutney",
          ],
          [
            "Chicken Seekh",
            "Starters",
            "₹380",
            "Minced chicken, green chilli, lemon",
          ],
          [
            "Butter Chicken",
            "Mains",
            "₹420",
            "Tomato-cream gravy, kasuri methi",
          ],
          ["Dal Makhani", "Mains", "₹290", "Overnight black lentils, butter"],
          ["Hyderabadi Biryani", "Mains", "₹450", "Saffron basmati, raita"],
          ["Gulab Jamun", "Desserts", "₹140", "Warm milk dumplings in syrup"],
          ["Masala Chai", "Drinks", "₹80", "House-spiced, slow brewed"],
        ],
      },
      {
        id: "Gallery",
        t: "tiles",
        d: ["Tandoor", "Biryani", "Chaat", "Dessert", "Chai", "Dining room"],
      },
      {
        id: "Hours",
        t: "table",
        d: [
          ["Mon – Fri", "12:00 – 23:00"],
          ["Sat – Sun", "11:00 – 00:00"],
          ["Address", "12 Sample Street, Your City"],
        ],
      },
    ],
    form: {
      id: "Reserve",
      title: "Reserve a table",
      extra: [
        ["Guests", ["1", "2", "3", "4", "5", "6+"]],
        ["Date", "date"],
        ["Time", "time"],
      ],
      btn: "Request booking",
    },
  },
  business: {
    name: "Modern Business",
    ac: "#1d4ed8",
    bg: "#f4f7ff",
    fg: "#0f172a",
    card: "#fff",
    hero: [
      "Professional services, made simple.",
      "Strategy, operations and advisory for growing companies.",
      "Book a call",
      "Our services",
    ],
    badge: ["Free intro call", "30 minutes"],
    blocks: [
      {
        id: "Services",
        t: "cards",
        d: [
          ["Strategy", "Clear plans tied to your goals."],
          ["Operations", "Processes that scale with you."],
          ["Advisory", "Hands-on guidance, start to finish."],
        ],
      },
      {
        id: "Process",
        t: "steps",
        d: [
          ["Discover", "We listen first and map your goals."],
          ["Plan", "A clear scope, timeline and budget."],
          ["Deliver", "Hands-on execution with regular reviews."],
        ],
      },
      {
        id: "FAQ",
        t: "faq",
        d: [
          [
            "How do we start?",
            "Send an enquiry and we'll reply with next steps.",
          ],
          [
            "Do you work with small teams?",
            "Yes. Scope is tailored to your size.",
          ],
          ["How is pricing set?", "Per project, after a short scoping call."],
        ],
      },
    ],
    form: {
      id: "Contact",
      title: "Tell us about your business",
      extra: [["Company", ["Startup", "SME", "Enterprise"]]],
      btn: "Send enquiry",
    },
  },
  p: {
    name: "Aria Studio",
    ac: "#8b5cf6",
    bg: "#faf9ff",
    fg: "#1b1530",
    card: "#fff",
    hero: [
      "Design that moves people.",
      "Sample portfolio for an independent designer and developer.",
      "See projects",
    ],
    blocks: [
      {
        id: "Projects",
        t: "cards",
        d: [
          ["Brand Refresh", "Identity system for a cafe (sample)"],
          ["Event Posters", "Campaign series for a music night (sample)"],
          ["Booking App UI", "Mobile interface concept (sample)"],
          ["Landing Page", "Conversion-focused page (sample)"],
        ],
      },
      {
        id: "Skills",
        t: "chips",
        d: ["Branding", "UI/UX", "React", "Illustration", "Motion", "Print"],
      },
    ],
    form: {
      id: "Enquiry",
      title: "Start a project",
      extra: [["Project type", ["Branding", "Website", "Posters", "Other"]]],
      btn: "Send enquiry",
    },
  },
  g: {
    name: "IronPulse Fitness",
    ac: "#c6ff00",
    bg: "#0b0b0c",
    fg: "#fff",
    card: "#17171a",
    dark: 1,
    hero: [
      "Train harder. Recover smarter.",
      "Sample gym website with programs, schedule and membership enquiry.",
      "View programs",
    ],
    blocks: [
      {
        id: "Programs",
        t: "cards",
        d: [
          ["Strength", "Barbell fundamentals and progressive overload"],
          ["HIIT", "45-minute conditioning circuits"],
          ["Yoga & Mobility", "Flexibility, breathing and recovery"],
          ["Personal Training", "One-on-one coaching plans"],
        ],
      },
      {
        id: "Schedule",
        t: "table",
        d: [
          ["Mon", "6:30 AM", "Strength"],
          ["Tue", "7:00 AM", "HIIT"],
          ["Wed", "6:30 AM", "Yoga"],
          ["Thu", "7:00 PM", "HIIT"],
          ["Sat", "8:00 AM", "Strength"],
        ],
      },
      {
        id: "Plans",
        t: "cards",
        d: [
          ["Monthly", "Full gym access", "₹1,500"],
          ["Quarterly", "Access plus 2 PT sessions", "₹4,000"],
          ["Annual", "Access, classes and assessment", "₹12,000"],
        ],
      },
    ],
    form: {
      id: "Join",
      title: "Membership enquiry",
      extra: [["Plan", ["Monthly", "Quarterly", "Annual"]]],
      btn: "Enquire now",
    },
  },
  s: {
    name: "Glow & Co. Salon",
    ac: "#d6336c",
    bg: "#fff1ee",
    fg: "#3a1f26",
    card: "#fff",
    hero: [
      "Beauty, beautifully done.",
      "Sample salon website with services, pricing and appointment booking.",
      "See services",
    ],
    blocks: [
      {
        id: "Services",
        t: "cards",
        d: [
          ["Haircut & Style", "Wash, cut and blow-dry", "₹600"],
          ["Hair Colour", "Global colour and highlights", "₹2,500"],
          ["Facial", "Deep-cleanse glow facial", "₹1,200"],
          ["Bridal Makeup", "Trial and wedding-day look", "₹8,000"],
        ],
      },
      {
        id: "Gallery",
        t: "tiles",
        d: ["Colour", "Bridal", "Cut", "Nails", "Spa", "Style"],
      },
    ],
    form: {
      id: "Book",
      title: "Book an appointment",
      extra: [
        [
          "Service",
          ["Haircut & Style", "Hair Colour", "Facial", "Bridal Makeup"],
        ],
        ["Preferred date", "date"],
      ],
      btn: "Request appointment",
    },
  },
  c: {
    name: "THREAD & CO.",
    ac: "#111",
    bg: "#f1ece4",
    fg: "#111",
    card: "#fff",
    hero: [
      "The Autumn Drop.",
      "Sample clothing brand storefront with filters and a working cart.",
      "Shop now",
    ],
    blocks: [
      {
        id: "Shop",
        t: "shop",
        d: [
          ["Oxford Shirt", "Men", "₹1,799", 30],
          ["Chino Pants", "Men", "₹2,199", 40],
          ["Linen Dress", "Women", "₹2,799", 350],
          ["Wrap Top", "Women", "₹1,499", 10],
          ["Leather Belt", "Accessories", "₹999", 25],
          ["Canvas Tote", "Accessories", "₹799", 45],
        ],
      },
    ],
    form: {
      id: "Support",
      title: "Customer support",
      extra: [["Topic", ["Order", "Returns", "Sizing"]]],
      btn: "Send message",
    },
  },
};
/* ===== extra "real website" content for each demo ===== */
const EXTRA = {
  urban: {
    logo: "🔥", promo: "Free dessert for bookings of 4+ this weekend", art: ["🍛", "🍢", "🫓"], rating: "4.8 · 2,300 reviews",
    menuEmoji: ["🧀", "🍗", "🍛", "🥘", "🍚", "🍮", "☕"], tileEmoji: ["🔥", "🍚", "🥙", "🍮", "☕", "🕯️"],
    stats: [["4.8★", "Guest rating"], ["12k+", "Plates served monthly"], ["15 yrs", "Of family recipes"]],
    reviews: [["Best butter chicken in town. Warm room, quick service.", "Ananya R."], ["The tandoor starters are unreal. Booked again for Sunday.", "Kiran M."], ["Perfect for family dinners, and the biryani is the star.", "Rohit S."]],
    info: ["12 Sample Street, Your City", "+91 98765 43210", "hello@urbanspice.example"], cta: ["Hungry already?", "Table for tonight? Reserve in 30 seconds."],
  },
  business: {
    logo: "◆", promo: "Free 30-minute intro call for new clients", art: ["📈", "🧭", "🤝"], rating: "4.9 · 180 client reviews",
    cardEmoji: { Services: ["🎯", "⚙️", "🧠"] },
    stats: [["120+", "Companies advised"], ["94%", "Client retention"], ["8 yrs", "Of experience"]],
    reviews: [["They turned a vague idea into a clear 90-day plan.", "Meera K., Founder"], ["Calm, sharp and always on time. Highly recommended.", "Dev P., COO"], ["Our operations finally run without firefighting.", "Sana A., Director"]],
    info: ["4th Floor, Sample Tower, Your City", "+91 98765 00000", "team@modernbusiness.example"], cta: ["Ready to grow?", "Tell us where you want to be in a year."],
  },
  p: {
    logo: "✺", promo: "Open for new projects from next month", art: ["🎨", "✏️", "💻"], rating: "5.0 · 40 projects",
    cardEmoji: { Projects: ["☕", "🎶", "📱", "🖥️"] },
    stats: [["40+", "Projects shipped"], ["6 yrs", "Designing"], ["100%", "Remote friendly"]],
    reviews: [["Aria understood our brand in one call.", "Café owner"], ["Posters were ready before the deadline, and they were stunning.", "Event organiser"], ["Clean UI, clean handoff, zero drama.", "Startup founder"]],
    info: ["Remote, worldwide", "+91 98765 11111", "hello@ariastudio.example"], cta: ["Have a project?", "Share a few details and get a reply within a day."],
  },
  g: {
    logo: "⚡", promo: "First week free for new members", art: ["🏋️", "🔥", "⏱️"], rating: "4.7 · 900 members",
    cardEmoji: { Programs: ["🏋️", "⚡", "🧘", "🎯"], Plans: ["🥉", "🥈", "🥇"] },
    stats: [["900+", "Active members"], ["18", "Certified trainers"], ["40", "Classes every week"]],
    reviews: [["Lost 9 kg in four months. The trainers actually care.", "Aman T."], ["The 6:30 AM strength class changed my routine.", "Priya N."], ["Clean gym, great equipment and no crowd.", "Joel D."]],
    info: ["88 Fitness Lane, Your City", "+91 98765 22222", "join@ironpulse.example"], cta: ["Start today", "Your first week is on us. No contract."],
  },
  s: {
    logo: "✿", promo: "Bridal trial bookings open for the wedding season", art: ["💇‍♀️", "💅", "✨"], rating: "4.9 · 1,100 reviews",
    cardEmoji: { Services: ["✂️", "🎨", "🧖‍♀️", "👰"] }, tileEmoji: ["🎨", "👰", "✂️", "💅", "🧖‍♀️", "💄"],
    stats: [["1,100+", "Happy clients"], ["12", "Expert stylists"], ["9 yrs", "In the city"]],
    reviews: [["My bridal look was exactly what I imagined.", "Ishita V."], ["Best colour work I've had, and no damage.", "Neha G."], ["Relaxing, hygienic and on time. Love it.", "Pooja L."]],
    info: ["21 Rose Avenue, Your City", "+91 98765 33333", "book@glowandco.example"], cta: ["Treat yourself", "Pick a slot and we'll take care of the rest."],
  },
  c: {
    logo: "T", promo: "Free shipping on orders above ₹1,999", art: ["👕", "👖", "👜"], rating: "4.6 · 3,400 orders",
    shopEmoji: ["👔", "👖", "👗", "👚", "🧵", "👜"],
    stats: [["3,400+", "Orders shipped"], ["7 days", "Easy returns"], ["100%", "Cotton and linen"]],
    reviews: [["The fit is perfect and the fabric feels premium.", "Rahul B."], ["Delivery in two days. Loved the linen dress.", "Sneha M."], ["Returns were painless. Will order again.", "Arjun K."]],
    info: ["Studio 5, Sample Mills, Your City", "+91 98765 44444", "care@threadandco.example"], cta: ["Join the drop", "New pieces every Friday. Be first in line."],
  },
};
Object.keys(EXTRA).forEach((k) => Object.assign(SITES[k], EXTRA[k]));

function Cover({ id }) {
  const r = useRef(),
    [w, setW] = useState(360);
  useEffect(() => {
    const o = new ResizeObserver((e) => setW(e[0].contentRect.width));
    o.observe(r.current);
    r.current
      .querySelectorAll("a,button,input,select,textarea")
      .forEach((e) => (e.tabIndex = -1));
    return () => o.disconnect();
  }, []);
  const k = w / 1280,
    pk = k * 0.8;
  return (
    <div
      ref={r}
      style={{
        position: "relative",
        aspectRatio: "16/10",
        overflow: "hidden",
        borderRadius: 14,
        border: "1px solid var(--bd)",
        background: SITES[id].bg,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          width: 1280,
          height: 800,
          transformOrigin: "0 0",
          transform: `scale(${k})`,
          pointerEvents: "none",
        }}
      >
        <Site c={SITES[id]} />
      </div>
      <div
        style={{
          position: "absolute",
          right: "4%",
          bottom: "6%",
          width: 390 * pk,
          height: 780 * pk,
          borderRadius: 14,
          border: "3px solid #111",
          overflow: "hidden",
          boxShadow: "0 10px 30px #0008",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 390,
            height: 780,
            transformOrigin: "0 0",
            transform: `scale(${pk})`,
          }}
        >
          <Site c={SITES[id]} />
        </div>
      </div>
    </div>
  );
}
function Site({ c }) {
  const [f, setF] = useState("All"),
    [cart, setCart] = useState([]),
    [showCart, setShowCart] = useState(false),
    [ok, setOk] = useState(""),
    [op, setOp] = useState(-1),
    [liked, setLiked] = useState({});
  const n = cart.reduce((a, x) => a + x.q, 0);
  const num = (p) => Number(String(p).replace(/[^0-9]/g, ""));
  const total = cart.reduce((a, x) => a + num(x.p) * x.q, 0);
  const add = (t, p) => {
    setCart((cs) => (cs.find((x) => x.t === t) ? cs.map((x) => (x.t === t ? { ...x, q: x.q + 1 } : x)) : [...cs, { t, p, q: 1 }]));
    setOk("");
  };
  const jump = (i) => document.getElementById("s-" + i)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const onAc = c.dark ? "#000" : "#fff",
    btn = { background: c.ac, borderColor: c.ac, color: onAc },
    inp = { background: c.card, color: c.fg, border: "1px solid " + c.ac + "66" },
    hd = { fontFamily: "'Space Grotesk',sans-serif", letterSpacing: "-.03em" },
    bd = "1px solid " + c.ac + "44",
    soft = c.dark ? "#ffffff0d" : "#0000000a",
    textAc = c.dark ? c.ac : c.fg;
  const ey = (t) => (
    <div style={{ color: c.dark ? c.ac : c.ac === "#111" ? "#666" : c.ac, fontSize: 12, letterSpacing: ".2em", textTransform: "uppercase" }}>{t}</div>
  );
  const chip = (x) => (
    <button key={x} className="chip" style={f === x ? { background: c.ac, color: onAc, borderColor: c.ac } : { color: c.fg }} onClick={() => setF(x)}>{x}</button>
  );
  const E = (id, i) => c.cardEmoji?.[id]?.[i];
  const names = c.blocks.map((b) => b.id);
  const wrap = { maxWidth: 1040, margin: "0 auto", padding: "0 24px" };
  const stars = <span style={{ color: "#f5a623", letterSpacing: 2 }}>★★★★★</span>;
  return (
    <div style={{ background: c.bg, color: c.fg }}>
      {c.promo && (
        <div style={{ background: c.ac, color: onAc, textAlign: "center", fontSize: 13, padding: "8px 12px", fontWeight: 500 }}>{c.promo}</div>
      )}
      <header style={{ position: "sticky", top: 0, zIndex: 5, background: c.bg + "ee", backdropFilter: "blur(10px)", borderBottom: bd }}>
        <div style={{ ...wrap, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", flexWrap: "wrap", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 36, height: 36, borderRadius: 11, display: "grid", placeItems: "center", background: c.ac, color: onAc, fontWeight: 700, fontSize: 18 }}>{c.logo}</span>
            <b style={{ ...hd, fontSize: 19, color: textAc }}>{c.name}</b>
          </div>
          <nav style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap", fontSize: 14 }}>
            {[...names, c.form.id].map((i) => (
              <a key={i} href="#" onClick={(e) => { e.preventDefault(); jump(i); }}>{i}</a>
            ))}
            {c.blocks[0].t === "shop" ? (
              <button className="btn" style={{ ...btn, padding: "7px 16px" }} onClick={() => setShowCart(!showCart)}>🛒 Cart ({n})</button>
            ) : (
              <button className="btn" style={{ ...btn, padding: "7px 16px" }} onClick={() => jump(c.form.id)}>{c.hero[2]}</button>
            )}
          </nav>
        </div>
      </header>
      {showCart && (
        <div style={{ position: "sticky", top: 64, zIndex: 6 }}>
          <div style={{ position: "absolute", right: 24, width: 320, background: c.card, color: c.fg, border: bd, borderRadius: 16, padding: 18, boxShadow: "0 20px 60px #0005" }}>
            <b style={hd}>Your cart</b>
            {cart.length === 0 && <p style={{ opacity: 0.6, fontSize: 14 }}>Your cart is empty. Add something you like.</p>}
            {cart.map((x) => (
              <div key={x.t} style={{ display: "flex", justifyContent: "space-between", gap: 8, padding: "10px 0", borderBottom: bd, fontSize: 14 }}>
                <span>{x.t} × {x.q}</span>
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <b>₹{(num(x.p) * x.q).toLocaleString("en-IN")}</b>
                  <button aria-label={"Remove " + x.t} onClick={() => setCart(cart.filter((y) => y.t !== x.t))} style={{ all: "unset", cursor: "pointer", opacity: 0.6 }}>✕</button>
                </span>
              </div>
            ))}
            {cart.length > 0 && (
              <>
                <div style={{ display: "flex", justifyContent: "space-between", margin: "14px 0", fontWeight: 600 }}><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
                <button className="btn" style={{ ...btn, width: "100%" }} onClick={() => { setOk("Demo only: checkout isn't connected. " + n + " item(s), ₹" + total.toLocaleString("en-IN") + "."); setShowCart(false); }}>Checkout</button>
              </>
            )}
          </div>
        </div>
      )}
      {ok && <div className="msg" style={{ maxWidth: 1000, margin: "10px auto", color: c.fg, background: c.card }} role="status">{ok}</div>}

      <div style={{ padding: "56px 24px 70px", background: `radial-gradient(circle at 80% 20%,${c.ac}44,transparent 55%)`, overflow: "hidden" }}>
        <div style={{ maxWidth: 1040, margin: "auto", display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-block", padding: "6px 14px", borderRadius: 99, background: soft, border: bd, fontSize: 13 }}>{stars} <span style={{ opacity: 0.75, marginLeft: 6 }}>{c.rating}</span></span>
            <h1 style={{ ...hd, fontSize: "clamp(36px,6vw,66px)", lineHeight: 1, margin: "16px 0" }}>{c.hero[0]}</h1>
            <p style={{ opacity: 0.75, maxWidth: 480, fontSize: 18 }}>{c.hero[1]}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 22 }}>
              <button className="btn" style={btn} onClick={() => jump(c.form.id)}>{c.hero[2]}</button>
              <button className="btn g" style={{ color: c.fg, borderColor: c.ac + "99" }} onClick={() => jump(c.blocks[0].id)}>{c.hero[3] || "Explore"}</button>
            </div>
            <div style={{ display: "flex", gap: 22, marginTop: 28, fontSize: 13, opacity: 0.75, flexWrap: "wrap" }}>
              <span>✓ Trusted locally</span><span>✓ Quick response</span><span>✓ Satisfaction promise</span>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "1", maxWidth: 400, width: "100%", justifySelf: "center" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "42% 58% 55% 45%", background: `linear-gradient(135deg,${c.ac},${c.ac}22)` }} />
            <div style={{ position: "absolute", inset: "12%", borderRadius: "50%", background: c.card, boxShadow: "0 30px 70px #0005", display: "grid", placeItems: "center", fontSize: "clamp(90px,16vw,170px)", lineHeight: 1 }}>{c.art[0]}</div>
            <div style={{ position: "absolute", right: "-2%", top: "8%", width: "26%", aspectRatio: "1", borderRadius: 22, background: c.card, boxShadow: "0 14px 40px #0004", display: "grid", placeItems: "center", fontSize: 44, transform: "rotate(8deg)" }}>{c.art[1]}</div>
            <div style={{ position: "absolute", left: "2%", top: "14%", width: "22%", aspectRatio: "1", borderRadius: "50%", background: c.card, boxShadow: "0 14px 40px #0004", display: "grid", placeItems: "center", fontSize: 36 }}>{c.art[2]}</div>
            <div style={{ position: "absolute", left: "-3%", bottom: "8%", background: c.card, color: c.fg, borderRadius: 16, padding: "12px 18px", boxShadow: "0 14px 40px #0004" }}>
              <div style={{ fontSize: 12, opacity: 0.6 }}>{(c.badge || ["Sample", "Demo concept"])[0]}</div>
              <b>{(c.badge || ["Sample", "Demo concept"])[1]}</b>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: soft, borderBlock: bd }}>
        <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10, padding: "26px 24px", textAlign: "center" }}>
          {c.stats.map(([a, b]) => (
            <div key={b}><b style={{ ...hd, fontSize: 30, color: textAc }}>{a}</b><div style={{ opacity: 0.65, fontSize: 13 }}>{b}</div></div>
          ))}
        </div>
      </div>

      {c.blocks.map((b) => (
        <div id={"s-" + b.id} key={b.id} style={{ padding: "60px 24px", maxWidth: 1040, margin: "auto" }}>
          {ey(c.name)}
          <h2 style={{ ...hd, fontSize: "clamp(28px,4vw,40px)", margin: "8px 0 0" }}>{b.id}</h2>
          {b.t === "cards" && (
            <div className="grid" style={{ marginTop: 24 }}>
              {b.d.map(([t, d, p], k) => (
                <div key={t} style={{ background: c.card, border: bd, borderRadius: 18, padding: 22 }}>
                  {E(b.id, k) && <div style={{ width: 48, height: 48, borderRadius: 14, display: "grid", placeItems: "center", background: c.ac + "22", fontSize: 24, marginBottom: 12 }}>{E(b.id, k)}</div>}
                  <h3 style={hd}>{t}</h3>
                  <p style={{ opacity: 0.7, margin: "6px 0" }}>{d}</p>
                  {p && <b style={{ color: textAc, fontSize: 20 }}>{p}</b>}
                  {p && <button className="btn" style={{ ...btn, marginTop: 12, padding: "8px 18px", display: "block" }} onClick={() => jump(c.form.id)}>Choose</button>}
                </div>
              ))}
            </div>
          )}
          {b.t === "steps" && (
            <div className="grid" style={{ marginTop: 24 }}>
              {b.d.map(([t, d], k) => (
                <div key={t} style={{ background: c.card, border: bd, borderRadius: 18, padding: 22 }}>
                  <b style={{ ...hd, fontSize: 36, color: c.ac }}>0{k + 1}</b>
                  <h3 style={hd}>{t}</h3>
                  <p style={{ opacity: 0.7, margin: 0 }}>{d}</p>
                </div>
              ))}
            </div>
          )}
          {b.t === "faq" && (
            <div style={{ marginTop: 24 }}>
              {b.d.map(([q, a], k) => (
                <div key={q} style={{ borderBottom: bd }}>
                  <button onClick={() => setOp(op === k ? -1 : k)} aria-expanded={op === k} style={{ all: "unset", cursor: "pointer", display: "flex", justifyContent: "space-between", width: "100%", padding: "16px 0", fontWeight: 500 }}>
                    {q}<span style={{ color: c.ac }}>{op === k ? "−" : "+"}</span>
                  </button>
                  {op === k && <p style={{ opacity: 0.7, margin: "0 0 16px" }}>{a}</p>}
                </div>
              ))}
            </div>
          )}
          {b.t === "menu" && (
            <>
              <div className="chips">{["All", ...new Set(b.d.map((x) => x[1]))].map(chip)}</div>
              <div style={{ marginTop: 14 }}>
                {b.d.map((x, i) => [x, i]).filter(([x]) => f === "All" || x[1] === f).map(([[t, , p, d], i]) => (
                  <div key={t} style={{ display: "flex", gap: 14, alignItems: "center", padding: "14px 0", borderBottom: "1px dashed " + c.ac + "55" }}>
                    <span style={{ width: 56, height: 56, borderRadius: 14, display: "grid", placeItems: "center", background: c.ac + "22", fontSize: 28 }}>{c.menuEmoji?.[i]}</span>
                    <div style={{ flex: 1 }}>
                      <b>{t}</b> <span title="Vegetarian" style={{ display: "inline-block", width: 10, height: 10, border: "1.5px solid #2ca85a", marginLeft: 6, position: "relative", top: 1 }} />
                      <div style={{ opacity: 0.65, fontSize: 14 }}>{d}</div>
                    </div>
                    <b style={{ color: c.ac }}>{p}</b>
                    <button className="btn" style={{ ...btn, padding: "6px 14px" }} onClick={() => setOk(t + " added to your order (demo).")}>Add</button>
                  </div>
                ))}
              </div>
            </>
          )}
          {b.t === "chips" && (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 24 }}>
              {b.d.map((t) => <span key={t} style={{ border: "1px solid " + c.ac, borderRadius: 999, padding: "8px 18px" }}>{t}</span>)}
            </div>
          )}
          {b.t === "table" && (
            <div style={{ overflowX: "auto", marginTop: 20 }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>{b.d.map((r, k) => (<tr key={k} style={{ borderBottom: bd }}>{r.map((x, j) => (<td key={j} style={{ padding: 12, fontWeight: j === 0 ? 600 : 400 }}>{x}</td>))}</tr>))}</tbody>
              </table>
            </div>
          )}
          {b.t === "tiles" && (
            <div className="grid" style={{ marginTop: 24, gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))" }}>
              {b.d.map((t, k) => (
                <div key={t} style={{ aspectRatio: "1", borderRadius: 18, display: "grid", placeItems: "center", alignContent: "center", gap: 6, color: "#fff", fontWeight: 500, background: `linear-gradient(135deg,hsl(${(c.dark ? 30 : 340) + k * 14},60%,${c.dark ? 28 : 55}%),hsl(${(c.dark ? 10 : 20) + k * 14},70%,${c.dark ? 18 : 70}%))` }}>
                  <span style={{ fontSize: 40 }}>{c.tileEmoji?.[k]}</span>{t}
                </div>
              ))}
            </div>
          )}
          {b.t === "shop" && (
            <>
              <div className="chips">{["All", "Men", "Women", "Accessories"].map(chip)}</div>
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))" }}>
                {b.d.map((p, i) => [p, i]).filter(([p]) => f === "All" || p[1] === f).map(([[t, cat, pr, h], i]) => (
                  <div key={t} style={{ background: c.card, borderRadius: 14, overflow: "hidden", border: bd }}>
                    <div style={{ position: "relative", aspectRatio: "4/5", display: "grid", placeItems: "center", fontSize: 76, background: `linear-gradient(160deg,hsl(${h},35%,72%),hsl(${h},30%,42%))` }}>
                      {c.shopEmoji?.[i]}
                      {i % 3 === 0 && <span style={{ position: "absolute", left: 10, top: 10, background: "#111", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 99 }}>NEW</span>}
                      <button aria-label="Save to wishlist" onClick={() => setLiked({ ...liked, [t]: !liked[t] })} style={{ all: "unset", cursor: "pointer", position: "absolute", right: 10, top: 10, width: 32, height: 32, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", fontSize: 16, color: "#d6336c" }}>{liked[t] ? "♥" : "♡"}</button>
                    </div>
                    <div style={{ padding: 14 }}>
                      <b>{t}</b>
                      <div style={{ opacity: 0.6, fontSize: 13 }}>{cat} · {stars} <span style={{ opacity: 0.8 }}>4.{5 + (i % 4)}</span></div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                        <b>{pr}</b>
                        <button className="btn" style={{ ...btn, padding: "6px 14px" }} onClick={() => add(t, pr)}>Add</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      ))}

      <div style={{ background: soft, borderBlock: bd, padding: "60px 24px" }}>
        <div style={{ maxWidth: 1040, margin: "auto" }}>
          {ey("Testimonials")}
          <h2 style={{ ...hd, fontSize: "clamp(28px,4vw,40px)", margin: "8px 0 0" }}>What people say</h2>
          <div className="grid" style={{ marginTop: 24 }}>
            {c.reviews.map(([q, w]) => (
              <figure key={w} style={{ margin: 0, background: c.card, border: bd, borderRadius: 18, padding: 22 }}>
                {stars}
                <blockquote style={{ margin: "10px 0 16px", opacity: 0.85 }}>“{q}”</blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14 }}>
                  <span style={{ width: 34, height: 34, borderRadius: "50%", background: c.ac, color: onAc, display: "grid", placeItems: "center", fontWeight: 700 }}>{w[0]}</span>{w}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div id={"s-" + c.form.id} style={{ padding: "60px 24px", maxWidth: 1040, margin: "auto", display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", alignItems: "start" }}>
        <div>
          {ey("Enquiry")}
          <h2 style={{ ...hd, fontSize: 36, margin: "8px 0 12px" }}>{c.cta[0]}</h2>
          <p style={{ opacity: 0.75 }}>{c.cta[1]}</p>
          <p style={{ opacity: 0.75, lineHeight: 2 }}>📍 {c.info[0]}<br />📞 {c.info[1]}<br />✉️ {c.info[2]}</p>
        </div>
        <div>
          <h3 style={{ ...hd, fontSize: 22, margin: "0 0 14px" }}>{c.form.title}</h3>
          <form onSubmit={(e) => { e.preventDefault(); e.target.reset(); setOk("Demo only: this form is a sample and nothing was sent."); }}>
            <label style={{ color: c.fg }}>Name<input required style={inp} /></label>
            <label style={{ color: c.fg }}>Email<input type="email" required style={inp} /></label>
            {c.form.extra.map(([l, o]) => (
              <label key={l} style={{ color: c.fg }}>
                {l}
                {typeof o === "string" ? <input type={o} required style={inp} /> : <select style={inp}>{o.map((x) => <option key={x}>{x}</option>)}</select>}
              </label>
            ))}
            <label style={{ color: c.fg }}>Message<textarea rows="3" style={inp} /></label>
            <button className="btn" style={btn}>{c.form.btn}</button>
          </form>
          {ok && <div className="msg" style={{ marginTop: 14, color: c.fg, background: c.card }} role="status">{ok}</div>}
        </div>
      </div>

      <footer style={{ borderTop: bd, padding: "40px 24px 20px", fontSize: 14, background: soft }}>
        <div style={{ ...wrap, padding: 0, display: "grid", gap: 30, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: 10, display: "grid", placeItems: "center", background: c.ac, color: onAc, fontWeight: 700 }}>{c.logo}</span>
              <b style={{ ...hd, fontSize: 17 }}>{c.name}</b>
            </div>
            <p style={{ opacity: 0.65 }}>{c.hero[1]}</p>
          </div>
          <div><b>Explore</b><div style={{ display: "grid", gap: 6, marginTop: 8 }}>{[...names, c.form.id].map((i) => <a key={i} href="#" onClick={(e) => { e.preventDefault(); jump(i); }}>{i}</a>)}</div></div>
          <div><b>Visit us</b><p style={{ opacity: 0.7, lineHeight: 1.9, margin: "8px 0 0" }}>{c.info[0]}<br />{c.info[1]}<br />{c.info[2]}</p></div>
          <div><b>Follow</b><div style={{ display: "flex", gap: 8, marginTop: 10 }}>{["IG", "FB", "X", "YT"].map((s) => <span key={s} style={{ width: 34, height: 34, borderRadius: "50%", border: bd, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 700 }}>{s}</span>)}</div></div>
        </div>
        <div style={{ textAlign: "center", opacity: 0.55, fontSize: 13, marginTop: 28 }}>© Sample concept by Veeva Creatives. Not a real business.</div>
      </footer>
    </div>
  );
}
function DemoView({ id, onClose, onRequest }) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => {
      removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, []);
  return (
    <div className="demo">
      <div className="dbar">
        <button className="t" onClick={onClose}>
          ← Back to Veeva Creatives
        </button>
        <span>Demo concept · {DEMOS.find((x) => x.id === id).name}</span>
        <span>
          <button className="t" onClick={() => setM(!m)}>
            {m ? "Desktop view" : "Mobile view"}
          </button>{" "}
          <button
            onClick={() => {
              onClose();
              onRequest();
            }}
          >
            Request a similar website
          </button>
        </span>
      </div>
      <div
        className="dframe"
        style={{
          maxWidth: m ? 390 : "100%",
          boxShadow: m ? "0 0 0 1px #ccc" : "none",
        }}
      >
        <Site c={SITES[id]} />
      </div>
    </div>
  );
}

function Websites({ onRequest }) {
  const [d, setD] = useState(null);
  return (
    <section id="websites" style={{ background: "var(--bg2)" }}>
      <div className="wrap">
        <Head
          e="Website Designs"
          t="WEBSITE EXPERIENCES BUILT TO IMPRESS."
          s="Explore website concepts that demonstrate how we can bring your business online. These are demo concepts, not client projects."
        />
        <div className="grid">
          {DEMOS.map((x) => (
            <div className="card rv" key={x.id}>
              <Cover id={x.id} />
              <h3 className="sg" style={{ margin: "14px 0 2px" }}>
                {x.name}
              </h3>
              <div className="eyebrow" style={{ margin: "4px 0" }}>
                {x.cat}
              </div>
              <p className="mu" style={{ fontSize: 14 }}>
                {x.desc}
              </p>
              <div style={{ marginBottom: 12 }}>
                {x.feats.map((t) => (
                  <span className="tag" key={t}>
                    ● {t}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn" onClick={() => setD(x.id)}>
                  View Demo
                </button>
                <button
                  className="btn g"
                  onClick={() => onRequest("Website Design & Development")}
                >
                  Request a Similar Website
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {d && (
        <DemoView
          id={d}
          onClose={() => setD(null)}
          onRequest={() => onRequest("Website Design & Development")}
        />
      )}
    </section>
  );
}

function About() {
  return (
    <section id="about">
      <div
        className="wrap"
        style={{
          display: "grid",
          gap: 40,
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        }}
      >
        <div>
          <Head
            e="About"
            t="SMALL STUDIO. BIG CREATIVE IDEAS."
            s="Veeva Creatives is a creative and digital studio focused on helping businesses build a strong visual identity and a meaningful online presence. We bring design and development together to transform ideas into polished digital experiences."
          />
        </div>
        <div style={{ display: "grid", gap: 16 }}>
          {[
            [
              "01",
              "Understand",
              "We learn about the business, its audience, and its goals.",
            ],
            [
              "02",
              "Create",
              "We translate ideas into thoughtful designs and functional digital experiences.",
            ],
            [
              "03",
              "Deliver",
              "We focus on quality, usability, responsiveness, and clear communication.",
            ],
          ].map(([n, t, d]) => (
            <div
              className="card rv"
              key={n}
              style={{ display: "flex", gap: 18 }}
            >
              <b className="pk sg" style={{ fontSize: 28 }}>
                {n}
              </b>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const SV = [
  "Poster & Social Media Design",
  "Website Design & Development",
  "Branding & Visual Identity",
  "UI/UX Design",
  "Creative Collaterals",
  "Custom Digital Solutions",
  "Multiple Services",
  "Other",
];
const BUD = [
  "",
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
];
function Contact({ service }) {
  const blank = {
    name: "",
    email: "",
    phone: "",
    brand: "",
    service: "",
    budget: "",
    desc: "",
    method: "Email",
    consent: false,
  };
  const [v, setV] = useState(blank),
    [er, setEr] = useState({}),
    [st, setSt] = useState({ k: "idle" }),
    [hp, setHp] = useState("");
  useEffect(() => {
    if (service) setV((x) => ({ ...x, service }));
  }, [service]);
  const set = (k, val) => setV((x) => ({ ...x, [k]: val }));
  const check = () => {
    const e = {};
    if (!v.name.trim()) e.name = "Please enter your name.";
    if (!v.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email))
      e.email = "Enter a valid email address.";
    if (!v.service) e.service = "Please choose a service.";
    if (!v.desc.trim()) e.desc = "Please describe your project.";
    if (!v.consent) e.consent = "Consent is required.";
    return e;
  };
  const submit = async (ev) => {
    ev.preventDefault();
    if (st.k === "loading") return;
    const e = check();
    setEr(e);
    if (Object.keys(e).length) return;
    const text = Object.entries(v)
      .filter(([k]) => k !== "consent")
      .map(([k, x]) => k + ": " + x)
      .join("\n");
    setSt({ k: "loading" });
    try {
      const r = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...v, website: hp }),
      });
      const j = await r.json();
      if (!r.ok || j.success !== true)
        throw new Error(j.message || "The enquiry could not be saved.");
      setSt({ k: "ok", emailSent: j.emailSent === true });
      setV(blank);
      setHp("");
    } catch {
      setSt({ k: "err", t: text });
    }
  };
  const F = ({ k, l, type = "text", req, children }) => (
    <label>
      {l}
      {req && " *"}
      {children || (
        <input
          type={type}
          value={v[k]}
          onChange={(e) => set(k, e.target.value)}
          aria-invalid={!!er[k]}
        />
      )}
      {er[k] && (
        <span className="er" role="alert">
          {er[k]}
        </span>
      )}
    </label>
  );
  return (
    <section id="contact">
      <div
        className="wrap"
        style={{
          display: "grid",
          gap: 44,
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
        }}
      >
        <div>
          <Head
            e="Contact"
            t="HAVE A PROJECT IN MIND?"
            s="Tell us what you're planning. Whether you need a creative design, a new website, or a complete brand identity, let's discuss how we can bring your idea to life."
          />
          <p>
            Phone: {CONTACT.phone}
            <br />
            Email: {CONTACT.email}
            <br />
            Instagram: @veeva_creatives
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a className="btn" href={CONTACT.tel}>
              Call Us
            </a>
            <a className="btn g" href={"mailto:" + CONTACT.email}>
              Email Us
            </a>
            <a
              className="btn g"
              href={CONTACT.ig}
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow on Instagram
            </a>
          </div>
        </div>
        <form className="rv rv-r" onSubmit={submit} noValidate>
          <div className="two">
            <F k="name" l="Full Name" req />
            <F k="email" l="Email Address" type="email" req />
          </div>
          <div className="two">
            <F k="phone" l="Phone Number" type="tel" />
            <F k="brand" l="Business or Brand Name" />
          </div>
          <F k="service" l="Service Required" req>
            <select
              value={v.service}
              onChange={(e) => set("service", e.target.value)}
            >
              <option value="">Select…</option>
              {SV.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </F>
          <div className="two">
            <F k="budget" l="Project Budget (INR)">
              <select
                value={v.budget}
                onChange={(e) => set("budget", e.target.value)}
              >
                {BUD.map((b) => (
                  <option key={b} value={b}>
                    {b || "Select…"}
                  </option>
                ))}
              </select>
            </F>
            <F k="method" l="Preferred Contact Method">
              <select
                value={v.method}
                onChange={(e) => set("method", e.target.value)}
              >
                <option>Email</option>
                <option>Phone</option>
                <option>WhatsApp</option>
              </select>
            </F>
          </div>
          <F k="desc" l="Project Description" req>
            <textarea
              rows="4"
              value={v.desc}
              onChange={(e) => set("desc", e.target.value)}
            />
          </F>
          <label style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <input
              type="checkbox"
              style={{ width: 20, marginTop: 4 }}
              checked={v.consent}
              onChange={(e) => set("consent", e.target.checked)}
            />
            <span>
              I agree to Veeva Creatives contacting me about this enquiry.
              Privacy policy: add your policy page link here. *
            </span>
          </label>
          {er.consent && (
            <span className="er" role="alert">
              {er.consent}
            </span>
          )}
          <input
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
            value={hp}
            onChange={(e) => setHp(e.target.value)}
            style={{ position: "absolute", left: "-9999px" }}
          />
          <button className="btn" disabled={st.k === "loading"}>
            {st.k === "loading" ? "Sending…" : "Send Project Enquiry →"}
          </button>
          {st.k === "ok" && (
            <div className="msg" role="status">
              Thank you for contacting Veeva Creatives! Your project request
              has been saved. We'll review your requirements and get back to
              you within 24 hours.
              {st.emailSent && " A confirmation email has also been sent to you."}
            </div>
          )}
          {st.k === "err" && (
            <div className="msg" role="alert">
              Sorry, we couldn't save your request. Please try again or{" "}
              <a
                className="pk"
                href={
                  "mailto:" +
                  CONTACT.email +
                  "?subject=" +
                  encodeURIComponent("Project enquiry") +
                  "&body=" +
                  encodeURIComponent(st.t || "")
                }
              >
                send it by email instead
              </a>
              .
            </div>
          )}
        </form>
      </div>
    </section>
  );
}

const resizeImage = (file, maxWidth = 800) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    const image = new Image();
    image.onerror = reject;
    image.onload = () => {
      const scale = Math.min(1, maxWidth / image.width);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(image.width * scale);
      canvas.height = Math.round(image.height * scale);
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.58));
    };
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

function AdminPanel({ works, pages, onSaveWorks, onSavePages, onClose, onUnlock, onLock, initialTab = "works", initiallyUnlocked = false }) {
  const [code, setCode] = useState("");
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [tab, setTab] = useState(initialTab);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const [draft, setDraft] = useState({
    title: "",
    category: "Posters",
    description: "",
    images: [],
  });
  const adminCode = import.meta.env.VITE_ADMIN_CODE || "VEEVA2026";

  const unlock = (event) => {
    event.preventDefault();
    if (code === adminCode) {
      setUnlocked(true);
      setError("");
      onUnlock?.();
    } else {
      setError("Incorrect admin code.");
    }
  };

  const selectWorkImages = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const images = await Promise.all(files.map((file) => resizeImage(file)));
      setDraft((current) => ({ ...current, images: [...current.images, ...images] }));
    } catch {
      setError("One or more images could not be read.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const selectPortfolioPages = async (event) => {
    const files = Array.from(event.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      const uploaded = await Promise.all(files.map((file) => resizeImage(file)));
      if (onSavePages([...pages, ...uploaded]) === false) return;
      setError("");
    } catch {
      setError("Portfolio pages could not be uploaded.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const addWork = (event) => {
    event.preventDefault();
    if (!draft.title.trim() || !draft.images.length) {
      setError("Add a title and at least one image.");
      return;
    }
    const work = {
      id: "admin-" + Date.now(),
      title: draft.title.trim(),
      cat: draft.category,
      tags: ["VEEVA Upload"],
      desc: draft.description.trim() || "Recently uploaded creative work.",
      objective: "Present this creative work with a strong visual message.",
      approach: "Custom uploaded artwork managed through the Veeva admin panel.",
      deliver: ["Creative artwork"],
      images: draft.images,
    };
    const saved = onSaveWorks([...works, work]);
    if (saved === false) return;
    setDraft({ title: "", category: "Posters", description: "", images: [] });
    setError("");
  };

  const removeWork = (id) => {
    onSaveWorks(works.filter((item) => item.id !== id));
  };

  return (
    <div className="admin-panel-mask" role="dialog" aria-modal="true" aria-label="Veeva website admin">
      <div className="admin-panel">
        <button className="admin-panel-close" type="button" onClick={onClose} aria-label="Close admin">×</button>
        {!unlocked ? (
          <form className="admin-login" onSubmit={unlock}>
            <span className="admin-kicker">PRIVATE ACCESS</span>
            <h2>Admin mode</h2>
            <p>Enter the Veeva admin code to manage website artwork.</p>
            <input
              type="password"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="Secret code"
              autoFocus
            />
            {error && <div className="admin-error">{error}</div>}
            <button className="admin-primary" type="submit">Enter admin mode</button>
          </form>
        ) : (
          <>
            <div className="admin-panel-heading">
              <div>
                <span className="admin-kicker">VEEVA CONTENT STUDIO</span>
                <h2>Manage website content</h2>
              </div>
              <button className="admin-reset" type="button" onClick={() => {
                setUnlocked(false);
                onLock();
              }}>Lock</button>
            </div>
            <div className="admin-tabs">
              <button className={tab === "works" ? "active" : ""} onClick={() => setTab("works")}>Works</button>
              <button className={tab === "portfolio" ? "active" : ""} onClick={() => setTab("portfolio")}>Portfolio pages</button>
            </div>
            {error && <div className="admin-error">{error}</div>}
            {tab === "works" ? (
              <div className="admin-content">
                <form className="admin-work-form" onSubmit={addWork}>
                  <label>Project title<input value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} /></label>
                  <label>Category<select value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value })}>
                    {CATS.filter((category) => category !== "All Work").map((category) => <option key={category}>{category}</option>)}
                  </select></label>
                  <label>Description<textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /></label>
                  <label className="admin-upload">
                    <input type="file" accept="image/*" multiple onChange={selectWorkImages} />
                    <span>{uploading ? "Optimising images..." : "Choose artwork images"}</span>
                  </label>
                  {draft.images.length > 0 && (
                    <div className="admin-preview">
                      {draft.images.map((image, index) => <img src={image} alt="" key={`${image.slice(-24)}-${index}`} />)}
                    </div>
                  )}
                  <button className="admin-primary" type="submit" disabled={uploading}>Publish work</button>
                </form>
                <div className="admin-manage-list">
                  <span className="admin-kicker">PUBLISHED UPLOADS</span>
                  {works.filter((item) => String(item.id).startsWith("admin-")).map((item) => (
                    <div className="admin-manage-item" key={item.id}>
                      <img src={item.images[0]} alt="" />
                      <div><strong>{item.title}</strong><small>{item.cat}</small></div>
                      <button type="button" onClick={() => removeWork(item.id)}>Remove</button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="admin-page-manager">
                <label className="admin-upload">
                  <input type="file" accept="image/*" multiple onChange={selectPortfolioPages} />
                  <span>{uploading ? "Adding portfolio pages..." : "Upload portfolio pages"}</span>
                </label>
                <div className="admin-preview admin-portfolio-preview">
                  {pages.map((page, index) => <img src={page} alt={`Portfolio page ${index + 1}`} key={`${page.slice(-24)}-${index}`} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function Footer({ onAdmin }) {
  return (
    <footer>
      <div className="wrap fg">
        <div>
          <button
            className="logo"
            type="button"
            onClick={() => go("home")}
            aria-label="Veeva Creatives home"
          >
            <img src="/assets/portfolio/veeva-logo.png" alt="" />
            <span>VEEVA CREATIVES</span>
          </button>
          <p className="mu" style={{ maxWidth: 340 }}>
            A creative and digital studio for posters, branding and websites.{" "}
            <b className="pk">We Create. You Grow.</b>
          </p>
        </div>
        <div>
          <b>Explore</b>
          <p className="mu">
            <a href="#work">Posters & Branding</a>
            <br />
            <a href="#websites">Website Designs</a>
            <br />
            <a href="#about">About</a>
            <br />
            <a href="#contact">Contact</a>
          </p>
        </div>
        <div>
          <b>Get in touch</b>
          <p className="mu">
            <a href={"mailto:" + CONTACT.email}>{CONTACT.email}</a>
            <br />
            <a href={CONTACT.tel}>{CONTACT.phone}</a>
            <br />
            <a href={CONTACT.ig} target="_blank" rel="noopener noreferrer">
              @veeva_creatives
            </a>
          </p>
        </div>
      </div>
      <div className="wrap mu" style={{ marginTop: 30, fontSize: 14 }}>
        © 2026 Veeva Creatives. All rights reserved.
      </div>
    </footer>
  );
}

function App() {
  useReveal();
  const [svc, setSvc] = useState("");
  const [welcomeVisible, setWelcomeVisible] = useState(
    () => sessionStorage.getItem("veeva-welcome-seen") !== "1"
  );
  const [adminOpen, setAdminOpen] = useState(false);
  // hold the hero entrance animations until the welcome intro has closed
  React.useLayoutEffect(() => {
    document.documentElement.classList.toggle("intro-on", welcomeVisible);
  }, [welcomeVisible]);
  const [adminEntryVisible, setAdminEntryVisible] = useState(false);
  const [adminTab, setAdminTab] = useState("works");
  const [adminUnlocked, setAdminUnlocked] = useState(
    () => sessionStorage.getItem("veeva-admin-unlocked") === "1"
  );
  const [customWorks, setCustomWorks] = useState(() => {
    try { return JSON.parse(localStorage.getItem("veeva-admin-works") || "[]"); }
    catch { return []; }
  });
  const [customPages, setCustomPages] = useState(() => {
    try { return JSON.parse(localStorage.getItem("veeva-admin-pages") || "[]"); }
    catch { return []; }
  });
  const [removedWorkIds, setRemovedWorkIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("veeva-removed-work-ids") || "[]"); }
    catch { return []; }
  });
  const works = [...BASE_WORKS, ...customWorks].filter((work) => !removedWorkIds.includes(work.id));
  const portfolioPages = [...PORTFOLIO_PAGES, ...customPages];
  const saveWorks = (nextWorks) => {
    try { localStorage.setItem("veeva-admin-works", JSON.stringify(nextWorks)); }
    catch {
      window.alert("Publishing failed: these images are too large for browser storage. Upload fewer images or smaller images.");
      return false;
    }
    setCustomWorks(nextWorks);
    return true;
  };
  const savePages = (nextPages) => {
    const customPagesToSave = nextPages.filter((page) => !PORTFOLIO_PAGES.includes(page));
    try {
      localStorage.setItem("veeva-admin-pages", JSON.stringify(customPagesToSave));
      setCustomPages(customPagesToSave);
      return true;
    } catch {
      window.alert("Publishing failed: these images are too large for browser storage. Upload fewer portfolio pages at once.");
      return false;
    }
  };
  const [portfolioPage, setPortfolioPage] = useState(
    () => new URLSearchParams(window.location.search).has("portfolio"),
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const adminCode = import.meta.env.VITE_ADMIN_CODE || "VEEVA2026";
    if (params.get("admin") === adminCode) {
      sessionStorage.setItem("veeva-admin-unlocked", "1");
      setAdminUnlocked(true);
      setAdminTab("works");
      setAdminOpen(true);
      params.delete("admin");
      window.history.replaceState({}, "", `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`);
    }
  }, []);
  useEffect(() => {
    let typedCode = "";
    let resetTimer;
    const openAdminWithCode = (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(event.target.tagName)) return;
      typedCode += event.key.toLowerCase();
      typedCode = typedCode.slice(-12);
      clearTimeout(resetTimer);
      resetTimer = window.setTimeout(() => { typedCode = ""; }, 1400);
      if (typedCode.endsWith("veer")) {
        typedCode = "";
        setAdminEntryVisible(true);
      }
    };
    window.addEventListener("keydown", openAdminWithCode);
    return () => {
      window.removeEventListener("keydown", openAdminWithCode);
      clearTimeout(resetTimer);
    };
  }, []);
  useEffect(() => {
    const syncPortfolioRoute = () => {
      setPortfolioPage(new URLSearchParams(window.location.search).has("portfolio"));
    };
    window.addEventListener("popstate", syncPortfolioRoute);
    return () => window.removeEventListener("popstate", syncPortfolioRoute);
  }, []);
  const req = (s) => {
    setSvc(s);
    go("contact");
  };
  const openAdmin = (tab = "works") => {
    setAdminTab(tab);
    setAdminOpen(true);
  };
  const closeWelcome = () => {
    sessionStorage.setItem("veeva-welcome-seen", "1");
    setWelcomeVisible(false);
  };
  if (portfolioPage) return <PortfolioPage pages={portfolioPages} />;
  return (
    <>
      <FX />
      {welcomeVisible && <WelcomeIntro onComplete={closeWelcome} />}
      <Nav />
      {adminEntryVisible && !adminUnlocked && (
        <button
          className="admin-mode-enter"
          type="button"
          onClick={() => {
            setAdminTab("works");
            setAdminOpen(true);
          }}
        >
          Enter admin mode
        </button>
      )}
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Work
          works={works}
          adminUnlocked={adminUnlocked}
          onAdmin={openAdmin}
          onDeleteWork={(id) => {
            saveWorks(customWorks.filter((work) => work.id !== id));
            const nextRemovedIds = [...new Set([...removedWorkIds, id])];
            setRemovedWorkIds(nextRemovedIds);
            localStorage.setItem("veeva-removed-work-ids", JSON.stringify(nextRemovedIds));
          }}
        />
        <PortfolioShowcase pages={portfolioPages} adminUnlocked={adminUnlocked} onAdmin={openAdmin} />
        <Websites onRequest={req} />
        <About />
        <Contact service={svc} />
      </main>
      <Footer onAdmin={() => openAdmin("works")} />
      {adminUnlocked && (
        <button
          className="admin-mode-exit"
          type="button"
          onClick={() => {
            sessionStorage.removeItem("veeva-admin-unlocked");
            setAdminUnlocked(false);
            setAdminOpen(false);
          }}
        >
          Exit admin mode
        </button>
      )}
      {adminOpen && (
        <AdminPanel
          works={customWorks}
          pages={portfolioPages}
          onSaveWorks={saveWorks}
          onSavePages={savePages}
          onClose={() => setAdminOpen(false)}
          initialTab={adminTab}
          initiallyUnlocked={adminUnlocked}
          onUnlock={() => {
            sessionStorage.setItem("veeva-admin-unlocked", "1");
            setAdminUnlocked(true);
          }}
          onLock={() => {
            sessionStorage.removeItem("veeva-admin-unlocked");
            setAdminUnlocked(false);
            setAdminOpen(false);
          }}
        />
      )}
    </>
  );
}
export default App;
