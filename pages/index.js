import Head from "next/head";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { groq } from "next-sanity";
import { Switch } from "@headlessui/react";
import { getClient } from "../lib/sanity.server";
import { use100vh } from "react-div-100vh";
import Confetti from "react-confetti";
import MenuToggle from "../components/MenuToggle";
import CardDisplay from "../components/CardsDisplay";
import Dock from "../components/Dock";
import Container from "../components/Container";
import CircularProgressBar from "../components/CircularProgressBar";
import Nav from "../components/Nav";
import ToastComponent from "../components/Toast";
import useWindowSize from "../hooks/useWindowSize";
import handleMileStone from "../utils/handleMileStone";

export default function Home({ names }) {
  const hasWindow = typeof window !== "undefined";
  const [indexOfCardToUpdate, setIndexOfCardToUpdate] = useState(-1);
  const [hasMounted, setHasMounted] = useState(false);
  const [milestone, setMilestone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  let memorized_names = hasWindow
    ? JSON.parse(localStorage.getItem("memorized_names"))
    : [];

  //Sets mounted first time component loads (to make sure we have window object when we render)
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("memorized_names"))) {
      localStorage.setItem("memorized_names", JSON.stringify([]));
    }

    setHasMounted(true);
  }, []);

  const viewportWidth = useWindowSize().width;
  const height = use100vh();

  useEffect(() => {
    if (memorized_names) {
      handleMileStone(memorized_names, setMilestone);
    }
  }, [memorized_names]);

  //return null if we don't have a window object
  if (!hasMounted || !viewportWidth) {
    return null;
  }

  return (
    <>
      <Head>
        <title>theNames</title>
      </Head>
      <div
        style={{ height: height }}
        className="flex flex-col bg-clr-bg text-slate-800 antialiased"
      >
        {
          // if milestone is hit, render Confetti
          milestone ? (
            <Confetti
              width={viewportWidth}
              height={height}
              recycle={false}
              run={() => setTimeout(() => false, 2000)}
            />
          ) : null
        }
        <header>
          <Container>
            <div className="pt-4">
              <div className="flex items-center justify-between">
                <div className="h-12 w-14">
                  <CircularProgressBar
                    indexOfCardToUpdate={indexOfCardToUpdate}
                  />
                </div>
                <span className="text-2xl font-black">theNames</span>
                <div className="">
                  <div className="flex items-center space-x-5 ">
                    <Dock
                      names={names}
                      indexOfCardToUpdate={indexOfCardToUpdate}
                      setIndexOfCardToUpdate={setIndexOfCardToUpdate}
                    />
                    <Switch
                      checked={menuOpen}
                      onChange={setMenuOpen}
                      className="z-[50]"
                    >
                      <div
                        className={`z-50 ${
                          menuOpen && "text-clr-bg"
                        } transition duration-1000 ease-out `}
                      >
                        <MenuToggle isOpen={menuOpen} />
                      </div>
                    </Switch>
                  </div>
                  <Nav isOpen={menuOpen} />
                </div>
              </div>
            </div>
          </Container>
        </header>

        <main className="flex h-full flex-col">
          <div className="pb-2">
            <div className="flex flex-col items-center justify-center text-center">
              <section className="relative flex max-w-[500px] justify-center md:w-9/12">
                <div className="heading z-[2] w-full px-2 pt-5">
                  <h1 className="max-w-[450px] text-left text-4xl font-extrabold sm:text-4xl md:pr-10 ">
                    Learn the 99
                    <br /> Names of Allah
                  </h1>
                  <h2 className="max-w-[500px] pt-2 text-left text-sm font-semibold italic md:pr-10 md:text-lg">
                    “Allah has the Most Beautiful Names.
                    <br />
                    So call upon Him by them”
                    <span className="inline">- 7:115</span>
                  </h2>
                </div>
                <div className="absolute top-2 right-2 z-0">
                  <svg
                    width="150"
                    height="150"
                    viewBox="0 0 150 150"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M149.997 69.4003C150.343 89.98 124.437 116.322 107.545 129.165C90.6527 142.008 66.5632 156.953 48.6439 146.459C30.7246 135.965 1.04806 88.9555 0.0291195 66.2031C-0.989823 43.4507 24.9571 20.0308 42.5302 9.94476C60.1034 -0.141292 87.5569 -4.22249 105.468 5.68677C123.379 15.596 149.65 48.8206 149.997 69.4003C150.343 89.98 124.437 116.322 107.545 129.165Z"
                      fill="#DE7254"
                    />
                  </svg>
                </div>
              </section>
            </div>
          </div>
          {/* Cards Display */}
          <div>
            <CardDisplay
              names={names}
              indexOfCardToUpdate={indexOfCardToUpdate}
              setIndexOfCardToUpdate={setIndexOfCardToUpdate}
            />
          </div>
          <ToastComponent
            setMilestone={setMilestone}
            memorized_names={memorized_names}
            active={milestone}
            milestone={milestone}
          />
        </main>
      </div>
    </>
  );
}

export async function getStaticProps(_) {
  const data = await getClient(false).fetch(
    groq`*[_type == "name"] | order(order asc)`
  );

  return {
    props: {
      names: data
    } // will be passed to the page component as props
  };
}
