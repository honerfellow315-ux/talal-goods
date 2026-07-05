import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Truck, Package, Home, Car, ConstructionIcon, Snowflake,
  Phone, MessageCircle, ArrowRight, MapPin, Shield, Clock,
  Award, Boxes, ChevronRight, Sparkles,
} from "lucide-react";
import heroTrucks from "@/assets/hero-trucks.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tal Goods — Pakistan's Trusted Freight & Transport Since 2005" },
      { name: "description", content: "500+ truck fleet. Nationwide coverage. Goods transport, packers & movers, containers, car carriers & crane rental across Pakistan." },
      { property: "og:title", content: "Tal Goods — Move Anything, Anywhere in Pakistan" },
      { property: "og:description", content: "Pakistan's most trusted freight partner. 20+ years, 500+ trucks, 7+ cities." },
    ],
  }),
  component: Index,
});

const BRAND = "#E8420A";
const PHONE = "03xxxxxxx";
const WHATSAPP = "https://wa.me/92xxxxxxxx";

const services = [
  { Icon: Truck, title: "Goods Transport", desc: "Nationwide freight movement using trucks, containers and trailers. Safe delivery, guaranteed." },
  { Icon: Package, title: "Packers & Movers", desc: "Professional house and office shifting with expert packing, loading and unloading teams." },
  { Icon: Home, title: "Home Shifting", desc: "Stress-free residential relocation across all major cities in Pakistan at affordable rates." },
  { Icon: Car, title: "Car Carrier", desc: "Safe and insured vehicle transportation anywhere in Pakistan using dedicated car carriers." },
  { Icon: ConstructionIcon, title: "Crane Rental", desc: "Crane hire in Karachi and Lahore for industrial, commercial and construction projects." },
  { Icon: Snowflake, title: "Reefer Containers", desc: "Temperature-controlled storage and transport for perishable goods across Pakistan." },
];

const stats = [
  { num: "500", suffix: "+", label: "Trucks in fleet" },
  { num: "20", suffix: "+", label: "Years in operation" },
  { num: "100", suffix: "+", label: "Business clients" },
  { num: "7", suffix: "+", label: "Cities covered" },
];

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta"];

const why = [
  { Icon: Award, n: "01", title: "20 Years Experience", desc: "Established in 2005, we've built Pakistan's most trusted freight network over two decades." },
  { Icon: Boxes, n: "02", title: "500+ Truck Fleet", desc: "From Shehzores to 40-ton trailers — the right vehicle for every shipment size." },
  { Icon: Shield, n: "03", title: "Damage-Free Guarantee", desc: "Professional packing and secure loading ensures your goods arrive in perfect condition." },
  { Icon: Clock, n: "04", title: "Same-Day Service", desc: "Need it moved urgently? Same-day pickup and express delivery across cities." },
];

function useCountUp(target: number, duration = 1600, start = false) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return n;
}

function StatItem({ num, suffix, label, delay }: { num: string; suffix: string; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const value = useCountUp(parseInt(num, 10), 1800, seen);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="px-8 py-10 border-r border-white/[0.07] last:border-r-0 transition-colors hover:bg-white/[0.02]"
    >
      <div className="text-[42px] font-black tracking-[-2px] leading-none mb-1.5 text-white">
        {value}<span style={{ color: BRAND }}>{suffix}</span>
      </div>
      <div className="text-[13px] text-white/40 font-medium">{label}</div>
    </motion.div>
  );
}

function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans antialiased overflow-x-hidden">
      {/* NAV */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.07]"
      >
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-black text-[15px] tracking-tighter shadow-[0_8px_24px_-8px_rgba(232,66,10,0.6)]" style={{ background: BRAND }}>TG</div>
          <div>
            <div className="font-bold text-[15px] leading-tight">Tal Goods</div>
            <div className="text-[10px] text-white/40 uppercase tracking-[1px]">Transport Company</div>
          </div>
        </a>
        <div className="hidden md:flex gap-8">
          {["Services", "Coverage", "Fleet", "Why Us", "Contact"].map((l) => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} className="text-[13px] font-medium text-white/60 hover:text-white transition-colors">{l}</a>
          ))}
        </div>
        <a href={WHATSAPP} target="_blank" rel="noopener" className="text-white font-semibold text-[13px] px-5 py-2.5 rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(232,66,10,0.7)]" style={{ background: BRAND }}>
          Book a Truck
        </a>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        <motion.div style={{ scale: imgScale }} className="absolute inset-0">
          <img src={heroTrucks} alt="" width={1536} height={1024} className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/85 to-[#050505]/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
        </motion.div>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 70% 40%, rgba(232,66,10,0.18) 0%, transparent 70%)" }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
          }}
        />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-7 border"
            style={{ background: "rgba(232,66,10,0.12)", borderColor: "rgba(232,66,10,0.3)" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" style={{ background: BRAND }} />
              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: BRAND }} />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.5px]" style={{ color: BRAND }}>
              Pakistan's Trusted Freight Partner Since 2005
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="font-black leading-[1.02] tracking-[-2.5px] mb-6"
            style={{ fontSize: "clamp(44px, 7vw, 84px)" }}
          >
            Move Anything,
            <br />
            <span style={{ color: BRAND }}>Anywhere</span> in Pakistan
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-[17px] leading-[1.7] text-white/55 mb-10 max-w-[540px]"
          >
            500+ truck fleet. Nationwide coverage from Karachi to Islamabad. Goods transport,
            packers &amp; movers, container services — all under one roof.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="flex flex-wrap items-center gap-3.5"
          >
            <a href={WHATSAPP} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(232,66,10,0.7)]" style={{ background: BRAND }}>
              <MessageCircle size={18} />
              WhatsApp Us Now
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#services" className="inline-flex items-center gap-2 text-white font-semibold text-[15px] px-8 py-4 rounded-xl border border-white/20 hover:border-white/50 hover:bg-white/[0.05] transition-all">
              Our Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            <a href={`tel:${PHONE}`} className="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center">
                <Phone size={15} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[1.5px] text-white/40">Call 24/7</div>
                <div className="text-[15px] font-bold tracking-tight">{PHONE}</div>
              </div>
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-[10px] uppercase tracking-[2px]"
        >
          <span>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-y border-white/[0.07]">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-12 py-28 relative">
        <SectionHeading eyebrow="What We Do" title={<>Complete Logistics,<br />End to End</>} desc="From small home shifts to heavy freight — we have the fleet, team and network to handle it." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.07] border border-white/[0.07] rounded-2xl overflow-hidden">
          {services.map((s, i) => (
            <motion.a
              key={s.title}
              href="#contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group bg-[#080808] p-9 hover:bg-[#0e0e0e] transition-all relative cursor-pointer block"
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border transition-all group-hover:scale-110 group-hover:rotate-3" style={{ background: "rgba(232,66,10,0.1)", borderColor: "rgba(232,66,10,0.25)" }}>
                <s.Icon size={22} style={{ color: BRAND }} strokeWidth={1.8} />
              </div>
              <h3 className="text-[17px] font-bold tracking-tight mb-2.5">{s.title}</h3>
              <p className="text-[13px] text-white/45 leading-[1.65]">{s.desc}</p>
              <div className="mt-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[1px]" style={{ color: BRAND }}>
                Explore <ChevronRight size={12} className="transition-transform group-hover:translate-x-1" />
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at top right, rgba(232,66,10,0.08), transparent 60%)" }} />
            </motion.a>
          ))}
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="px-6 md:px-12 py-28 bg-[#030303] relative overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <SectionHeading eyebrow="Coverage" title={<>We Operate Across<br />All of Pakistan</>} desc="With offices and routes across Pakistan's biggest cities, your goods reach the destination on time, every time." inline />
            <div className="grid grid-cols-2 gap-3 mt-2">
              {cities.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-2.5 px-4 py-3 bg-white/[0.03] border border-white/[0.07] rounded-xl text-[13px] text-white/70 font-medium hover:border-[rgba(232,66,10,0.3)] hover:bg-[rgba(232,66,10,0.04)] transition-all"
                >
                  <MapPin size={13} style={{ color: BRAND }} /> {c}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="aspect-square relative bg-white/[0.02] border border-white/[0.07] rounded-3xl overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 60% 40%, rgba(232,66,10,0.1), transparent 60%)" }} />
            <svg viewBox="0 0 300 380" className="w-4/5 relative" fill="none">
              <path d="M120 30 L180 20 L220 50 L240 80 L250 120 L240 160 L220 200 L230 240 L210 280 L190 300 L170 320 L150 340 L140 360 L130 340 L110 300 L90 270 L70 240 L60 200 L50 170 L60 140 L40 110 L50 80 L80 50 Z" fill="rgba(255,255,255,0.04)" stroke={BRAND} strokeOpacity="0.5" strokeWidth="1.5" />
              {[
                { x: 145, y: 310, n: "Karachi" },
                { x: 165, y: 180, n: "Lahore" },
                { x: 155, y: 110, n: "Islamabad" },
              ].map((c) => (
                <g key={c.n}>
                  <circle cx={c.x} cy={c.y} r="14" fill={BRAND} opacity="0.15">
                    <animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0;0.4" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                  <circle cx={c.x} cy={c.y} r="5" fill={BRAND} />
                  <text x={c.x + 12} y={c.y + 4} fill="rgba(255,255,255,0.7)" fontSize="10" fontFamily="Inter" fontWeight="600">{c.n}</text>
                </g>
              ))}
              {[
                { x: 160, y: 125 }, { x: 135, y: 195 }, { x: 145, y: 230 }, { x: 80, y: 100 }, { x: 85, y: 255 },
              ].map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={BRAND} opacity="0.6" />
              ))}
              <line x1="145" y1="310" x2="165" y2="180" stroke={BRAND} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="165" y1="180" x2="155" y2="110" stroke={BRAND} strokeOpacity="0.35" strokeWidth="1" strokeDasharray="4 4" />
            </svg>
          </motion.div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="px-6 md:px-12 py-28">
        <SectionHeading eyebrow="Why Choose Us" title={<>Built on Trust,<br />Driven by Reliability</>} desc="Two decades of moving Pakistan's economy — one shipment at a time." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {why.map((w, i) => (
            <motion.div
              key={w.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative p-8 border border-white/[0.07] rounded-2xl hover:border-[rgba(232,66,10,0.3)] hover:bg-[rgba(232,66,10,0.03)] transition-all overflow-hidden"
            >
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl" style={{ background: "rgba(232,66,10,0.25)" }} />
              <div className="flex items-center justify-between mb-6 relative">
                <div className="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-[rgba(232,66,10,0.4)] transition-colors">
                  <w.Icon size={20} style={{ color: BRAND }} strokeWidth={1.8} />
                </div>
                <div className="text-[11px] font-bold tracking-[2px]" style={{ color: BRAND }}>{w.n}</div>
              </div>
              <h4 className="text-[16px] font-bold mb-2.5">{w.title}</h4>
              <p className="text-[13px] text-white/45 leading-[1.65]">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 md:px-12 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border p-10 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          style={{ background: "linear-gradient(135deg, #1a0800 0%, #0a0200 100%)", borderColor: "rgba(232,66,10,0.25)" }}
        >
          <div className="absolute -right-24 -top-24 w-[400px] h-[400px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(232,66,10,0.2) 0%, transparent 70%)" }} />
          <div className="absolute left-0 bottom-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,66,10,0.5), transparent)" }} />

          <div className="relative">
            <div className="inline-flex items-center gap-2 mb-4 text-[11px] font-bold uppercase tracking-[2px]" style={{ color: BRAND }}>
              <Sparkles size={13} /> Ready to Move
            </div>
            <h2 className="font-black leading-[1.05] tracking-[-1.5px] max-w-[520px]" style={{ fontSize: "clamp(30px, 3.5vw, 48px)" }}>
              Get a quote in <span style={{ color: BRAND }}>under 2 minutes.</span>
            </h2>
            <p className="mt-4 text-white/50 text-[15px] max-w-md">Call or WhatsApp — our dispatch team is online 7 days a week.</p>
          </div>

          <div className="relative flex flex-col items-start md:items-end gap-4">
            <a href={`tel:${PHONE}`} className="text-[28px] md:text-[32px] font-black tracking-tight hover:opacity-80 transition-opacity">{PHONE}</a>
            <div className="text-[12px] text-white/40">Available 7 days a week · All of Pakistan</div>
            <a href={WHATSAPP} target="_blank" rel="noopener" className="group inline-flex items-center gap-2 mt-2 text-white font-bold text-[15px] px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-12px_rgba(232,66,10,0.7)]" style={{ background: BRAND }}>
              <MessageCircle size={18} /> WhatsApp Now <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.07] px-6 md:px-12 py-10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-md flex items-center justify-center text-white font-black text-[11px]" style={{ background: BRAND }}>TG</div>
          <div className="text-[12px] text-white/30">© {new Date().getFullYear()} Tal Goods Transport Company · Karachi, Lahore, Islamabad</div>
        </div>
        <div className="flex gap-6">
          {["Services", "About", "Contact", "Privacy"].map((l) => (
            <a key={l} href="#" className="text-[12px] text-white/35 hover:text-white/70 transition-colors">{l}</a>
          ))}
        </div>
      </footer>
    </div>
  );
}

function SectionHeading({ eyebrow, title, desc, inline = false }: { eyebrow: string; title: React.ReactNode; desc: string; inline?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={inline ? "" : "mb-14"}
    >
      <div className="text-[11px] font-bold tracking-[3px] uppercase mb-4" style={{ color: BRAND }}>{eyebrow}</div>
      <h2 className="font-extrabold tracking-[-1.5px] leading-[1.1] mb-4" style={{ fontSize: "clamp(30px, 4.2vw, 52px)" }}>{title}</h2>
      <p className="text-[16px] text-white/45 max-w-[500px] leading-[1.7]">{desc}</p>
    </motion.div>
  );
}
