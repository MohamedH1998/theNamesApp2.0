import { motion, useMotionValue, animate, useTransform } from "framer-motion";
import { useGesture } from "@use-gesture/react";
import { useEffect, useRef, useState, useMemo } from "react";
import useWindowSize from "../hooks/useWindowSize";
import Image from "next/image";

import Card from "./Card";
import Dock from "./Dock";
import { urlFor } from "../lib/sanity";

export default function CardDisplay({
  names,
  indexOfCardToUpdate,
  setIndexOfCardToUpdate
}) {
  const storedNames = JSON.parse(localStorage.getItem("memorized_names"));

  //draggable ref on the main cards div
  const draggable = useRef();
  const viewportWidth = useWindowSize().width;

  //Calculates card width, height, initial gap and gap between responsively to viewport width
  const cardWidth = viewportWidth * 0.75 > 350 ? 300 : viewportWidth * 0.7;

  const cardHeight = cardWidth * 1.3;
  const initialGap = (viewportWidth - cardWidth) / 2;
  const gapBetween = initialGap / 2.5;

  //Generate the transform input and output arrays for framer
  const [input, scaleEven, scaleOdd] = useMemo(() => {
    const scaleEven = [];
    const scaleOdd = [];
    const input = [];
    let pos = 0;
    const smallScale = 0.9;
    const bigScale = 1.05;
    for (let i = 0; i < names.length; i++) {
      input.push(pos);
      i % 2
        ? scaleEven.push(smallScale) && scaleOdd.push(bigScale)
        : scaleEven.push(bigScale) && scaleOdd.push(smallScale);
      pos = pos - (cardWidth + gapBetween);
    }
    return [input, scaleEven, scaleOdd];
  }, [cardWidth, initialGap, names.length]);

  //Motion values for cards
  const x = useMotionValue(0);
  const scaleEvenValue = useTransform(x, input, scaleEven);
  const scaleOddValue = useTransform(x, input, scaleOdd);

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx], direction: [dirX] }) => {
        x.stop();

        //Rubberbanding if draggable moved too far right
        const isTooRight =
          dirX > 0 && draggable.current.getBoundingClientRect().x >= 0;
        if (isTooRight) {
          x.set(dirX * Math.sqrt(Math.abs(dx * 40)));
          return;
        }

        x.set(dx);
      },
      onWheel: ({ velocity: [, vy], direction: [, dirY] }) => {
        x.stop();

        //Don't move if we are at the begninning of list
        if (dirY < 0 && draggable.current.getBoundingClientRect().x >= 0) {
          return;
        }

        //Don't move when we get to end of cards
        if (
          dirY > 0 &&
          Math.abs(draggable.current.getBoundingClientRect().x) >=
            Math.abs(
              draggable.current.getBoundingClientRect().width -
                cardWidth -
                initialGap
            )
        ) {
          return;
        }

        let mutliplier = 220;

        //Calculates drag to position based on velocity of wheel
        const dragToPosition =
          draggable.current.getBoundingClientRect().x - vy * mutliplier * dirY;

        //if we try to drag to left of start of draggable then animate it to the start
        if (dragToPosition > 0) {
          animate(x, 0, {
            type: "tween",
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }

        //Determine what card is at the center of where we are going to drag to
        const indexToSetTo = Math.round(
          dragToPosition / (cardWidth + gapBetween)
        );

        //Finds the x value of that card
        const newXVal = -1 * Math.abs(indexToSetTo * (gapBetween + cardWidth));

        //if that card is past the end of list, move to the last card
        if (Math.abs(indexToSetTo) >= names.length - 1) {
          const xValOfLastElement =
            -1 *
            (draggable.current.getBoundingClientRect().width -
              initialGap -
              cardWidth);

          animate(x, xValOfLastElement, {
            type: "tween",
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }

        //else animate to the card value
        animate(x, newXVal, {
          type: "tween",
          duration: 0.8,
          ease: [0.25, 1, 0.5, 1]
        });
      },

      onWheelEnd: ({
        movement: [mx, my],
        offset: [dx, dy],
        velocity: [vx, vy],
        direction: [dirX, dirY]
      }) => {
        //if we are too far right then move to start of cards
        if (draggable.current.getBoundingClientRect().x > 0) {
          animate(x, 0, {
            type: "tween",
            duration: 1,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }

        const xValOfLastElement =
          -1 *
          (draggable.current.getBoundingClientRect().width -
            initialGap -
            cardWidth);

        //if we wheel past the end of list, animate to the end of list
        if (
          Math.abs(draggable.current.getBoundingClientRect().x) >
          Math.abs(
            draggable.current.getBoundingClientRect().width -
              cardHeight -
              initialGap
          )
        ) {
          animate(x, xValOfLastElement, {
            type: "tween",
            duration: 1,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }
      },

      onDragEnd: ({ velocity: [vx], direction: [dirX] }) => {
        x.stop();

        //if we are too left, animate to start
        if (draggable.current.getBoundingClientRect().x > 0) {
          animate(x, 0, {
            type: "tween",
            duration: 1,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }

        const xValOfLastElement =
          -1 *
          (draggable.current.getBoundingClientRect().width -
            initialGap -
            cardWidth);

        //find where we should animate to depending on the velocity of the swipe
        const dragToPosition =
          draggable.current.getBoundingClientRect().x + vx * 300 * dirX;

        //the index of the card thats closest to that drag position
        const indexToSetTo = Math.round(
          dragToPosition / (cardWidth + gapBetween)
        );

        //the x value of the card at that index
        const newXVal =
          dragToPosition > 0
            ? 0
            : -1 * Math.abs(indexToSetTo * (gapBetween + cardWidth));

        //if that card is beyond the list, then animate to the end of list
        if (Math.abs(indexToSetTo) >= names.length - 1) {
          animate(x, xValOfLastElement, {
            type: "tween",
            duration: 0.8,
            ease: [0.25, 1, 0.5, 1]
          });

          return;
        }

        animate(x, newXVal, {
          type: "spring",
          bounce: 0,
          duration: 0.8
        });
      }
    },
    {
      drag: {
        //Sets the offset based on current position of draggable
        from: () => [draggable.current.getBoundingClientRect().x, 0],
        filterTaps: true
      }
    }
  );

  return (
    <div
      className="flex h-full w-full items-center overflow-hidden"
      style={{ minHeight: cardHeight * 1.1 }}
    >
      <motion.div
        className={`relative flex  items-stretch justify-start`}
        ref={draggable}
        {...bind()}
        style={{ touchAction: "none", x, columnGap: gapBetween }}
      >
        {names.map((name, indx) => (
          <motion.div
            key={name._id}
            style={{
              width: cardWidth,
              height: cardHeight,
              marginLeft: indx == 0 ? initialGap : 0,
              scale: indx % 2 == 0 ? scaleEvenValue : scaleOddValue
            }}
            className={` flex  flex-shrink-0 cursor-grab`}
          >
            <Card
              name={name}
              index={indx}
              initialChecked={storedNames.includes(name._id)}
              shouldUpdate={indexOfCardToUpdate == indx}
              setIndexOfCardToUpdate={setIndexOfCardToUpdate}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
