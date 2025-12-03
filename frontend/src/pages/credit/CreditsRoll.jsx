import { useEffect, useRef, useState } from "react";

export default function CreditsPage() {
  const credits = [
    { title: "Frontend", lines: ["Abhai Sankar P R"] },
    { title: "Backend", lines: ["Akhileswaran"] },
    { title: "Title Design", lines: ["Sreenandan"] },
    { title: "Logo Design", lines: ["Aadityan M"] },
    { title: "Finance Team", lines: ["Abhiram A P"] },
    "Special thanks to SCTCE administration",
    "Thanks for travelling with us!",
  ];

  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const animRef = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const [speed] = useState(50);

  useEffect(() => {
    const vp = viewportRef.current;
    const ct = contentRef.current;

    if (!vp || !ct) return;

    const vpHeight = vp.clientHeight;
    const contentHeight = ct.scrollHeight;

    setTranslateY(vpHeight);

    let last = null;

    function animate(ts) {
      if (!last) last = ts;
      const dt = (ts - last) / 1000;
      last = ts;

      setTranslateY((prev) => {
        const next = prev - speed * dt;
        if (next < -contentHeight) return vpHeight;
        return next;
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  const renderCredits = () =>
    credits.map((item, i) => {
      if (typeof item === "string") {
        return (
          <div
            key={i}
            className="text-center text-2xl md:text-3xl py-4 font-light tracking-wider uppercase"
          >
            {item}
          </div>
        );
      }
      return (
        <div key={i} className="text-center mb-12">
          <div className="text-4xl md:text-5xl font-bold mb-4 tracking-widest uppercase">
            {item.title}
          </div>
          {item.lines.map((line, j) => (
            <div
              key={j}
              className="text-2xl md:text-3xl font-light leading-[50px] tracking-wide"
            >
              {line}
            </div>
          ))}
        </div>
      );
    });

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white relative flex items-center justify-center">
      <div ref={viewportRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={contentRef}
          className="absolute left-1/2 -translate-x-1/2 px-4 md:px-0"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {renderCredits()}
          <div className="h-48" /> 
        </div>

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
