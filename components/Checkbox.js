import React, { useEffect, useState } from "react";
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimation
} from "framer-motion";
const variants = {
  checked: {
    pathLength: 1,
    transition: { duration: 0.2 }
  },
  unchecked: {
    pathLength: 0,
    transition: { duration: 0.2 }
  }
};
export default function Checkbox({ checked }) {
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);
  const lineControls = useAnimation();
  const lineAnimation = async () => {
    await lineControls.start({
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.15, delay: 0.2 }
    });
    await lineControls.start({
      clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
      transition: { duration: 0.15 }
    });
    lineControls.start({
      clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
      transition: { duration: 0 }
    });
  };
  return (
    <motion.div
      className="checkbox"
      onClick={() => {
        !checked && lineAnimation();
      }}
    >
      <motion.div
        className="checkbox-container checkbox-container--back"
        animate={{
          background: checked ? "#0A8059" : "rgb(255, 255, 255)",
          transition: { delay: checked ? 0 : 0.3 }
        }}
      >
        <motion.svg
          className="checkmark checkmark--back"
          viewBox="0 0 215 180"
          animate={checked ? "checked" : "unchecked"}
        >
          <motion.path
            d="M21 88.9819L40.3022 133.001C46.7847 147.784 67.1425 149.146 75.5651 135.376C107.35 83.4098 123.233 60.8675 200 27"
            variants={variants}
            style={{ pathLength, opacity }}
            strokeDasharray="1 1"
          />
        </motion.svg>
        <div className="lines-container">
          <motion.div className="line line--1" animate={lineControls} />
          <motion.div className="line line--2" animate={lineControls} />
          <motion.div className="line line--3" animate={lineControls} />
        </div>
      </motion.div>
      <div className="checkbox-container checkbox-container--front">
        <motion.svg
          className="checkmark checkmark--front"
          viewBox="0 0 215 180"
          animate={checked ? "checked" : "unchecked"}
        >
          <motion.path
            d="M21 88.9819L40.3022 133.001C46.7847 147.784 67.1425 149.146 75.5651 135.376C107.35 83.4098 123.233 60.8675 200 27"
            variants={variants}
            style={{ pathLength, opacity }}
            strokeDasharray="1 1"
          />
        </motion.svg>
      </div>
    </motion.div>
  );
}
