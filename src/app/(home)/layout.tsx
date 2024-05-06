"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import SideBar from "../_components/sidebar";
import AppNavbar from "../_components/app-navbar/app-navbar";
import FeedsNavbar from "../_components/feeds-navbar";
import SearchBar from "../_components/searchBar/search-bar";

type Props = {
  children: React.ReactNode;
};

const MainUILayout = ({ children }: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto box-border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          className="hidden md:block"
          minSize={5}
          defaultSize={20}
        >
          <SideBar />
        </ResizablePanel>

        <ResizableHandle className="hidden md:block" />

        <ResizablePanel minSize={50} defaultSize={55} className="h-full">
          {/* <div className="block md:hidden"> */}
          <AppNavbar />
          {/* </div> */}
          {children}
        </ResizablePanel>

        <ResizableHandle className="hidden md:block" />

        <ResizablePanel
          className="hidden md:block"
          minSize={20}
          defaultSize={25}
        >
          <SearchBar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MainUILayout;
