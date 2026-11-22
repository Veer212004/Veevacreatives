import React, { useState, useEffect, useRef } from "react";
import "./index.css";

/* ===== CONFIG: edit here ===== */
const CONTACT = {
  phone: "+91 88807 17978",
  tel: "tel:+918880717978",
  email: "veevacreatives26@gmail.com",
  ig: "https://instagram.com/veeva_creatives?rpxt=bWpodGVsZTEzc2ky",
};
// Enquiries are stored and delivered by the local Express/Nodemailer server.
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
      { threshold: 0.12 },
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
  <div className="rv">
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
  const [o, setO] = useState(false),
    [a, setA] = useState("home");
  useEffect(() => {
    const f = () => {
      const ids = ["home", "work", "websites", "about", "contact"];
      let c = "home";
      ids.forEach((i) => {
        const el = document.getElementById(i);
        if (el && el.getBoundingClientRect().top < 160) c = i;
      });
      setA(c);
    };
    f();
    addEventListener("scroll", f, { passive: true });
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
    <nav>
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
  const previousFilter = useRef(f);
  const list = works.filter((w) => f === "All Work" || w.cat === f);
  useEffect(() => {
    if (previousFilter.current === f) return;
    previousFilter.current = f;
    document
      .querySelectorAll("#work .work-card")
      .forEach((card) => card.classList.add("v"));
  }, [f]);
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
const PHOTOS = false;
const SITES = {
  urban: {
    name: "Urban Spice", logo: "🔥", hue: 25, ac: "#e8a33d", bg: "#150c08", fg: "#f6ebdd", card: "#241510", mu: "#bba995", dark: 1,
    hf: "'Playfair Display',Georgia,serif", rs: "14px", rb: "999px",
    promo: "🎉 Free dessert on bookings of 4+ this weekend",
    nav: [["Our story", "about"], ["Menu", "menu"], ["Chef's specials", "special"], ["Gallery", "gallery"], ["Visit", "reserve"]],
    cta: ["Reserve a table", "reserve"],
    hero: { kicker: "Modern Indian kitchen · Since 2009", title: "Modern Indian, cooked with fire.", sub: "Clay-oven classics and seasonal spice in a warm, candlelit room. Come hungry, leave happy.", b1: ["Reserve a table", "reserve"], b2: ["See the menu", "menu"], art: ["🍛", "🍢", "🫓"], badge: ["Open daily", "12:00 – 23:00"], rating: "4.8 · 2,300 reviews", points: ["Live tandoor", "Private dining", "Vegetarian friendly"], quick: true },
    stats: [["4.8★", "Guest rating"], ["12k+", "Plates served monthly"], ["15", "Years of recipes"], ["40+", "Dishes on the menu"]],
    secs: [
      { id: "about", t: "split", ey: "Our story", title: "A family kitchen with a fire in the middle", sub: "Everything starts with the tandoor. We marinate for 24 hours, grind our own masalas and cook to order, the way it was done at home.", e: "👨‍🍳", pts: ["Spices ground in-house every morning", "Locally sourced vegetables and dairy", "Open kitchen so you can watch the fire"], btn: ["Book a table", "reserve"] },
      { id: "menu", t: "menu", ey: "The menu", title: "Fire-cooked favourites", sub: "Tap Add to build your order, or reserve a table and let us surprise you.", d: [
        ["Paneer Tikka", "Starters", "₹320", "Charred cottage cheese, mint chutney", "🧀", 1, 1, "Chef's pick"],
        ["Chicken Seekh", "Starters", "₹380", "Minced chicken, green chilli, lemon", "🍢", 0, 2, ""],
        ["Crispy Corn Chaat", "Starters", "₹240", "Sweet corn, tamarind, sev", "🌽", 1, 1, ""],
        ["Butter Chicken", "Mains", "₹420", "Tomato-cream gravy, kasuri methi", "🍗", 0, 1, "Bestseller"],
        ["Dal Makhani", "Mains", "₹290", "Overnight black lentils, butter", "🍲", 1, 0, ""],
        ["Hyderabadi Biryani", "Mains", "₹450", "Saffron basmati, raita", "🍚", 0, 2, "Signature"],
        ["Lamb Rogan Josh", "Mains", "₹520", "Slow-braised, Kashmiri chilli", "🥘", 0, 2, ""],
        ["Garlic Naan", "Breads", "₹90", "Clay-oven, butter, garlic", "🫓", 1, 0, ""],
        ["Gulab Jamun", "Desserts", "₹140", "Warm milk dumplings in syrup", "🍮", 1, 0, ""],
        ["Kulfi Falooda", "Desserts", "₹180", "Pistachio kulfi, rose, vermicelli", "🍨", 1, 0, ""],
        ["Masala Chai", "Drinks", "₹80", "House-spiced, slow brewed", "☕", 1, 0, ""],
        ["Mango Lassi", "Drinks", "₹120", "Alphonso mango, chilled yoghurt", "🥭", 1, 0, ""],
      ] },
      { id: "special", t: "cards", ey: "Chef's specials", title: "This week at the tandoor", d: [
        ["🍖", "Tandoori Platter", "Seekh, tikka, malai chicken and a pot of dal.", "₹980", "For 2"],
        ["🦐", "Coastal Prawn Masala", "Kokum, curry leaf and fresh coconut.", "₹640", "New"],
        ["🥗", "Garden Thali", "Seven seasonal vegetarian dishes with bread.", "₹520", "Veg"],
      ], btn: "Reserve to try" },
      { id: "gallery", t: "tiles", ey: "Gallery", title: "A taste of the room", d: [["🔥", "The tandoor"], ["🍚", "Biryani"], ["🥙", "Chaat"], ["🍮", "Desserts"], ["☕", "Chai"], ["🕯️", "Dining room"]] },
    ],
    reviews: [["Best butter chicken in town. Warm room, quick service.", "Ananya R.", "Dined with family"], ["The tandoor starters are unreal. Booked again for Sunday.", "Kiran M.", "Regular guest"], ["Perfect for family dinners, and the biryani is the star.", "Rohit S.", "Birthday dinner"]],
    band: ["Hungry already?", "Reserve a table for tonight in under 30 seconds."],
    form: { id: "reserve", title: "Reserve a table", sub: "Tell us when you're coming and we'll confirm within the hour.", extra: [["Guests", ["1", "2", "3", "4", "5", "6+"]], ["Date", "date"], ["Time", "time"]], btn: "Request booking" },
    info: ["12 Sample Street, Your City", "+91 98765 43210", "hello@urbanspice.example"],
    hours: [["Mon – Fri", "12:00 – 23:00"], ["Sat – Sun", "11:00 – 00:00"]], map: 1,
  },
  business: {
    name: "Northbridge Advisory", logo: "◆", hue: 222, ac: "#1d4ed8", bg: "#f5f8ff", fg: "#0f172a", card: "#ffffff", mu: "#55627a",
    hf: "'Space Grotesk',sans-serif", rs: "14px", rb: "10px",
    promo: "Free 30-minute intro call for new clients. Limited slots each month.",
    nav: [["Services", "services"], ["Why us", "why"], ["Process", "process"], ["Results", "results"], ["Pricing", "pricing"], ["FAQ", "faq"]],
    cta: ["Book a call", "contact"],
    hero: { kicker: "Strategy · Operations · Advisory", title: "Professional services, made simple.", sub: "We help growing companies plan clearly, run smoothly and scale without the chaos.", b1: ["Book a free call", "contact"], b2: ["Our services", "services"], art: ["📈", "🧭", "🤝"], badge: ["Free intro call", "30 minutes"], rating: "4.9 · 180 client reviews", points: ["No long contracts", "Senior advisors only", "Fixed-scope projects"] },
    stats: [["120+", "Companies advised"], ["94%", "Client retention"], ["8 yrs", "Average experience"], ["₹40Cr", "Savings delivered"]],
    secs: [
      { id: "logos", t: "logos", d: ["Northwind", "Acme Co.", "Globex", "Initech", "Umbra", "Vertex"] },
      { id: "services", t: "cards", ey: "What we do", title: "Services built around your goals", sub: "Pick one service or combine them into a single engagement.", d: [
        ["🎯", "Strategy", "Clear 12-month plans tied to revenue and margin goals."],
        ["⚙️", "Operations", "Processes, tools and KPIs that scale with your team."],
        ["🧠", "Advisory", "Hands-on guidance from a senior advisor, start to finish."],
        ["📊", "Finance & Planning", "Budgets, forecasting and board-ready reporting."],
        ["👥", "People & Hiring", "Org design, hiring plans and onboarding systems."],
        ["🚀", "Growth", "Go-to-market, pricing and channel experiments."],
      ], btn: "Enquire" },
      { id: "why", t: "split", rev: 1, ey: "Why Northbridge", title: "Advisors who have run companies", sub: "You work directly with senior people who have built, scaled and fixed businesses like yours.", e: "🏢", pts: ["Fixed scope and transparent pricing", "Weekly progress reviews with your team", "Playbooks you keep after we leave"], btn: ["Talk to an advisor", "contact"] },
      { id: "process", t: "steps", ey: "How it works", title: "A simple three-step process", d: [["Discover", "We listen first, review your numbers and map your goals."], ["Plan", "A clear scope, timeline and budget you can approve in a week."], ["Deliver", "Hands-on execution with regular reviews and a final handover."]] },
      { id: "results", t: "cards", ey: "Results", title: "Work that moves the numbers", d: [
        ["📦", "Logistics firm", "Cut delivery costs by 18% in two quarters.", "+18%", "Operations"],
        ["🛍️", "D2C brand", "Doubled repeat orders with a retention plan.", "2×", "Growth"],
        ["🏭", "Manufacturer", "Reduced working capital needs by ₹6Cr.", "₹6Cr", "Finance"],
      ] },
      { id: "team", t: "team", ey: "Our team", title: "Meet the advisors", d: [["👩‍💼", "Meera Kapoor", "Managing Partner", "Ex-COO, 15 years in operations."], ["👨‍💼", "Arjun Rao", "Strategy Lead", "Built three companies from zero."], ["👩‍💻", "Sana Ali", "Finance Advisor", "CFO for high-growth startups."], ["🧑‍💼", "Dev Patel", "Growth Advisor", "Scaled revenue 10× at two firms."]] },
      { id: "pricing", t: "plans", ey: "Pricing", title: "Engagements that fit your stage", d: [["Starter", "₹45,000", "/month", ["One focus area", "Monthly review", "Email support"], 0], ["Growth", "₹95,000", "/month", ["Up to three focus areas", "Weekly review", "Dedicated advisor"], 1], ["Enterprise", "Custom", "", ["Full leadership team", "On-site workshops", "Board support"], 0]], btn: "Get started" },
      { id: "faq", t: "faq", ey: "FAQ", title: "Common questions", d: [["How do we start?", "Send an enquiry and we'll reply within one working day with next steps."], ["Do you work with small teams?", "Yes. Scope and pricing are tailored to your size and stage."], ["How is pricing set?", "Per project or monthly, after a short scoping call. No hidden fees."], ["Can we cancel anytime?", "Monthly engagements can be paused or ended with 30 days' notice."]] },
    ],
    reviews: [["They turned a vague idea into a clear 90-day plan.", "Meera K.", "Founder, retail brand"], ["Calm, sharp and always on time. Highly recommended.", "Dev P.", "COO, logistics"], ["Our operations finally run without firefighting.", "Sana A.", "Director, manufacturing"]],
    band: ["Ready to grow with a clear plan?", "Book a free 30-minute call with a senior advisor."],
    form: { id: "contact", title: "Tell us about your business", sub: "Share a few details and we'll reply within one working day.", extra: [["Company size", ["Startup", "SME", "Enterprise"]], ["Interested in", ["Strategy", "Operations", "Advisory", "Finance & Planning", "People & Hiring", "Growth", "Starter", "Growth", "Enterprise"]]], btn: "Send enquiry" },
    info: ["4th Floor, Sample Tower, Your City", "+91 98765 00000", "team@northbridge.example"],
    hours: [["Mon – Fri", "9:30 – 18:30"], ["Sat", "By appointment"]],
  },
  p: {
    name: "Aria Studio", logo: "✺", hue: 265, ac: "#7c3aed", bg: "#faf9ff", fg: "#1b1530", card: "#ffffff", mu: "#625b78",
    hf: "'Space Grotesk',sans-serif", rs: "20px", rb: "999px",
    promo: "Now booking projects for next month. Replies within 24 hours.",
    nav: [["Work", "work"], ["About", "about"], ["Skills", "skills"], ["Experience", "exp"], ["Contact", "contact"]],
    cta: ["Hire me", "contact"],
    hero: { kicker: "Designer & developer · Remote", title: "Design that moves people.", sub: "Hi, I'm Aria. I design brands, posters and websites for small businesses and startups, and build them too.", b1: ["See my work", "work"], b2: ["Let's talk", "contact"], art: ["🎨", "✏️", "💻"], badge: ["Available", "From next month"], rating: "5.0 · 40 projects", points: ["Brand identity", "UI/UX", "React development"] },
    stats: [["40+", "Projects shipped"], ["6 yrs", "Designing"], ["25", "Happy clients"], ["24h", "Reply time"]],
    secs: [
      { id: "work", t: "projects", ey: "Selected work", title: "Projects I'm proud of", sub: "Click any project for the full story.", d: [
        ["Brand Refresh", "Branding", "Identity system for a neighbourhood café: logo, palette, packaging and signage.", "☕", "2026", "Brand design"],
        ["Event Posters", "Posters", "Campaign series for a live music night, printed and shared on social.", "🎶", "2026", "Poster design"],
        ["Booking App UI", "UI/UX", "Mobile interface concept for a salon booking app with a simple 3-tap flow.", "📱", "2025", "Product design"],
        ["Landing Page", "Web", "Conversion-focused landing page for a fitness studio, built in React.", "🖥️", "2025", "Design + code"],
        ["Cookbook Layout", "Print", "A 96-page recipe book with photography direction and layout.", "📖", "2025", "Editorial design"],
        ["Product Packaging", "Branding", "Label and box design for an organic tea startup.", "🍵", "2024", "Packaging"],
      ] },
      { id: "about", t: "split", ey: "About me", title: "Small studio, big attention to detail", sub: "I work with a handful of clients at a time so every project gets real care, from the first sketch to the final launch.", e: "👩‍🎨", pts: ["Design and development under one roof", "Clear process with weekly check-ins", "Files and source handed over, always"], btn: ["Start a project", "contact"] },
      { id: "skills", t: "skills", ey: "Skills", title: "What I do best", d: [["Branding & identity", 95], ["UI/UX design", 92], ["Poster & print", 90], ["React & front-end", 85], ["Motion & illustration", 78]] },
      { id: "services", t: "cards", ey: "Services", title: "How I can help", d: [["🎨", "Brand identity", "Logo, colours, type and a simple guideline."], ["🖼️", "Posters & social", "Eye-catching creatives for campaigns."], ["💻", "Websites", "Design and build, responsive and fast."]] },
      { id: "exp", t: "timeline", ey: "Experience", title: "Where I've worked", d: [["2024 – now", "Independent designer", "Aria Studio", "Branding, web and print for small businesses."], ["2021 – 2024", "Senior designer", "Bluepeak Agency", "Led brand and web projects for 20+ clients."], ["2019 – 2021", "UI designer", "Nimbus Labs", "Designed mobile apps for early-stage startups."]] },
    ],
    reviews: [["Aria understood our brand in one call.", "Café owner", "Brand Refresh"], ["Posters were ready before the deadline, and they were stunning.", "Event organiser", "Event Posters"], ["Clean UI, clean handoff, zero drama.", "Startup founder", "Booking App UI"]],
    band: ["Have a project in mind?", "Share a few details and get a reply within a day."],
    form: { id: "contact", title: "Start a project", sub: "Tell me about your idea, timeline and budget.", extra: [["Project type", ["Branding", "Website", "Posters", "UI/UX", "Other"]], ["Budget", ["Under ₹25k", "₹25k – ₹75k", "₹75k+"]]], btn: "Send enquiry" },
    info: ["Remote, worldwide", "+91 98765 11111", "hello@ariastudio.example"],
  },
  g: {
    name: "IronPulse Fitness", logo: "⚡", hue: 85, ac: "#c6ff00", bg: "#0b0b0c", fg: "#ffffff", card: "#17171a", mu: "#a4a4ad", dark: 1,
    hf: "'Space Grotesk',sans-serif", rs: "16px", rb: "10px",
    promo: "⚡ First week free for new members. No joining fee this month.",
    nav: [["Programs", "programs"], ["Schedule", "schedule"], ["Trainers", "trainers"], ["Plans", "plans"], ["BMI", "bmi"]],
    cta: ["Join now", "join"],
    hero: { kicker: "Gym · Classes · Personal training", title: "Train harder. Recover smarter.", sub: "Premium equipment, expert coaches and classes for every level, open from 5 AM to midnight.", b1: ["Start free week", "join"], b2: ["View programs", "programs"], art: ["🏋️", "🔥", "⏱️"], badge: ["Open", "5 AM – 12 AM"], rating: "4.7 · 900 members", points: ["Certified coaches", "24 classes a week", "Sauna & recovery"] },
    stats: [["900+", "Active members"], ["18", "Certified trainers"], ["40", "Classes every week"], ["12k", "Sq ft training floor"]],
    secs: [
      { id: "programs", t: "cards", ey: "Programs", title: "Find your training style", d: [
        ["🏋️", "Strength", "Barbell fundamentals and progressive overload.", "", "All levels"],
        ["⚡", "HIIT", "45-minute conditioning circuits that torch calories.", "", "Cardio"],
        ["🧘", "Yoga & Mobility", "Flexibility, breathing and recovery.", "", "Recovery"],
        ["🎯", "Personal Training", "One-on-one coaching plans built around you.", "", "1-on-1"],
        ["🥊", "Boxing Fit", "Pad work, bag drills and footwork basics.", "", "New"],
        ["🚴", "Spin", "High-energy indoor cycling to a playlist.", "", "Cardio"],
      ], btn: "Try a class" },
      { id: "schedule", t: "schedule", ey: "Class schedule", title: "This week's classes", d: [
        ["Mon", "6:30 AM", "Strength", "Coach Ravi", "6 spots"], ["Mon", "7:00 PM", "HIIT", "Coach Neha", "4 spots"],
        ["Tue", "7:00 AM", "HIIT", "Coach Neha", "8 spots"], ["Wed", "6:30 AM", "Yoga", "Coach Meera", "10 spots"],
        ["Thu", "7:00 PM", "Spin", "Coach Karan", "3 spots"], ["Fri", "6:00 PM", "Boxing Fit", "Coach Ravi", "7 spots"],
        ["Sat", "8:00 AM", "Strength", "Coach Ravi", "5 spots"], ["Sun", "9:00 AM", "Yoga", "Coach Meera", "12 spots"],
      ] },
      { id: "trainers", t: "team", ey: "Coaches", title: "Train with the best", d: [["🏋️‍♂️", "Ravi Sharma", "Head of strength", "Powerlifting coach, 10 years."], ["🤸‍♀️", "Neha Singh", "HIIT & conditioning", "Sports science graduate."], ["🧘‍♀️", "Meera Nair", "Yoga & mobility", "500-hour certified instructor."], ["🚴‍♂️", "Karan Mehta", "Spin & endurance", "Former national cyclist."]] },
      { id: "plans", t: "plans", ey: "Membership", title: "Simple plans. No lock-in.", d: [["Monthly", "₹1,500", "/month", ["Full gym access", "Locker & shower", "1 free assessment"], 0], ["Quarterly", "₹4,000", "/3 months", ["Everything in Monthly", "2 PT sessions", "All group classes"], 1], ["Annual", "₹12,000", "/year", ["Everything in Quarterly", "Nutrition plan", "Guest passes"], 0]], btn: "Choose plan" },
      { id: "bmi", t: "bmi", ey: "Quick check", title: "BMI calculator", sub: "A simple guide to where you are today. Our coaches can build the right plan from there." },
    ],
    reviews: [["Lost 9 kg in four months. The trainers actually care.", "Aman T.", "Member for 1 year"], ["The 6:30 AM strength class changed my routine.", "Priya N.", "Member for 8 months"], ["Clean gym, great equipment and no crowd.", "Joel D.", "Member for 2 years"]],
    band: ["Your first week is on us", "Walk in, train, and decide after. No contract."],
    form: { id: "join", title: "Membership enquiry", sub: "Leave your details and we'll arrange your free week.", extra: [["Plan", ["Monthly", "Quarterly", "Annual"]], ["Goal", ["Lose weight", "Build muscle", "Stay active", "Sports performance"]]], btn: "Enquire now" },
    info: ["88 Fitness Lane, Your City", "+91 98765 22222", "join@ironpulse.example"],
    hours: [["Mon – Sat", "5:00 AM – 12:00 AM"], ["Sunday", "6:00 AM – 10:00 PM"]], map: 1,
  },
  s: {
    name: "Glow & Co. Salon", logo: "✿", hue: 340, ac: "#d6336c", bg: "#fff6f3", fg: "#3a1f26", card: "#ffffff", mu: "#7d5d66",
    hf: "'Playfair Display',Georgia,serif", rs: "20px", rb: "999px",
    promo: "💍 Bridal trial bookings now open for the wedding season",
    nav: [["Services", "services"], ["Gallery", "gallery"], ["Stylists", "team"], ["Packages", "packages"], ["Book", "book"]],
    cta: ["Book now", "book"],
    hero: { kicker: "Hair · Skin · Makeup · Nails", title: "Beauty, beautifully done.", sub: "A calm, hygienic salon with expert stylists, premium products and appointments that start on time.", b1: ["Book appointment", "book"], b2: ["See services", "services"], art: ["💇‍♀️", "💅", "✨"], badge: ["Next slot", "Today, 4:30 PM"], rating: "4.9 · 1,100 reviews", points: ["Premium products", "Certified stylists", "Hygiene first"] },
    stats: [["1,100+", "Happy clients"], ["12", "Expert stylists"], ["9 yrs", "In the city"], ["4.9★", "Average rating"]],
    secs: [
      { id: "services", t: "pricelist", ey: "Services & pricing", title: "Treat yourself", sub: "Choose a service to book it in one tap.", d: [
        ["Hair", "Haircut & Style", "₹600", "45 min"], ["Hair", "Hair Colour", "₹2,500", "2 hrs"], ["Hair", "Keratin Treatment", "₹5,500", "3 hrs"], ["Hair", "Hair Spa", "₹1,400", "1 hr"],
        ["Skin", "Facial", "₹1,200", "60 min"], ["Skin", "Clean-up", "₹800", "40 min"], ["Skin", "De-tan Treatment", "₹1,000", "45 min"],
        ["Makeup", "Bridal Makeup", "₹8,000", "Trial + day"], ["Makeup", "Party Makeup", "₹2,500", "75 min"],
        ["Nails", "Manicure", "₹700", "40 min"], ["Nails", "Gel Extensions", "₹2,200", "90 min"],
      ] },
      { id: "gallery", t: "tiles", ey: "Gallery", title: "Our latest looks", d: [["🎨", "Colour"], ["👰", "Bridal"], ["✂️", "Cut"], ["💅", "Nails"], ["🧖‍♀️", "Spa"], ["💄", "Style"]] },
      { id: "team", t: "team", ey: "Our stylists", title: "Meet the team", d: [["💇‍♀️", "Anita", "Creative director", "Colour specialist, 12 years."], ["💄", "Ritika", "Makeup artist", "Bridal and editorial looks."], ["💅", "Zoya", "Nail artist", "Gel and nail art expert."], ["🧖‍♀️", "Pooja", "Skin therapist", "Advanced facials and treatments."]] },
      { id: "packages", t: "plans", ey: "Packages", title: "Save with a combo", d: [["Glow Up", "₹1,999", "", ["Haircut & style", "Facial", "Manicure"], 0], ["Bridal Prep", "₹14,999", "", ["Bridal makeup", "Hair styling", "Pre-bridal facial", "Trial session"], 1], ["Pamper Day", "₹3,499", "", ["Hair spa", "Facial", "Manicure & pedicure"], 0]], btn: "Book package" },
    ],
    reviews: [["My bridal look was exactly what I imagined.", "Ishita V.", "Bridal client"], ["Best colour work I've had, and no damage.", "Neha G.", "Regular client"], ["Relaxing, hygienic and on time. Love it.", "Pooja L.", "Spa day"]],
    band: ["Ready for a fresh look?", "Pick a slot and we'll take care of the rest."],
    form: { id: "book", title: "Book an appointment", sub: "Choose a service and a date. We'll confirm by call or WhatsApp.", extra: [["Service", ["Haircut & Style", "Hair Colour", "Keratin Treatment", "Hair Spa", "Facial", "Clean-up", "De-tan Treatment", "Bridal Makeup", "Party Makeup", "Manicure", "Gel Extensions", "Glow Up", "Bridal Prep", "Pamper Day"]], ["Preferred date", "date"], ["Preferred time", "time"]], btn: "Request appointment" },
    info: ["21 Rose Avenue, Your City", "+91 98765 33333", "book@glowandco.example"],
    hours: [["Mon – Sat", "10:00 AM – 8:00 PM"], ["Sunday", "11:00 AM – 6:00 PM"]], map: 1,
  },
  c: {
    name: "THREAD & CO.", logo: "T", hue: 30, ac: "#111111", bg: "#f6f1e9", fg: "#111111", card: "#ffffff", mu: "#6d665c",
    hf: "'Space Grotesk',sans-serif", rs: "6px", rb: "4px", shop: 1,
    promo: "Free shipping on orders above ₹1,999 · Easy 7-day returns",
    nav: [["Shop", "shop"], ["Collections", "cats"], ["Our promise", "perks"], ["Reviews", "reviews"], ["Support", "support"]],
    cta: ["Shop now", "shop"],
    hero: { layout: "center", kicker: "Autumn / Winter 2026", title: "The Autumn Drop.", sub: "Relaxed tailoring, soft linen and everyday essentials in earthy tones. New pieces every Friday.", b1: ["Shop the drop", "shop"], b2: ["Browse collections", "cats"], art: ["👔", "👗", "👜", "👖"], rating: "4.6 · 3,400 orders" },
    stats: [["3,400+", "Orders shipped"], ["7 days", "Easy returns"], ["100%", "Cotton & linen"], ["48 hr", "Fast delivery"]],
    secs: [
      { id: "cats", t: "categories", ey: "Collections", title: "Shop by category", d: [["👔", "Men", "2 styles"], ["👗", "Women", "2 styles"], ["👜", "Accessories", "2 styles"]] },
      { id: "shop", t: "shop", ey: "New arrivals", title: "The latest pieces", d: [
        ["Oxford Shirt", "Men", 1799, 2199, 30, "👔", "New"], ["Chino Pants", "Men", 2199, 0, 40, "👖", ""],
        ["Linen Dress", "Women", 2799, 3299, 350, "👗", "Sale"], ["Wrap Top", "Women", 1499, 0, 10, "👚", "New"],
        ["Leather Belt", "Accessories", 999, 0, 25, "🧵", ""], ["Canvas Tote", "Accessories", 799, 999, 45, "👜", "Sale"],
      ] },
      { id: "perks", t: "cards", ey: "Our promise", title: "Made well, delivered fast", d: [["🚚", "Free shipping", "On every order above ₹1,999, delivered in 2 to 4 days."], ["↩️", "Easy returns", "Changed your mind? Return within 7 days, no questions."], ["🧵", "Honest fabrics", "Cotton, linen and wool. No cheap blends."], ["🔒", "Secure checkout", "UPI, cards and cash on delivery."]] },
    ],
    reviews: [["The fit is perfect and the fabric feels premium.", "Rahul B.", "Oxford Shirt"], ["Delivery in two days. Loved the linen dress.", "Sneha M.", "Linen Dress"], ["Returns were painless. Will order again.", "Arjun K.", "Chino Pants"]],
    band: ["Join the drop", "New pieces every Friday. Be first in line."],
    form: { id: "support", title: "Customer support", sub: "Questions about an order, sizing or returns? We reply within a day.", extra: [["Topic", ["Order status", "Returns & exchange", "Sizing help", "Other"]], ["Order number", "text"]], btn: "Send message" },
    info: ["Studio 5, Sample Mills, Your City", "+91 98765 44444", "care@threadandco.example"],
    hours: [["Support", "Mon – Sat, 10:00 – 19:00"]],
  },
};
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
const DS_CSS = `
.ds{background:var(--bg);color:var(--fg);font:16px/1.6 Inter,system-ui,sans-serif;text-align:left;position:relative}
.ds *{box-sizing:border-box}
.ds a{color:inherit;text-decoration:none}
.ds h1,.ds h2,.ds h3,.ds h4{font-family:var(--hf);letter-spacing:-.02em;line-height:1.08;margin:0;font-weight:700}
.ds p,.ds ul,.ds figure,.ds blockquote{margin:0;padding:0}.ds ul{list-style:none}
.ds button{font-family:inherit;cursor:pointer}
.ds-w{max-width:1120px;margin:0 auto;padding:0 28px}
.ds-sec{padding:76px 0}.ds-sec.sm{padding:28px 0}.ds-alt{background:var(--soft)}
.ds-ey{color:var(--ac);font-size:12px;font-weight:600;letter-spacing:.2em;text-transform:uppercase}
.ds-h2{font-size:clamp(28px,4vw,42px);margin:8px 0 10px}
.ds-sub{color:var(--mu);max-width:580px}
.ds-head{margin-bottom:34px}.ds-center{text-align:center}.ds-center .ds-sub{margin:0 auto}
.ds-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:var(--rb);background:var(--ac);color:var(--onac);border:1px solid var(--ac);font-size:15px;font-weight:600;transition:transform .25s,box-shadow .25s,filter .25s}
.ds-btn:hover{transform:translateY(-2px);filter:brightness(1.08);box-shadow:0 10px 26px var(--ac3)}
.ds-btn.o{background:transparent;color:var(--fg);border-color:var(--bd2)}.ds-btn.o:hover{border-color:var(--ac);color:var(--ac);box-shadow:none}
.ds-btn.sm{padding:8px 16px;font-size:13px}
.ds-top{background:var(--ac);color:var(--onac);text-align:center;font-size:13px;font-weight:500;padding:8px 14px}
.ds-hdr{background:var(--bg);border-bottom:1px solid var(--bd);position:relative;z-index:4}
.ds-hdr .ds-w{display:flex;align-items:center;justify-content:space-between;gap:16px;padding-top:14px;padding-bottom:14px}
.ds-logo{display:flex;align-items:center;gap:10px;font:700 19px var(--hf);cursor:pointer}
.ds-mark{width:36px;height:36px;border-radius:var(--rs);display:grid;place-items:center;background:var(--ac);color:var(--onac);font-size:18px}
.ds-nav{display:flex;gap:22px;align-items:center;font-size:14px;font-weight:500}
.ds-nav a{cursor:pointer;opacity:.78;transition:.2s}.ds-nav a:hover{opacity:1;color:var(--ac)}
.ds-burger{display:none;background:none;border:1px solid var(--bd2);color:var(--fg);border-radius:8px;padding:6px 10px}
.ds-drop{display:none}
.ds-hero{position:relative;overflow:hidden;padding:68px 0 56px;background:radial-gradient(circle at 82% 18%,var(--ac3),transparent 55%)}
.ds-hg{display:grid;grid-template-columns:1.05fr .95fr;gap:48px;align-items:center}
.ds-hero h1{font-size:clamp(38px,5.6vw,66px);margin:16px 0}
.ds-hero p.lead{color:var(--mu);font-size:18px;max-width:500px}
.ds-pill{display:inline-flex;gap:8px;align-items:center;padding:6px 14px;border-radius:99px;background:var(--soft);border:1px solid var(--bd);font-size:13px}
.ds-stars{color:#f5a623;letter-spacing:2px}
.ds-row{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}
.ds-ticks{display:flex;gap:20px;flex-wrap:wrap;margin-top:26px;font-size:13px;color:var(--mu)}.ds-ticks span:before{content:"✓ ";color:var(--ac);font-weight:700}
.ds-art{position:relative;aspect-ratio:1;max-width:430px;margin-left:auto;width:100%}
.ds-blob{position:absolute;inset:0;border-radius:42% 58% 55% 45%;background:linear-gradient(135deg,var(--ac),var(--ac3))}
.ds-plate{position:absolute;inset:12%;border-radius:50%;background:var(--card);box-shadow:0 30px 70px #0005;display:grid;place-items:center;font-size:150px;line-height:1}
.ds-fl{position:absolute;border-radius:22px;background:var(--card);box-shadow:0 14px 40px #0004;display:grid;place-items:center;font-size:42px;animation:dsF 6s ease-in-out infinite}
@keyframes dsF{50%{transform:translateY(-9px)}}
.ds-badge{position:absolute;left:-3%;bottom:8%;background:var(--card);color:var(--fg);border-radius:16px;padding:12px 18px;box-shadow:0 14px 40px #0004}.ds-badge small{display:block;font-size:12px;opacity:.6}
.ds-quick{display:grid;grid-template-columns:repeat(3,1fr) auto;gap:14px;align-items:end;margin-top:44px;padding:18px 20px;background:var(--card);border:1px solid var(--bd);border-radius:var(--rs);box-shadow:0 20px 50px #0003}
.ds-hc{text-align:center;padding:84px 0 64px}.ds-hc p.lead{margin:0 auto}.ds-hc .ds-row,.ds-hc .ds-ticks{justify-content:center}
.ds-floats{display:flex;justify-content:center;gap:16px;margin-top:44px;flex-wrap:wrap}
.ds-floats div{width:96px;height:120px;border-radius:var(--rs);background:var(--card);box-shadow:0 14px 40px #0002;display:grid;place-items:center;font-size:48px;animation:dsF 6s ease-in-out infinite}
.ds-floats div:nth-child(even){animation-delay:-3s;margin-top:22px}
.ds-stats{background:var(--soft);border-block:1px solid var(--bd)}
.ds-stats .ds-w{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;text-align:center;padding-top:26px;padding-bottom:26px}
.ds-stats b{display:block;font:700 30px var(--hf);color:var(--ac)}.ds-stats span{font-size:13px;color:var(--mu)}
.ds-logos{display:flex;gap:34px;align-items:center;justify-content:center;flex-wrap:wrap;color:var(--mu)}.ds-logos b{font:700 20px var(--hf);opacity:.55;letter-spacing:.02em}.ds-logos span{font-size:12px;letter-spacing:.2em;text-transform:uppercase}
.ds-g{display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
.ds-card{background:var(--card);border:1px solid var(--bd);border-radius:var(--rs);padding:24px;position:relative;transition:transform .3s,box-shadow .3s,border-color .3s}
.ds-lift:hover{transform:translateY(-6px);border-color:var(--ac);box-shadow:0 18px 44px var(--ac3)}
.ds-ic{width:50px;height:50px;border-radius:var(--rs);display:grid;place-items:center;font-size:24px;background:var(--ac2);margin-bottom:14px}
.ds-card h3{font-size:20px;margin-bottom:6px}.ds-card p{color:var(--mu);font-size:15px}
.ds-card .ds-btn{margin-top:16px}
.ds-tag{position:absolute;right:16px;top:16px;font-size:11px;font-weight:700;padding:3px 10px;border-radius:99px;background:var(--ac);color:var(--onac)}
.ds-price{font:700 22px var(--hf);color:var(--ac);margin-top:12px}.ds-price small{font:400 13px Inter;color:var(--mu);margin-left:4px}
.ds-split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center}.ds-split.rev>:first-child{order:2}
.ds-pts{display:grid;gap:10px;margin:20px 0 26px}.ds-pts li:before{content:"✓";color:var(--ac);font-weight:700;margin-right:10px}
.ds-pic{position:relative;display:grid;place-items:center;overflow:hidden;color:#fff}
.ds-pic:after{content:"";position:absolute;inset:0;background:radial-gradient(circle at 28% 18%,#ffffff45,transparent 55%)}
.ds-pic span{position:relative;z-index:0;filter:drop-shadow(0 8px 14px #0004)}.ds-pic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:1}
.ds-steps .ds-card b{font:700 40px var(--hf);color:var(--ac);display:block}
.ds-chips{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:22px}
.ds-chip{border:1px solid var(--bd2);background:transparent;color:var(--fg);border-radius:99px;padding:8px 18px;font-size:14px;transition:.2s}
.ds-chip:hover{border-color:var(--ac)}.ds-chip.on{background:var(--ac);color:var(--onac);border-color:var(--ac)}
.ds-menu{display:grid;grid-template-columns:1fr 1fr;gap:14px}
.ds-mi{display:grid;grid-template-columns:68px 1fr auto;gap:14px;align-items:center;padding:12px;background:var(--card);border:1px solid var(--bd);border-radius:var(--rs);transition:.25s}
.ds-mi:hover{border-color:var(--ac);transform:translateY(-2px)}
.ds-mi b{display:block;font-size:16px}.ds-mi small{color:var(--mu);font-size:13px;display:block;line-height:1.4}
.ds-mi .pr{font:700 17px var(--hf);color:var(--ac);text-align:right;margin-bottom:6px}
.ds-veg{display:inline-block;width:12px;height:12px;border:1.5px solid #2ca85a;position:relative;margin-left:8px;vertical-align:middle}.ds-veg:after{content:"";position:absolute;inset:2px;border-radius:50%;background:#2ca85a}
.ds-veg.nv{border-color:#d93a3a}.ds-veg.nv:after{background:#d93a3a}
.ds-badge2{font-size:10px;font-weight:700;background:var(--ac);color:var(--onac);padding:2px 8px;border-radius:99px;margin-left:8px;vertical-align:middle}
.ds-gal{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:150px;gap:14px}
.ds-gi{position:relative;border-radius:var(--rs);overflow:hidden}.ds-gi span.cap{position:absolute;left:12px;bottom:10px;z-index:2;font-size:13px;font-weight:600;color:#fff;text-shadow:0 2px 8px #0008}
.ds-gi.g0{grid-column:span 2;grid-row:span 2}.ds-gi.g3{grid-column:span 2}
.ds-team .ds-card{padding:0;overflow:hidden;text-align:center}.ds-team .body{padding:16px 18px 20px}.ds-team small{color:var(--ac);font-weight:600;font-size:12px;letter-spacing:.08em;text-transform:uppercase}.ds-team p{margin-top:6px}
.ds-sch{display:grid;gap:10px}
.ds-sr{display:grid;grid-template-columns:70px 100px 1fr 1fr 90px auto;gap:14px;align-items:center;padding:14px 18px;background:var(--card);border:1px solid var(--bd);border-radius:var(--rs)}
.ds-sr b{font-family:var(--hf)}.ds-sr span.m{color:var(--mu);font-size:14px}.ds-sr .day{color:var(--ac);font-weight:700}
.ds-plan{display:flex;flex-direction:column}.ds-plan ul{display:grid;gap:8px;margin:16px 0 4px;color:var(--mu);font-size:15px;flex:1}.ds-plan li:before{content:"✓";color:var(--ac);font-weight:700;margin-right:8px}
.ds-plan.pop{border:2px solid var(--ac);box-shadow:0 20px 50px var(--ac3);transform:scale(1.03)}
.ds-plan .ds-price.big{font-size:38px;margin:10px 0 0}
.ds-bmi{display:grid;grid-template-columns:1fr 1fr;gap:28px;align-items:center}
.ds-res{padding:28px;border-radius:var(--rs);background:var(--card);border:1px solid var(--bd);text-align:center}.ds-res b{font:700 54px var(--hf);color:var(--ac);display:block}
.ds-pl{display:grid;gap:10px}
.ds-pr{display:grid;grid-template-columns:1fr auto auto auto;gap:18px;align-items:center;padding:16px 20px;background:var(--card);border:1px solid var(--bd);border-radius:var(--rs);transition:.25s}.ds-pr:hover{border-color:var(--ac)}
.ds-pr small{color:var(--mu)}.ds-pr .p{font:700 18px var(--hf);color:var(--ac)}
.ds-prj{cursor:pointer;padding:0;overflow:hidden}.ds-prj .body{padding:16px 20px 20px}.ds-prj small{color:var(--ac);font-weight:600;font-size:12px;letter-spacing:.1em;text-transform:uppercase}.ds-prj h3{margin:4px 0 6px}
.ds-sk{display:grid;gap:18px;max-width:720px}.ds-sk div.bar{height:10px;border-radius:99px;background:var(--bd);overflow:hidden}.ds-sk i{display:block;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--ac),var(--ac3))}
.ds-sk .l{display:flex;justify-content:space-between;font-weight:600;margin-bottom:8px}
.ds-tl{display:grid;gap:0;border-left:2px solid var(--bd2);margin-left:8px}.ds-tl>div{position:relative;padding:0 0 30px 28px}.ds-tl>div:before{content:"";position:absolute;left:-8px;top:6px;width:14px;height:14px;border-radius:50%;background:var(--ac)}
.ds-tl small{color:var(--ac);font-weight:700}.ds-tl h3{margin:2px 0}.ds-tl p{color:var(--mu)}
.ds-faq{max-width:760px}.ds-faq>div{border-bottom:1px solid var(--bd)}.ds-faq button{all:unset;box-sizing:border-box;cursor:pointer;display:flex;justify-content:space-between;width:100%;padding:18px 0;font-weight:600}.ds-faq p{color:var(--mu);padding:0 0 18px}
.ds-cat{display:grid;place-items:center;gap:6px;aspect-ratio:4/3;border-radius:var(--rs);background:var(--card);border:1px solid var(--bd);cursor:pointer;transition:.3s;text-align:center}.ds-cat:hover{transform:translateY(-6px);border-color:var(--ac)}.ds-cat span{font-size:56px}.ds-cat b{font:700 20px var(--hf)}.ds-cat small{color:var(--mu)}
.ds-tools{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center}
.ds select,.ds input,.ds textarea{width:100%;background:var(--card);color:var(--fg);border:1px solid var(--bd2);border-radius:var(--rs);padding:11px 14px;font:inherit;font-size:15px}
.ds select:focus,.ds input:focus,.ds textarea:focus{outline:2px solid var(--ac);outline-offset:0;border-color:var(--ac)}
.ds label{display:grid;gap:6px;font-size:13px;font-weight:500;color:var(--fg)}
.ds-sort{width:auto!important;min-width:170px}
.ds-prod{padding:0;overflow:hidden}.ds-prod .body{padding:14px 16px 18px}.ds-prod .nm{font-weight:600}.ds-prod .old{color:var(--mu);text-decoration:line-through;font-size:13px;margin-left:6px}
.ds-prod .heart{position:absolute;right:10px;top:10px;z-index:3;width:34px;height:34px;border-radius:50%;border:0;background:#fff;color:#d6336c;font-size:17px;box-shadow:0 4px 14px #0003}
.ds-prod .tg{position:absolute;left:10px;top:10px;z-index:3;background:#111;color:#fff;font-size:11px;padding:3px 10px;border-radius:99px;font-weight:600}.ds-prod .tg.sale{background:#d93a3a}
.ds-sz{display:flex;gap:6px;margin:8px 0 12px}.ds-sz span{font-size:11px;border:1px solid var(--bd2);border-radius:4px;padding:1px 7px;color:var(--mu)}
.ds-rev blockquote{margin:12px 0 18px;color:var(--fg);opacity:.88}.ds-rev figcaption{display:flex;align-items:center;gap:12px;font-size:14px}.ds-rev small{display:block;color:var(--mu)}
.ds-av{width:38px;height:38px;border-radius:50%;background:var(--ac);color:var(--onac);display:grid;place-items:center;font-weight:700}
.ds-band{background:var(--ac);color:var(--onac);text-align:center;padding:64px 0}.ds-band h2{font-size:clamp(28px,4vw,40px)}.ds-band p{opacity:.85;margin:10px 0 24px}
.ds-band .ds-btn{background:var(--onac);color:var(--ac);border-color:var(--onac)}
.ds-two{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start}
.ds-info{display:grid;gap:10px;margin:22px 0}.ds-hours{display:grid;gap:8px;max-width:360px}.ds-hours div{display:flex;justify-content:space-between;border-bottom:1px dashed var(--bd2);padding-bottom:6px}
.ds-map{margin-top:22px;height:190px;border-radius:var(--rs);position:relative;overflow:hidden;border:1px solid var(--bd);background:linear-gradient(var(--bd) 1px,transparent 1px) 0 0/34px 34px,linear-gradient(90deg,var(--bd) 1px,transparent 1px) 0 0/34px 34px,var(--card)}
.ds-map i{position:absolute;left:50%;top:42%;transform:translate(-50%,-50%);font-size:36px}.ds-map span{position:absolute;left:12px;bottom:10px;font-size:12px;background:var(--bg);padding:4px 10px;border-radius:99px;border:1px solid var(--bd)}
.ds-form{display:grid;gap:14px;background:var(--card);border:1px solid var(--bd);border-radius:var(--rs);padding:26px}
.ds-form h3{font-size:22px;margin-bottom:2px}
.ds-msg{position:fixed;left:50%;bottom:24px;transform:translateX(-50%);z-index:30;background:var(--fg);color:var(--bg);padding:12px 20px;border-radius:99px;font-size:14px;font-weight:500;box-shadow:0 14px 40px #0006;max-width:90%;text-align:center}
.ds-foot{background:var(--soft);border-top:1px solid var(--bd);padding:54px 0 24px;font-size:14px}
.ds-fg{display:grid;grid-template-columns:1.6fr 1fr 1.2fr 1.4fr;gap:34px}.ds-fg h4{font-size:15px;margin-bottom:12px}.ds-fg ul{display:grid;gap:8px;color:var(--mu)}.ds-fg li{cursor:pointer}.ds-fg li:hover{color:var(--ac)}
.ds-soc{display:flex;gap:8px;margin-top:14px}.ds-soc span{width:34px;height:34px;border-radius:50%;border:1px solid var(--bd2);display:grid;place-items:center;font-size:11px;font-weight:700}
.ds-nl{display:flex;gap:8px;margin-top:10px}.ds-copy{margin-top:34px;padding-top:18px;border-top:1px solid var(--bd);text-align:center;color:var(--mu);font-size:13px}
.ds-cart{position:fixed;right:0;top:0;bottom:0;width:min(360px,100%);background:var(--card);color:var(--fg);z-index:20;box-shadow:-20px 0 60px #0005;padding:22px;display:flex;flex-direction:column;gap:12px;overflow:auto}
.ds-ci{display:flex;justify-content:space-between;gap:10px;padding:12px 0;border-bottom:1px solid var(--bd);font-size:14px;align-items:center}
.ds-lb{position:fixed;inset:0;z-index:25;background:#000b;display:grid;place-items:center;padding:20px}
.ds-lbc{background:var(--bg);border-radius:var(--rs);max-width:820px;width:100%;max-height:90vh;overflow:auto;display:grid;grid-template-columns:1fr 1fr}
.ds-lbc .t{padding:30px;display:grid;gap:12px;align-content:center}.ds-lbc dl{display:grid;grid-template-columns:auto 1fr;gap:6px 16px;margin:0;color:var(--mu);font-size:14px}.ds-lbc dd{margin:0;color:var(--fg)}
.ds.nr .ds-w{padding:0 18px}.ds.nr .ds-sec{padding:52px 0}
.ds.nr .ds-nav .lk{display:none}.ds.nr .ds-burger{display:block}.ds.nr .ds-drop{display:grid;gap:4px;padding:6px 18px 14px;border-top:1px solid var(--bd);background:var(--bg)}.ds.nr .ds-drop a{padding:10px 0;border-bottom:1px solid var(--bd)}
.ds.nr .ds-hg,.ds.nr .ds-split,.ds.nr .ds-two,.ds.nr .ds-bmi,.ds.nr .ds-lbc{grid-template-columns:1fr}.ds.nr .ds-split.rev>:first-child{order:0}
.ds.nr .ds-art{margin:0 auto;max-width:300px}.ds.nr .ds-plate{font-size:100px}.ds.nr .ds-hero{padding:44px 0 40px}
.ds.nr .ds-quick{grid-template-columns:1fr}.ds.nr .ds-stats .ds-w{grid-template-columns:repeat(2,1fr)}
.ds.nr .ds-menu{grid-template-columns:1fr}.ds.nr .ds-gal{grid-template-columns:repeat(2,1fr)}.ds.nr .ds-gi.g0,.ds.nr .ds-gi.g3{grid-column:span 2}
.ds.nr .ds-sr{grid-template-columns:50px 1fr auto;row-gap:2px}.ds.nr .ds-sr .hm{display:none}
.ds.nr .ds-pr{grid-template-columns:1fr auto}.ds.nr .ds-pr small{display:none}
.ds.nr .ds-fg{grid-template-columns:1fr 1fr}.ds.nr .ds-plan.pop{transform:none}.ds.nr .ds-floats div{width:70px;height:90px;font-size:34px}
@media(prefers-reduced-motion:reduce){.ds *{animation:none!important}}
`;

const Pic = ({ emoji, hue = 340, size = 64, src, style, round }) => (
  <div className="ds-pic" style={{ background: `linear-gradient(145deg,hsl(${hue},64%,58%),hsl(${(hue + 42) % 360},70%,28%))`, borderRadius: round ? "50%" : undefined, ...style }}>
    <span style={{ fontSize: size }}>{emoji}</span>
    {PHOTOS && src && <img src={src} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} />}
  </div>
);
const Stars = () => <span className="ds-stars">★★★★★</span>;
const inr = (v) => "₹" + v.toLocaleString("en-IN");

function Site({ c }) {
  const root = useRef(null);
  const [nr, setNr] = useState(false);
  const [f, setF] = useState("All");
  const [day, setDay] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [cart, setCart] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState("");
  const [open, setOpen] = useState(-1);
  const [liked, setLiked] = useState({});
  const [pick, setPick] = useState(null);
  const [pre, setPre] = useState("");
  const [menu, setMenu] = useState(false);
  const [bmi, setBmi] = useState({ h: "", w: "" });
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const o = new ResizeObserver(([e]) => setNr(e.contentRect.width < 760));
    o.observe(el);
    return () => o.disconnect();
  }, []);
  const say = (t) => {
    setToast(t);
    setTimeout(() => setToast(""), 3000);
  };
  const jump = (id) => {
    setMenu(false);
    root.current?.querySelector(`[data-s="${id}"]`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const add = (p) => {
    setCart((cs) => (cs.some((x) => x.t === p.t) ? cs.map((x) => (x.t === p.t ? { ...x, q: x.q + 1 } : x)) : [...cs, { ...p, q: 1 }]));
    say(p.t + " added to cart");
  };
  const n = cart.reduce((a, x) => a + x.q, 0);
  const total = cart.reduce((a, x) => a + x.p * x.q, 0);
  const style = {
    "--ac": c.ac, "--ac2": c.ac + "1f", "--ac3": c.ac + "44", "--onac": c.dark ? "#000000" : "#ffffff",
    "--bg": c.bg, "--fg": c.fg, "--card": c.card, "--mu": c.mu, "--hf": c.hf, "--rs": c.rs, "--rb": c.rb,
    "--bd": c.dark ? "#ffffff1f" : "#00000014", "--bd2": c.dark ? "#ffffff40" : "#00000030", "--soft": c.dark ? "#ffffff0a" : "#00000007",
  };
  const Hd = (s) => (
    <div className={"ds-head" + (s.center ? " ds-center" : "")}>
      <div className="ds-ey">{s.ey}</div>
      <h2 className="ds-h2">{s.title}</h2>
      {s.sub && <p className="ds-sub">{s.sub}</p>}
    </div>
  );
  const chips = (list, cur, set) => (
    <div className="ds-chips">
      {list.map((x) => (
        <button key={x} className={"ds-chip" + (cur === x ? " on" : "")} onClick={() => set(x)}>{x}</button>
      ))}
    </div>
  );
  const sec = (s) => {
    const k = s.id;
    switch (s.t) {
      case "logos":
        return (
          <div className="ds-sec sm" key={k}><div className="ds-w"><div className="ds-logos"><span>Trusted by</span>{s.d.map((x) => <b key={x}>{x}</b>)}</div></div></div>
        );
      case "cards":
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-g">{s.d.map(([e, t, d, p, tag]) => (
              <div className="ds-card ds-lift" key={t}>
                {tag && <span className="ds-tag">{tag}</span>}
                <div className="ds-ic">{e}</div><h3>{t}</h3><p>{d}</p>
                {p && <div className="ds-price">{p}</div>}
                {s.btn && <button className="ds-btn sm" onClick={() => { setPre(t); jump(c.form.id); }}>{s.btn}</button>}
              </div>
            ))}</div></div></div>
        );
      case "split":
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w ds-split">
            <Pic emoji={s.e} hue={c.hue} size={130} src={`/assets/demo/${k}.jpg`} style={{ aspectRatio: "4/3", borderRadius: c.rs, boxShadow: "0 24px 60px #0003" }} />
            <div>{Hd(s)}<ul className="ds-pts">{s.pts.map((p) => <li key={p}>{p}</li>)}</ul>
              {s.btn && <button className="ds-btn" onClick={() => jump(s.btn[1])}>{s.btn[0]}</button>}</div>
          </div></div>
        );
      case "steps":
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-g ds-steps">{s.d.map(([t, d], i) => (<div className="ds-card" key={t}><b>0{i + 1}</b><h3>{t}</h3><p>{d}</p></div>))}</div></div></div>
        );
      case "menu": {
        const cats = ["All", ...new Set(s.d.map((x) => x[1]))];
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}{chips(cats, f, setF)}
            <div className="ds-menu">{s.d.filter((x) => f === "All" || x[1] === f).map(([t, , p, d, e, veg, sp, b], i) => (
              <div className="ds-mi" key={t}>
                <Pic emoji={e} hue={c.hue + i * 14} size={34} style={{ width: 68, height: 68, borderRadius: c.rs }} />
                <div><b>{t}<span className={"ds-veg" + (veg ? "" : " nv")} title={veg ? "Vegetarian" : "Non-vegetarian"} />{b && <span className="ds-badge2">{b}</span>}</b>
                  <small>{d}</small>{sp > 0 && <small>{"🌶️".repeat(sp)}</small>}</div>
                <div><div className="pr">{p}</div><button className="ds-btn sm" onClick={() => say(t + " added to your order")}>Add</button></div>
              </div>
            ))}</div></div></div>
        );
      }
      case "tiles":
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-gal">{s.d.map(([e, t], i) => (
              <div className={"ds-gi g" + (i % 6)} key={t}><Pic emoji={e} hue={c.hue + i * 24} size={58} src={`/assets/demo/${k}-${i + 1}.jpg`} style={{ position: "absolute", inset: 0 }} /><span className="cap">{t}</span></div>
            ))}</div></div></div>
        );
      case "team":
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-g ds-team">{s.d.map(([e, nm, role, bio], i) => (
              <div className="ds-card ds-lift" key={nm}>
                <Pic emoji={e} hue={c.hue + i * 30} size={70} src={`/assets/demo/${k}-${i + 1}.jpg`} style={{ aspectRatio: "1/1", borderRadius: 0 }} />
                <div className="body"><h3>{nm}</h3><small>{role}</small><p>{bio}</p></div>
              </div>
            ))}</div></div></div>
        );
      case "schedule": {
        const days = ["All", ...new Set(s.d.map((x) => x[0]))];
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}{chips(days, day, setDay)}
            <div className="ds-sch">{s.d.filter((x) => day === "All" || x[0] === day).map(([d, t, cl, co, sp]) => (
              <div className="ds-sr" key={d + t}><span className="day">{d}</span><span className="m">{t}</span><b>{cl}</b><span className="m hm">{co}</span><span className="m hm">{sp}</span>
                <button className="ds-btn sm" onClick={() => say(cl + " on " + d + " at " + t + " booked (demo)")}>Book</button></div>
            ))}</div></div></div>
        );
      }
      case "plans":
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-g">{s.d.map(([nm, pr, per, fe, pop]) => (
              <div className={"ds-card ds-plan" + (pop ? " pop" : "")} key={nm}>
                {pop && <span className="ds-tag">Most popular</span>}
                <h3>{nm}</h3><div className="ds-price big">{pr}<small>{per}</small></div>
                <ul>{fe.map((x) => <li key={x}>{x}</li>)}</ul>
                <button className={"ds-btn" + (pop ? "" : " o")} onClick={() => { setPre(nm); jump(c.form.id); }}>{s.btn || "Choose"}</button>
              </div>
            ))}</div></div></div>
        );
      case "bmi": {
        const v = bmi.h && bmi.w ? bmi.w / Math.pow(bmi.h / 100, 2) : 0;
        const lab = v < 18.5 ? "Below healthy range" : v < 25 ? "Healthy range" : v < 30 ? "Above healthy range" : "Well above healthy range";
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w ds-bmi"><div>{Hd(s)}
            <div style={{ display: "grid", gap: 14, maxWidth: 380 }}>
              <label>Height (cm)<input type="number" min="100" max="230" value={bmi.h} onChange={(e) => setBmi({ ...bmi, h: e.target.value })} placeholder="e.g. 172" /></label>
              <label>Weight (kg)<input type="number" min="30" max="250" value={bmi.w} onChange={(e) => setBmi({ ...bmi, w: e.target.value })} placeholder="e.g. 70" /></label></div></div>
            <div className="ds-res">{v ? <><small>Your BMI</small><b>{v.toFixed(1)}</b><p style={{ fontWeight: 600 }}>{lab}</p><p style={{ color: "var(--mu)", fontSize: 13, margin: "8px 0 18px" }}>A general guide only. A coach can build a plan around your goals.</p><button className="ds-btn" onClick={() => jump(c.form.id)}>Get my plan</button></> : <><b>--</b><p style={{ color: "var(--mu)" }}>Enter your height and weight to see your result.</p></>}</div>
          </div></div>
        );
      }
      case "pricelist": {
        const cats = ["All", ...new Set(s.d.map((x) => x[0]))];
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}{chips(cats, f, setF)}
            <div className="ds-pl">{s.d.filter((x) => f === "All" || x[0] === f).map(([, nm, p, du]) => (
              <div className="ds-pr" key={nm}><b>{nm}</b><small>{du}</small><span className="p">{p}</span>
                <button className="ds-btn sm" onClick={() => { setPre(nm); jump(c.form.id); }}>Book</button></div>
            ))}</div></div></div>
        );
      }
      case "projects": {
        const tags = ["All", ...new Set(s.d.map((x) => x[1]))];
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}{chips(tags, f, setF)}
            <div className="ds-g">{s.d.filter((x) => f === "All" || x[1] === f).map((p, i) => (
              <div className="ds-card ds-lift ds-prj" key={p[0]} onClick={() => setPick(p)} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && setPick(p)}>
                <Pic emoji={p[3]} hue={c.hue + i * 28} size={76} src={`/assets/demo/${k}-${i + 1}.jpg`} style={{ aspectRatio: "4/3", borderRadius: 0 }} />
                <div className="body"><small>{p[1]} · {p[4]}</small><h3>{p[0]}</h3><p>{p[2].slice(0, 64)}…</p></div>
              </div>
            ))}</div></div></div>
        );
      }
      case "skills":
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-sk">{s.d.map(([nm, v]) => (<div key={nm}><div className="l"><span>{nm}</span><span>{v}%</span></div><div className="bar"><i style={{ width: v + "%" }} /></div></div>))}</div></div></div>
        );
      case "timeline":
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-tl">{s.d.map(([y, r, o, d]) => (<div key={y}><small>{y}</small><h3>{r} · {o}</h3><p>{d}</p></div>))}</div></div></div>
        );
      case "faq":
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-faq">{s.d.map(([q, a], i) => (<div key={q}><button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>{q}<span style={{ color: "var(--ac)" }}>{open === i ? "−" : "+"}</span></button>{open === i && <p>{a}</p>}</div>))}</div></div></div>
        );
      case "categories":
        return (
          <div className="ds-sec" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-g">{s.d.map(([e, t, ct]) => (<div className="ds-cat" key={t} onClick={() => { setF(t); jump("shop"); }} role="button" tabIndex={0}><span>{e}</span><b>{t}</b><small>{ct}</small></div>))}</div></div></div>
        );
      case "shop": {
        let list = s.d.filter((p) => f === "All" || p[1] === f);
        if (sort === "Price: low to high") list = [...list].sort((a, b) => a[2] - b[2]);
        if (sort === "Price: high to low") list = [...list].sort((a, b) => b[2] - a[2]);
        return (
          <div className="ds-sec ds-alt" key={k} data-s={k}><div className="ds-w">{Hd(s)}
            <div className="ds-tools">{chips(["All", "Men", "Women", "Accessories"], f, setF)}
              <select className="ds-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">{["Featured", "Price: low to high", "Price: high to low"].map((x) => <option key={x}>{x}</option>)}</select></div>
            <div className="ds-g" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))" }}>{list.map(([t, cat, pr, old, h, e, tg], i) => (
              <div className="ds-card ds-prod ds-lift" key={t}>
                {tg && <span className={"tg" + (tg === "Sale" ? " sale" : "")}>{tg}</span>}
                <button className="heart" aria-label="Save to wishlist" onClick={() => setLiked({ ...liked, [t]: !liked[t] })}>{liked[t] ? "♥" : "♡"}</button>
                <Pic emoji={e} hue={h} size={84} src={`/assets/demo/shop-${i + 1}.jpg`} style={{ aspectRatio: "4/5", borderRadius: 0 }} />
                <div className="body"><div className="nm">{t}</div><small style={{ color: "var(--mu)" }}>{cat} · <Stars /> 4.{5 + (i % 4)}</small>
                  <div className="ds-sz">{["S", "M", "L", "XL"].map((z) => <span key={z}>{z}</span>)}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div><b>{inr(pr)}</b>{old > 0 && <span className="old">{inr(old)}</span>}</div>
                    <button className="ds-btn sm" onClick={() => add({ t, p: pr, e })}>Add</button></div></div>
              </div>
            ))}</div></div></div>
        );
      }
      default:
        return null;
    }
  };
  const h = c.hero;
  const links = [...c.nav];
  return (
    <div className={"ds" + (nr ? " nr" : "")} ref={root} style={style}>
      <style>{DS_CSS}</style>
      {c.promo && <div className="ds-top">{c.promo}</div>}
      <div className="ds-hdr">
        <div className="ds-w">
          <div className="ds-logo" onClick={() => jump("top")}><span className="ds-mark">{c.logo}</span>{c.name}</div>
          <div className="ds-nav">
            {links.map(([l, id]) => <a className="lk" key={l} onClick={() => jump(id)}>{l}</a>)}
            {c.shop && <button className="ds-btn sm o" onClick={() => setDrawer(true)}>🛒 Cart ({n})</button>}
            <button className="ds-btn sm" onClick={() => jump(c.cta[1])}>{c.cta[0]}</button>
            <button className="ds-burger" aria-label="Menu" onClick={() => setMenu(!menu)}>{menu ? "✕" : "☰"}</button>
          </div>
        </div>
        {menu && <div className="ds-drop">{links.map(([l, id]) => <a key={l} onClick={() => jump(id)}>{l}</a>)}</div>}
      </div>

      {h.layout === "center" ? (
        <div className="ds-hero ds-hc" data-s="top"><div className="ds-w">
          <span className="ds-pill"><Stars /> {h.rating}</span>
          <div className="ds-ey" style={{ marginTop: 18 }}>{h.kicker}</div>
          <h1 style={{ fontSize: "clamp(44px,8vw,92px)", textTransform: "uppercase", letterSpacing: "-.04em" }}>{h.title}</h1>
          <p className="lead">{h.sub}</p>
          <div className="ds-row"><button className="ds-btn" onClick={() => jump(h.b1[1])}>{h.b1[0]}</button><button className="ds-btn o" onClick={() => jump(h.b2[1])}>{h.b2[0]}</button></div>
          <div className="ds-floats">{h.art.map((e) => <div key={e}>{e}</div>)}</div>
        </div></div>
      ) : (
        <div className="ds-hero" data-s="top"><div className="ds-w">
          <div className="ds-hg">
            <div>
              <span className="ds-pill"><Stars /> {h.rating}</span>
              <div className="ds-ey" style={{ marginTop: 18 }}>{h.kicker}</div>
              <h1>{h.title}</h1>
              <p className="lead">{h.sub}</p>
              <div className="ds-row"><button className="ds-btn" onClick={() => jump(h.b1[1])}>{h.b1[0]}</button><button className="ds-btn o" onClick={() => jump(h.b2[1])}>{h.b2[0]}</button></div>
              <div className="ds-ticks">{h.points.map((p) => <span key={p}>{p}</span>)}</div>
            </div>
            <div className="ds-art">
              <div className="ds-blob" /><div className="ds-plate">{h.art[0]}</div>
              <div className="ds-fl" style={{ right: "-2%", top: "8%", width: "26%", aspectRatio: "1", transform: "rotate(8deg)" }}>{h.art[1]}</div>
              <div className="ds-fl" style={{ left: "1%", top: "14%", width: "22%", aspectRatio: "1", borderRadius: "50%", animationDelay: "-2s" }}>{h.art[2]}</div>
              <div className="ds-badge"><small>{h.badge[0]}</small><b>{h.badge[1]}</b></div>
            </div>
          </div>
          {h.quick && (
            <div className="ds-quick">
              <label>Date<input type="date" /></label>
              <label>Guests<select>{["1", "2", "3", "4", "5", "6+"].map((x) => <option key={x}>{x} guest{x === "1" ? "" : "s"}</option>)}</select></label>
              <label>Time<input type="time" defaultValue="20:00" /></label>
              <button className="ds-btn" onClick={() => jump(c.form.id)}>Check availability</button>
            </div>
          )}
        </div></div>
      )}

      <div className="ds-stats"><div className="ds-w">{c.stats.map(([a, b]) => <div key={b}><b>{a}</b><span>{b}</span></div>)}</div></div>

      {c.secs.map(sec)}

      <div className="ds-sec">
        <div className="ds-w">
          <div className="ds-head ds-center"><div className="ds-ey">Testimonials</div><h2 className="ds-h2">What people say</h2></div>
          <div className="ds-g" data-s="reviews">{c.reviews.map(([q, w, r]) => (
            <figure className="ds-card ds-rev" key={w}><Stars /><blockquote>“{q}”</blockquote>
              <figcaption><span className="ds-av">{w[0]}</span><div><b>{w}</b><small>{r}</small></div></figcaption></figure>
          ))}</div>
        </div>
      </div>

      <div className="ds-band"><div className="ds-w"><h2>{c.band[0]}</h2><p>{c.band[1]}</p><button className="ds-btn" onClick={() => jump(c.form.id)}>{c.cta[0]}</button></div></div>

      <div className="ds-sec ds-alt" data-s={c.form.id}>
        <div className="ds-w ds-two">
          <div>
            <div className="ds-ey">Get in touch</div>
            <h2 className="ds-h2">{c.form.title}</h2>
            <p className="ds-sub">{c.form.sub}</p>
            <ul className="ds-info"><li>📍 {c.info[0]}</li><li>📞 {c.info[1]}</li><li>✉️ {c.info[2]}</li></ul>
            {c.hours && <div className="ds-hours">{c.hours.map(([d, t]) => <div key={d}><span>{d}</span><b>{t}</b></div>)}</div>}
            {c.map && <div className="ds-map"><i>📍</i><span>{c.info[0]}</span></div>}
          </div>
          <form className="ds-form" key={pre} onSubmit={(e) => { e.preventDefault(); e.target.reset(); say("Demo only: this form is a sample and nothing was sent."); }}>
            <h3>{c.form.title}</h3>
            <label>Full name<input required placeholder="Your name" /></label>
            <label>Email<input type="email" required placeholder="you@example.com" /></label>
            {c.form.extra.map(([l, o]) => (
              <label key={l}>{l}
                {typeof o === "string" ? <input type={o} /> : <select defaultValue={o.includes(pre) ? pre : undefined}>{[...new Set(o)].map((x) => <option key={x}>{x}</option>)}</select>}
              </label>
            ))}
            <label>Message<textarea rows="3" placeholder="Tell us a little more" /></label>
            <button className="ds-btn">{c.form.btn}</button>
          </form>
        </div>
      </div>

      <div className="ds-foot">
        <div className="ds-w">
          <div className="ds-fg">
            <div><div className="ds-logo"><span className="ds-mark">{c.logo}</span>{c.name}</div><p style={{ color: "var(--mu)", marginTop: 12, maxWidth: 280 }}>{h.sub}</p>
              <div className="ds-soc">{["IG", "FB", "X", "YT"].map((x) => <span key={x}>{x}</span>)}</div></div>
            <div><h4>Explore</h4><ul>{links.map(([l, id]) => <li key={l} onClick={() => jump(id)}>{l}</li>)}</ul></div>
            <div><h4>Contact</h4><ul><li>{c.info[0]}</li><li>{c.info[1]}</li><li>{c.info[2]}</li></ul></div>
            <div><h4>Stay in the loop</h4><p style={{ color: "var(--mu)" }}>Offers and news, once a month.</p>
              <form className="ds-nl" style={{ display: "flex", background: "none", border: 0, padding: 0 }} onSubmit={(e) => { e.preventDefault(); e.target.reset(); say("Subscribed (demo only)."); }}><input type="email" required placeholder="Email address" aria-label="Email address" /><button className="ds-btn sm">Join</button></form></div>
          </div>
          <div className="ds-copy">© Sample concept by Veeva Creatives. Not a real business.</div>
        </div>
      </div>

      {drawer && (
        <div className="ds-cart" role="dialog" aria-label="Shopping cart">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3>Your cart ({n})</h3><button aria-label="Close cart" onClick={() => setDrawer(false)} style={{ all: "unset", cursor: "pointer", fontSize: 20 }}>✕</button></div>
          {cart.length === 0 && <p style={{ color: "var(--mu)" }}>Your cart is empty. Add something you like.</p>}
          {cart.map((x) => (
            <div className="ds-ci" key={x.t}><span>{x.e} {x.t} × {x.q}</span><span style={{ display: "flex", gap: 10, alignItems: "center" }}><b>{inr(x.p * x.q)}</b><button aria-label={"Remove " + x.t} onClick={() => setCart(cart.filter((y) => y.t !== x.t))} style={{ all: "unset", cursor: "pointer", opacity: 0.6 }}>✕</button></span></div>
          ))}
          {cart.length > 0 && (<>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 18, marginTop: 8 }}><span>Total</span><span>{inr(total)}</span></div>
            <small style={{ color: "var(--mu)" }}>{total >= 1999 ? "🎉 You've unlocked free shipping." : "Add " + inr(1999 - total) + " more for free shipping."}</small>
            <button className="ds-btn" onClick={() => { say("Demo only: checkout isn't connected."); setDrawer(false); }}>Checkout</button></>)}
        </div>
      )}
      {pick && (
        <div className="ds-lb" onClick={() => setPick(null)}>
          <div className="ds-lbc" onClick={(e) => e.stopPropagation()} role="dialog" aria-label={pick[0]}>
            <Pic emoji={pick[3]} hue={c.hue} size={120} style={{ minHeight: 280, borderRadius: 0 }} />
            <div className="t"><small style={{ color: "var(--ac)", fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase" }}>{pick[1]}</small>
              <h2 style={{ fontSize: 30 }}>{pick[0]}</h2><p style={{ color: "var(--mu)" }}>{pick[2]}</p>
              <dl><dt>Year</dt><dd>{pick[4]}</dd><dt>Role</dt><dd>{pick[5]}</dd><dt>Type</dt><dd>{pick[1]}</dd></dl>
              <div className="ds-row" style={{ marginTop: 6 }}><button className="ds-btn" onClick={() => { setPick(null); setPre(pick[1]); jump(c.form.id); }}>Start a similar project</button><button className="ds-btn o" onClick={() => setPick(null)}>Close</button></div></div>
          </div>
        </div>
      )}
      {toast && <div className="ds-msg" role="status">{toast}</div>}
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
  "Under ₹1,000",
  "₹1000 – ₹2500",
  "₹5000 – ₹5000",
  "₹5000+",
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
    if (hp) return;
    setSt({ k: "loading" });
    try {
      const r = await fetch(ENQUIRY_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...v,
          consent: true,
          website: hp,
        }),
      });
      const j = await r.json();
      if (!r.ok || j.success !== true) {
        if (r.status === 400 && j.errors) setEr(j.errors);
        throw new Error(j.message || "The enquiry could not be submitted.");
      }
      setSt({
        k: "ok",
        emailSent: j.emailSent === true,
        studioNotified: j.studioNotified === true,
        saved: j.saved === true,
        summary: {
          name: v.name,
          email: v.email,
          phone: v.phone,
          brand: v.brand,
          service: v.service,
          budget: v.budget,
          method: v.method,
          desc: v.desc,
        },
      });
      setV(blank);
    } catch (error) {
      setSt({ k: "err", t: error.message });
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
        <form onSubmit={submit} noValidate>
          <div className="two">
            {F({ k: "name", l: "Full Name", req: true })}
            {F({ k: "email", l: "Email Address", type: "email", req: true })}
          </div>
          <div className="two">
            {F({ k: "phone", l: "Phone Number", type: "tel" })}
            {F({ k: "brand", l: "Business or Brand Name" })}
          </div>
          {F({
            k: "service",
            l: "Service Required",
            req: true,
            children: (
              <select
                value={v.service}
                onChange={(e) => set("service", e.target.value)}
              >
                <option value="">Select…</option>
                {SV.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            ),
          })}
          <div className="two">
            {F({
              k: "budget",
              l: "Project Budget (INR)",
              children: (
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
              ),
            })}
            {F({
              k: "method",
              l: "Preferred Contact Method",
              children: (
                <select
                  value={v.method}
                  onChange={(e) => set("method", e.target.value)}
                >
                  <option>Email</option>
                  <option>Phone</option>
                  <option>WhatsApp</option>
                </select>
              ),
            })}
          </div>
          {F({
            k: "desc",
            l: "Project Description",
            req: true,
            children: (
              <textarea
                rows="4"
                value={v.desc}
                onChange={(e) => set("desc", e.target.value)}
              />
            ),
          })}
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
              <b>Thank you, {st.summary?.name}!</b>
              <br />
              Your enquiry has been received.{" "}
              {st.emailSent
                ? `A confirmation has been sent to ${st.summary?.email}.`
                : st.studioNotified
                  ? `We received your enquiry, but couldn't send a confirmation to ${st.summary?.email}. Our team has been notified and will follow up.`
                  : st.saved
                    ? "Your enquiry is saved, but our team could not be notified by email. Please contact us directly to follow up."
                    : "We couldn't send your enquiry. Please contact us directly."}
              <br />
              <small>
                {st.summary?.service}
                {st.summary?.budget ? ` · ${st.summary.budget}` : ""}
                {st.summary?.method ? ` · Preferred contact: ${st.summary.method}` : ""}
              </small>
            </div>
          )}
          {st.k === "mail" && (
            <div className="msg" role="status">
              Your email app has opened with the enquiry filled in. Press send
              there to deliver it. (Direct submission is not configured yet.)
            </div>
          )}
          {st.k === "err" && (
            <div className="msg" role="alert">
              Sorry, we couldn't send that. Your details are kept — try again or
              email{" "}
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
          <div className="logo">
            <Leaf />
            veeva<span className="pk">.</span>
          </div>
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
