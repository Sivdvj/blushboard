import { useState, useEffect } from "react";
function Ripples({ count = 5, duration = 7 }) {
  let circles = Array.from({ length: count });
  let [size, setSize] = useState(0);

  useEffect(() => {
    let h = window.innerHeight;
    setSize(h);
  }, []);

  return (
    <div className="absolute inset-0 z-0 justify-center flex items-center">
      {circles.map((_, i) => (
        <div
          key={i}
          className="circle"
          style={{
            width: size,
            height: size,
            animationDuration: `${duration}s`,
            animationDelay: `${-(i * duration) / count}s`,
          }}
        ></div>
      ))}
    </div>
  );
}
export default Ripples;
