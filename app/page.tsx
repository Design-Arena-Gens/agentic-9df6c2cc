"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Toolbar } from "@/components/Toolbar";
import { Palette } from "@/components/Palette";
import { PropertiesPanel } from "@/components/PropertiesPanel";

const EditorCanvas = dynamic(() => import("@/components/EditorCanvas"), { ssr: false });

export default function Page() {
  return (
    <div className="app">
      <div className="toolbar"><Toolbar /></div>
      <div className="palette"><Palette /></div>
      <div className="editor"><EditorCanvas /></div>
      <div className="props"><PropertiesPanel /></div>
    </div>
  );
}
