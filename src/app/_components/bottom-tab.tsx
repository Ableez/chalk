import { Button } from "@/components/ui/button";
import {
  BellIcon,
  EnvelopeClosedIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from "@radix-ui/react-icons";
import React from "react";

const BottomTab = () => {
  return (
    <div className="flex justify-center gap-4 w-full">
      <Button size={"icon"} variant={"ghost"}>
        <HomeIcon />
      </Button>
      <Button size={"icon"} variant={"ghost"}>
        <MagnifyingGlassIcon />
      </Button>
      <Button size={"icon"} variant={"ghost"}>
        <BellIcon />
      </Button>
      <Button size={"icon"} variant={"ghost"}>
        <EnvelopeClosedIcon />
      </Button>
    </div>
  );
};

export default BottomTab;
