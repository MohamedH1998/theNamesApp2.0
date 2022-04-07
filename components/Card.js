/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { Switch } from "@headlessui/react";
import React from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import shareName from "../utils/shareName";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

function toMemoCard({ name, index, setIndexOfCardToUpdate }) {
  const [checked, setChecked] = useState(false);
  const [copyToClipboard, setCopyToClipBoard] = useState(false);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem("memorized_names"));
    setChecked(storedNames.includes(name._id));
  });

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
    <div className="flex h-full w-full select-none flex-col items-center rounded-lg bg-white px-4 py-4 shadow-md">
      <div className="flex flex-col items-center justify-start">
        <p className="absolute top-2 left-2 p-4 text-xs font-medium text-gray-500">
          {index + 1}
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
        <p className="mt-3 text-center text-xl font-semibold">{name.name}</p>
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
    </div>
  );
}

const Card = React.memo(toMemoCard);

export default Card;
