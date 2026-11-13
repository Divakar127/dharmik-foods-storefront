"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Homepage } from "../shared/experience";
export function HeroCarousel({ content }: { content: Homepage }) {
  const slides = content.slides.filter(s => s.enabled);
  const [step, setStep] = useState(0), [snapping, setSnapping] = useState(false), [reduced, setReduced] = useState(true);
  const moving = useRef(false);
  const index = slides.length ? step % slides.length : 0;
  const [hovered, setHovered] = useState(false), [focused, setFocused] = useState(false);
  useEffect(() => { const media = matchMedia("(prefers-reduced-motion: reduce)"); const read = () => setReduced(media.matches); read(); media.addEventListener("change", read); return () => media.removeEventListener("change", read); }, []);
  const finish = useCallback(() => {
    moving.current = false;
    if (step >= slides.length && slides.length) { setSnapping(true); setStep(step % slides.length); }
  }, [step, slides.length]);
  useEffect(() => {
    if (!snapping) return;
    // Identical cloned panels make the reset invisible; restore transitions
    // only after the reset position has been painted.
    let second = 0;
    const first = requestAnimationFrame(() => { second = requestAnimationFrame(() => setSnapping(false)); });
    return () => { cancelAnimationFrame(first); cancelAnimationFrame(second); };
  }, [snapping]);
  useEffect(() => {
    if (reduced) { moving.current = false; setSnapping(true); setStep(s => slides.length ? s % slides.length : 0); }
  }, [reduced, slides.length]);
  useEffect(() => {
    if (!moving.current) return;
    // A backgrounded tab may not deliver transitionend; do not leave controls locked.
    const timer = setTimeout(finish, 1250);
    return () => clearTimeout(timer);
  }, [step, finish]);
  useEffect(() => {
    if (hovered || focused || reduced || slides.length < 2) return;
    const timer = setInterval(() => { if (!document.hidden && !moving.current) { moving.current = true; setStep(i => i + 1); } }, content.interval_seconds * 1000);
    return () => clearInterval(timer);
  }, [hovered, focused, reduced, slides.length, content.interval_seconds]);
  const slide = slides[index % slides.length];
  if (!slide) return null;
  return <section className="commerce-hero rotating-hero image-only-hero" aria-label="Dharmik Foods featured collections" aria-roledescription="carousel" aria-live="off" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
    <h1 className="sr-only">Traditional foods and pantry essentials from Dharmik Foods</h1>
    <a className="hero-photo hero-banner-link" href={slide.href} aria-label={`${slide.alt}. ${slide.link_label}`}><div className={`hero-image-track${snapping ? " is-snapping" : ""}`} style={{transform:`translate3d(-${step * 100}%,0,0)`}} onTransitionEnd={event => { if (event.target === event.currentTarget && event.propertyName === "transform") finish(); }}>{[...slides,...slides].map((s,i) => <div className="hero-image-panel" key={`${s.id}-${i}`} aria-hidden={i !== step}><img src={s.image_url} alt={i === step ? s.alt : ""} fetchPriority={i === 0 ? "high" : "low"} loading="eager"/></div>)}</div></a>
  </section>;
}
