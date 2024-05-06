import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

import ProfileButton from "./profile-button";
import Logo from "@/components/global/logo";
import { Button } from "@/components/ui/button";
import { SettingsIcon } from "@/components/icons/icons";

const AppNavbar = () => {
  const { scrollYProgress } = useScroll();

  const [visibleApp, setVisibleApp] = useState(false);
  const [visibleFeed, setVisibleFeed] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      const direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.03) {
        setVisibleApp(true);
      } else {
        if (direction < 0) {
          setVisibleApp(true);
        } else {
          setVisibleApp(false);
        }
      }

      if (scrollYProgress.get() < 0.02) {
        setVisibleFeed(true);
      } else {
        if (direction < 0) {
          setVisibleFeed(true);
        } else {
          setVisibleFeed(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <div className="fixed top-0 w-full">
        <motion.div
          initial={{
            opacity: 1,
            y: -10,
          }}
          animate={{
            y: visibleApp ? 0 : -10,
            opacity: visibleApp ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn("bg-black")}
        >
          <div className="align-middle justify-between place-items-center px-2 py-4 md:hidden flex">
            <ProfileButton />
            <Logo />
            <Link href={"/settings/timeline"}>
              <Button variant={"ghost"} size={"icon"}>
                <SettingsIcon />
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 1,
            y: -10,
          }}
          animate={{
            y: visibleFeed ? 0 : -20,
            opacity: visibleFeed ? 1 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
          className={cn(" bg-black")}
        >
          <div className="px-2 align-middle justify-between grid grid-flow-col grid-cols-2 items-center place-items-center">
            <Link
              href={""}
              className="w-full flex place-items-center hover:bg-neutral-800 transition-colors duration-300"
            >
              <Button
                variant={"ghost"}
                className="rounded-none border-b-2 border-primary py-6 mx-auto hover:bg-transparent"
              >
                For you
              </Button>
            </Link>
            <Link
              href={""}
              className="w-full flex place-items-center hover:bg-neutral-800 transition-colors duration-300"
            >
              <Button
                className="rounded-none py-6 mx-auto hover:bg-transparent"
                variant={"ghost"}
              >
                Following
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppNavbar;
