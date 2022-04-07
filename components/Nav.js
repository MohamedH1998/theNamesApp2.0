import Link from "next/link";
import { motion } from "framer-motion";

const stagger = {
  initial: {
    display: "none",
    width: 0,
    height: 0,
    transition: {
      staggerChildren: 0.025,
      when: "afterChildren"
    }
  },
  animate: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    transition: {
      duration: 0.01,
      staggerChildren: 0.05,
      when: "beforeChildren"
    }
  }
};

const overlayVariant = {
  initial: {
    x: "-100%",

    transition: {
      duration: 0.6,

      easing: "easeOut"
    },
    transitionEnd: {
      display: "none"
    }
  },
  animate: {
    x: 0,
    display: "block",
    transition: {
      duration: 0.4,
      easing: "easeIn"
    }
  }
};

const linksVariant = {
  initial: {
    x: "-30%",
    opacity: 0,
    transition: {
      duration: 0.3,
      easing: "easeIn"
    }
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      easing: "easeIn"
    }
  }
};

export default function Nav({ isOpen }) {
  return (
    <div className="z-50 text-clr-bg">
      <motion.div
        initial="initial"
        animate={isOpen ? "animate" : "initial"}
        variants={overlayVariant}
        className="fixed inset-0 top-0 left-0 z-[7] h-screen w-screen bg-clr-secondary-accent"
      ></motion.div>
      <motion.div
        initial="initial"
        animate={isOpen ? "animate" : "initial"}
        variants={stagger}
        className="w-fill fixed inset-0 top-0 left-0 z-[7] mx-auto flex max-w-4xl flex-col items-center justify-center space-y-24 px-14"
      >
        {/* <motion.div variants={linksVariant}>
          <Link href="#">
            <a className="text-2xl font-semibold tracking-wider capitalize transition-colors rounded-md hover:text-white focus:outline-none focus-visible:ring-2">
              About
            </a>
          </Link>
        </motion.div> */}
        <motion.div variants={linksVariant}>
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScBlK9f2O1X7nV9ry7JvjBJB0g4g_fgJ_XCJA2vVgGFZGP7YQ/viewform">
            <a
              target="_blank"
              rel="noreferrer"
              className="text-2xl font-semibold tracking-wider capitalize transition-colors rounded-md hover:text-white focus:outline-none focus-visible:ring-2"
            >
              Feedback
            </a>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
