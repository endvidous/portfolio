import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  const dotX = useSpring(mx, { stiffness: 700, damping: 40, mass: 0.4 });
  const dotY = useSpring(my, { stiffness: 700, damping: 40, mass: 0.4 });
  const ringX = useSpring(mx, { stiffness: 120, damping: 22, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnterInteractive = () => setHovering(true);
    const onLeaveInteractive = () => setHovering(false);

    window.addEventListener("mousemove", onMove);

    const interactives = document.querySelectorAll("a, button, [role='button']");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, [visible]);

  return (
    <>
      {/* Outer ring — lags behind */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9995]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? 1 : 0,
          borderColor: hovering ? "rgba(177, 116, 87, 0.8)" : "rgba(236, 223, 204, 0.35)",
        }}
        transition={{ duration: 0.2 }}
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1px solid rgba(236, 223, 204, 0.35)",
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9995,
        }}
      />
      {/* Dot — precise */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9996]"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          borderRadius: "50%",
          backgroundColor: hovering ? "#B17457" : "#ECDFCC",
          opacity: visible ? 1 : 0,
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 9996,
        }}
        animate={{
          width: hovering ? 6 : 5,
          height: hovering ? 6 : 5,
          backgroundColor: hovering ? "#B17457" : "#ECDFCC",
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
};

export default CustomCursor;
