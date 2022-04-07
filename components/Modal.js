import { Dialog } from "@headlessui/react";
import { MdClose } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import CardModal from "./CardModal";
import { Switch } from "@headlessui/react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";

export default function Modal({
  setStackToggle,
  names,
  stackToggle,
  indexOfCardToUpdate,
  setIndexOfCardToUpdate
}) {
  let storedNames = JSON.parse(localStorage.getItem("memorized_names"));
  const [cardModal, setCardModal] = useState(false);
  const [cardToShowIndex, setCardToShowIndex] = useState(0);

  const [hasChanged, setHasChanged] = useState(false);

  function handleMemorizedNameToggle(name, index) {
    storedNames = JSON.parse(localStorage.getItem("memorized_names"));

    const status = storedNames.includes(name._id);

    // if checked and name is not in array, add it to array
    if (status == false) {
      localStorage.setItem(
        "memorized_names",
        JSON.stringify([...storedNames, name._id])
      );
    }
    //if unchecked and name is in array, remove it
    if (status == true) {
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
    <>
      <Dialog
        open={stackToggle}
        onClose={setStackToggle}
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
          className="fixed inset-0 w-full h-full bg-slate-700/60 backdrop-blur-sm"
        />

        <div className="relative flex flex-col items-center justify-center w-full h-full px-4 pointer-events-none ">
          <motion.div
            initial={{ y: "120%" }}
            animate={{
              y: 0,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }
            }}
            exit={{
              y: "120%",
              transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
            }}
            className=" pointer-events-auto relative h-[80%] w-full max-w-xl overflow-hidden rounded-md bg-gray-50 py-2 pb-12"
          >
            <div className="flex items-center justify-between px-4 py-2 ">
              <Dialog.Title className="font-medium">Names</Dialog.Title>
              <button onClick={() => setStackToggle(false)}>
                <MdClose size={24} />
              </button>
            </div>
            <div className="w-full h-full mt-2 overflow-hidden overflow-y-scroll ">
              {names.map((name, index) => (
                <div key={name._id}>
                  <div className=" flex items-center  justify-between border-b-[1px] py-4 px-4">
                    <div
                      className="flex items-center flex-grow space-x-2 cursor-pointer"
                      onClick={() => {
                        setCardToShowIndex(index);
                        setCardModal(true);
                      }}
                    >
                      <span className="text-sm ">{`${index + 1}.`}</span>
                      <span className="text-lg">{name.name}</span>
                    </div>

                    <div className="flex mt-2">
                      <Switch
                        checked={storedNames.includes(name._id)}
                        onChange={() => handleMemorizedNameToggle(name)}
                      >
                        <i className="text-2xl transition ease-in-out delay-150 animate-pulse text-clr-success ">
                          {storedNames.includes(name._id) ? (
                            <ImCheckboxChecked />
                          ) : (
                            <ImCheckboxUnchecked />
                          )}
                        </i>
                      </Switch>
                    </div>
                  </div>
                </div>
              ))}

              <AnimatePresence>
                {cardModal && (
                  <CardModal
                    indexOfCardToUpdate={indexOfCardToUpdate}
                    setIndexOfCardToUpdate={setIndexOfCardToUpdate}
                    setCardModal={setCardModal}
                    name={names[cardToShowIndex]}
                    initialChecked={storedNames.includes(
                      names[cardToShowIndex]._id
                    )}
                    index={cardToShowIndex}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Dialog>
    </>
  );
}
