import { useState } from "react";
import { Switch } from "@headlessui/react";
import CheckListToggle from "../components/CheckListToggle";
import ReviewToggle from "../components/ReviewToggle";
import StackToggle from "../components/StackToggle";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";

export default function Dock({
  names,
  setIndexOfCardToUpdate,
  indexOfCardToUpdate
}) {
  const [stackToggle, setStackToggle] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="fixed bottom-5 left-1/2 z-[2] flex w-max -translate-x-1/2 space-x-6 rounded-full bg-[rgba(252,252,252,0.55)] py-2 shadow-md backdrop-blur-sm">
      <Switch
        checked={stackToggle}
        onChange={() => setStackToggle(!stackToggle)}
      >
        <AnimatePresence>
          {stackToggle && (
            <Modal
              stackToggle={stackToggle}
              setStackToggle={setStackToggle}
              names={names}
              indexOfCardToUpdate={indexOfCardToUpdate}
              setIndexOfCardToUpdate={setIndexOfCardToUpdate}
            />
          )}
        </AnimatePresence>

        <i className="flex w-full px-16">
          <StackToggle />
        </i>
      </Switch>
    </div>
  );
}
