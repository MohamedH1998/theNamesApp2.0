import { motion } from "framer-motion";

const top = {
  closed: {
    rotate: 0,
    translateY: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },
  opened: {
    rotate: 45,
    translateY: 7,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};
const center = {
  closed: {
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },
  opened: {
    opacity: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

const bottom = {
  closed: {
    rotate: 0,
    translateY: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },

  opened: {
    rotate: -45,
    translateY: -7,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  }
};

export default function MenuToggle({ isOpen }) {
  return (
    <div className="z-[99]">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 16"
        initial="closed"
        animate={isOpen ? "opened" : "closed"}
        className="w-6 h-6 fill-current "
      >
        <motion.rect
          variants={top}
          width="24"
          height="2"
          rx="1"
          style={{ originX: "12px", originY: "1px" }}
        />
        <motion.rect variants={center} y="7" width="24" height="2" rx="1" />
        <motion.rect
          variants={bottom}
          y="14"
          width="24"
          height="2"
          rx="1"
          style={{ originX: "12px", originY: "15px" }}
        />
      </motion.svg>
    </div>
  );
}
