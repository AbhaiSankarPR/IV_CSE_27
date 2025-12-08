import { useEffect, useRef } from "react";

export default function Snowfall({
    numFlakes = 150,
    maxSize = 4,
    maxSpeed = 1.5,
    wind = 0.3,
    style = {},
}) {
    const canvasRef = useRef(null);
    const flakes = useRef([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        flakes.current = Array.from({ length: numFlakes }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * maxSize + 1,
            speed: Math.random() * maxSpeed + 0.2,
            sway: Math.random() * 1 + 0.3,
        }));

        let animationFrame;

        const update = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            flakes.current.forEach((flake) => {
                ctx.beginPath();
                ctx.fillStyle = "white";
                ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
                ctx.fill();

                flake.y += flake.speed;
                flake.x += Math.sin(flake.y * 0.02) * flake.sway + wind;

                if (flake.y > canvas.height) {
                    flake.y = -10;
                    flake.x = Math.random() * canvas.width;
                }
            });

            animationFrame = requestAnimationFrame(update);
        };

        update();

        return () => {
            cancelAnimationFrame(animationFrame);
            window.removeEventListener("resize", resize);
        };
    }, [numFlakes, maxSize, maxSpeed, wind]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 1,
                ...style,
            }}
        />
    );
}
