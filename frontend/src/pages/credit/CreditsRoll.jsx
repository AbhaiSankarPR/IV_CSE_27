import { useEffect, useRef, useState } from "react";
import ivLogo from "../../assets/logo/Odyssey.png";

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
        "Kevin",
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
  const speed = 15;

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
        if (next < -contentHeight) return vpHeight;
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

        {/* LOGO BEFORE SCROLL STARTS */}
        <div
          ref={contentRef}
          className="absolute left-1/2 -translate-x-1/2 px-4 max-w-[95vw]"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          <div className="flex justify-center items-center mb-[6vh] mt-[6vh]">
            <img
              src={ivLogo}
              alt="IV Logo"
              className="w-[22vw] max-w-[160px] min-w-[90px] object-contain opacity-90"
            />
          </div>

          {duplicatedCredits.map((item, index) => {
            if (item.spacer)
              return <div key={index} style={{ height: "25vh" }} />;

            if (item.name) {
              return (
                <div
                  key={index}
                  className="
                    flex flex-col sm:flex-row 
                    justify-center items-center 
                    mb-[2.2vh]
                    w-full
                    text-center sm:text-left
                  "
                >
                  {item.role && (
                    <div
                      className="
                        opacity-70 uppercase tracking-widest
                        text-[1.8vh] sm:text-[1vh] md:text-[2vh]
                      "
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: 300,
                        width: "100%",
                        textAlign: "center",
                        maxWidth: "140px",
                      }}

                    >
                      {item.role}
                    </div>
                  )}

                  <div
                    className="
                      sm:ml-[3vw]
                      mt-1 sm:mt-0
                      text-[1.8vh] sm:text-[2vh] md:text-[2.2vh]
                      break-words
                    "
                    style={{
                      fontFamily: "sans-serif",
                      fontWeight: 400,
                      letterSpacing: "0.05em",
                      width: "100%",
                      textAlign: "center",
                      maxWidth: "350px",
                    }}

                  >
                    {item.name}
                  </div>
                </div>
              );
            }

            if (item.list) {
              return (
                <div
                  key={index}
                  className="text-center mb-[4vh] max-w-[90vw] mx-auto"
                >
                  <div style={{ height: "2vh" }} />

                  <div
                    className="
                      mb-[2vh] opacity-70 uppercase tracking-widest
                      text-[1.8vh] sm:text-[2vh] md:text-[2.2vh]
                    "
                    style={{ fontFamily: "sans-serif", fontWeight: 300 }}
                  >
                    {item.role}
                  </div>

                  {item.list.map((name, i) => (
                    <div
                      key={i}
                      className="
                        text-[1.8vh] sm:text-[2vh] md:text-[2.2vh]
                        break-words
                      "
                      style={{
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                        marginBottom: "1vh",
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

          <div style={{ height: "15vh" }} />
        </div>

        {/* GRADIENT FADES */}
        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[20vh] bg-gradient-to-b from-black to-transparent" />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[20vh] bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  );
}
