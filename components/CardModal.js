import { urlFor } from "../lib/sanity";
import Image from "next/image";
import CheckCircle from "./CheckCircle";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import useWindowSize from "../hooks/useWindowSize";
import { Switch } from "@headlessui/react";
import { IoShareSocialSharp } from "react-icons/io5";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

import { useEffect, useState } from "react";

export default function CardModal({
  setCardModal,
  name,
  initialChecked,
  setIndexOfCardToUpdate,
  indexOfCardToUpdate,
  index
}) {
  const viewportWidth = useWindowSize().width;

  //Calculates card width, height, initial gap and gap between responsively to viewport width
  const cardWidth =
    viewportWidth * 0.75 > 350 ? 300 : viewportWidth * 0.7 * 1.1;
  const cardHeight = cardWidth * 1.3 * 1.1;
  const [hasChanged, setHasChanged] = useState(false);

  const [checked, setChecked] = useState(initialChecked);
  const [copyToClipboard, setCopyToClipBoard] = useState(false);

  function handleMemorizedNameToggle(name) {
    const status = !checked;
    setChecked(status);
    const storedNames = JSON.parse(localStorage.getItem("memorized_names"));

    // if checked and name is not in array, add it to array
    if (!storedNames.includes(name._id) && status == true) {
      localStorage.setItem(
        "memorized_names",
        JSON.stringify([...storedNames, name._id])
      );
    }

    //if unchecked and name is in array, remove it
    if (status == false && storedNames.includes(name._id)) {
      localStorage.setItem(
        "memorized_names",
        JSON.stringify([...storedNames.filter((i) => i != name._id)])
      );
    }

    setIndexOfCardToUpdate(index);
    setHasChanged(!hasChanged);
  }

  useEffect(() => {
    setIndexOfCardToUpdate(-1);
  }, [hasChanged]);
  return (
    <Dialog
      open={true}
      onClose={setCardModal}
      as={motion.div}
      className="fixed inset-0 z-10"
    >
      <Dialog.Overlay
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }
        }}
        exit={{
          opacity: 0,
          transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
        }}
        className="fixed inset-0 h-full w-full bg-slate-700/60 backdrop-blur-sm"
      />

      <div className="pointer-events-none relative flex h-full w-full flex-col items-center justify-center px-4 ">
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            y: 0,
            scale: 1,
            transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }
          }}
          exit={{
            y: "150%",
            scale: 0.8,
            transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
          }}
          style={{ width: cardWidth, height: cardHeight }}
          className="pointer-events-auto relative flex flex-col items-center rounded-lg bg-white px-4 py-4 shadow-md "
        >
          <div className="flex flex-col items-center justify-start">
            <p className="absolute top-2 left-2 p-4 text-xs font-medium text-gray-500">
              {name.order}
            </p>
            <div className="mt-2 h-16 w-auto">
              <Image
                src={urlFor(name.svg).url()}
                width={87}
                height={64}
                className="mx-auto h-full w-max object-contain"
                alt="name"
                priority
              />
            </div>
            <p className="mt-3 text-center text-xl font-semibold">
              {name.name}
            </p>
            <p className="mt-1 text-center text-xs">{name.translation}</p>
            <p className="mt-3 text-left text-sm">{name.definition}</p>
          </div>
          <div className="mt-auto ">
            <Switch
              checked={checked}
              onChange={() => handleMemorizedNameToggle(name)}
            >
              <i className="text-3xl text-clr-success">
                {checked ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}
              </i>
            </Switch>
          </div>
          <div className="group">
            <button
              onClick={() => shareName(name, setCopyToClipBoard)}
              className="absolute top-4 right-4 text-3xl text-clr-secondary-accent"
            >
              <IoShareSocialSharp />
            </button>
            <span
              className={`text-mt-2 absolute ${
                copyToClipboard ? "-right-10" : "-right-2"
              } top-12 z-50 hidden rounded bg-gray-700 px-3 py-2 text-center text-xs text-white hover:invisible group-hover:block`}
            >
              {copyToClipboard ? "Copied to Clipboard" : "Copy"}
            </span>
          </div>
        </motion.div>
      </div>
    </Dialog>
  );
}
