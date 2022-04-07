import { motion } from "framer-motion";
import { useEffect } from "react";

export default function CircularProgressBar({ indexOfCardToUpdate }) {
  let storedNames = JSON.parse(localStorage.getItem("memorized_names"));

  let pathLength = storedNames.length / 99;
  useEffect(() => {
    storedNames = JSON.parse(localStorage.getItem("memorized_names"));
    pathLength = storedNames.length / 99;
  }, [
    JSON.parse(localStorage.getItem("memorized_names")),
    indexOfCardToUpdate
  ]);

  const namesMemorizedFormatted =
    storedNames.length < 10 ? `0${storedNames.length}` : storedNames.length;

  return (
    <div className="relative flex items-center justify-center">
      <div>
        <svg className=" h-14 w-14" viewBox="0 0 60 60">
          <path
            fill="currentColor"
            strokeWidth="5"
            stroke="currentColor"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            // initial={{
            //   pathLength
            // }}
            className="fill-transparent stroke-gray-200/50"
            style={{
              strokeLinecap: "round",
              transform: "translateX(5px) translateY(5px)"
            }}
          />
        </svg>
      </div>
      <div className="absolute top-0 left-0 h-14 w-14">
        <p
          style={{ fontFamily: "Roboto Mono", fontWeight: "600" }}
          className="translate-x-[16px] translate-y-3 text-sm font-semibold text-clr-success"
        >
          {`${namesMemorizedFormatted}`}
        </p>
      </div>
      <div className="absolute top-0 left-0">
        <svg className="h-14 w-14" viewBox="0 0 60 60">
          <motion.path
            fill="currentColor"
            strokeWidth="5"
            stroke="currentColor"
            strokeDasharray="0 1"
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            className={`fill-transparent transition-colors duration-150 ease-out ${
              storedNames.length == 0
                ? "stroke-transparent"
                : "stroke-clr-success"
            }`}
            initial={{
              pathLength: 0
            }}
            animate={{
              pathLength
            }}
            transition={{ duration: 0.5 }}
            style={{
              strokeLinecap: "round",
              rotate: 90,
              translateX: 5,
              translateY: 5,
              scaleX: -1 // Reverse direction of line animation
            }}
          />
        </svg>
      </div>
    </div>
  );
}
