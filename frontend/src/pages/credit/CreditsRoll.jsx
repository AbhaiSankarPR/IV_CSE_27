import { useEffect, useRef, useState } from "react";

export default function CreditsPage() {
  const credits = [
    { role: "Frontend", name: "Abhai Sankar P R" },
    { role: "Backend", name: "Akhileswaran" },
    { role: "Title Design", name: "Sreenandan" },
    { role: "Logo Design", name: "Aadityan M" },
    { role: "Finance Team", name: "Abhiram A P" },
    {
      role: "Special thanks / mention to",
      list: [
        "Abhiram AR",
        "Aadityan Pramad",
        "Abhin Anoop",
        "Abhiram AP",
        "Sreenandan",
        "Adityan Manoj",
        "Adithya Suresh",
      ],
    },
    { role: "", name: "Special thanks to SCTCE administration" },
    { role: "", name: "Thanks for travelling with us!" },
  ];

  const duplicatedCredits = [...credits, { spacer: true }, ...credits];

  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const animRef = useRef(null);

  const [translateY, setTranslateY] = useState(0);
  const speed = 5;

  useEffect(() => {
    const vp = viewportRef.current;
    const ct = contentRef.current;
    if (!vp || !ct) return;

    const vpHeight = vp.clientHeight;
    const contentHeight = ct.scrollHeight / 2;

    setTranslateY(vpHeight);

    let lastTime = null;

    function animate(ts) {
      if (!lastTime) lastTime = ts;
      const delta = (ts - lastTime) / 1000;
      lastTime = ts;

      setTranslateY((prev) => {
        const next = prev - speed * delta * vpHeight * 0.01;
        if (next < -contentHeight) return 0;
        return next;
      });

      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-black text-white relative flex items-center justify-center">
      <div ref={viewportRef} className="absolute inset-0 overflow-hidden">
        <div
          ref={contentRef}
          className="absolute left-1/2 -translate-x-1/2 px-4"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {duplicatedCredits.map((item, index) => {
            if (item.spacer) return <div key={index} style={{ height: "25vh" }} />;

            if (item.name) {
              return (
                <div
                  key={index}
                  className="flex justify-center mb-[2vh] items-center"
                  style={{ width: "max-content", margin: "0 auto" }}
                >
                  {item.role && (
                    <div
                      className="text-right opacity-70 uppercase tracking-widest"
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                        width: "18vw",
                        fontSize: "1.9vh",
                      }}
                    >
                      {item.role}
                    </div>
                  )}
                  <div
                    className="ml-[2vw] text-left"
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                      fontSize: "1.9vh",
                      letterSpacing: "0.05em",
                      width: "18vw",
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              );
            }

            if (item.list) {
              return (
                <div key={index} className="text-center mb-[3vh]">
                  <div style={{ height: "2vh" }} />
                  <div
                    className="mb-[1.9vh] opacity-70 uppercase tracking-widest"
                    style={{ fontFamily: "sans-serif", fontWeight: 300, fontSize: "1.9vh" }}
                  >
                    {item.role}
                  </div>
                  {item.list.map((name, i) => (
                    <div
                      key={i}
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                        fontSize: "1.9vh",
                        marginBottom: "0.8vh",
                      }}
                    >
                      {name}
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}

          <div style={{ height: "10vh" }} />
        </div>

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[15vh] bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[15vh] bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
