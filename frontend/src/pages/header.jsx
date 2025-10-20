import { useEffect, useRef } from "react";

export default function Header({children}) {
  const headerRef = useRef(null);

  useEffect(() => {
    // Dynamically load the script
    const script = document.createElement("script");
    script.src = "../../public/finisher-header.es5.min.js";
    script.async = true;
    script.onload = () => {
      if (window.FinisherHeader) {
        new window.FinisherHeader({
          count: 100,
          size: { min: 2, max: 8, pulse: 0 },
          speed: {
            x: { min: 0, max: 0.4 },
            y: { min: 0, max: 0.6 },
          },
          colors: {
            background: "#f0eeff",
            particles: ["#000000", "#000000", "#000000"],
          },
          blending: "overlay",
          opacity: { center: 1, edge: 0.85 },
          skew: 0,
          shapes: ["c", "s"],
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      // Optional cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      ref={headerRef}
      className="header finisher-header"
      style={{ width: "100%", height: "300px" }}
    >
      Congrats
    </div>
  );
}
