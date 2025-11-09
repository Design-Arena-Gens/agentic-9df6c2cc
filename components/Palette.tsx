"use client";

import React from "react";
import { useEditorStore } from "@/lib/store";

export function Palette() {
  const add = useEditorStore((s) => s.addComponent);
  return (
    <div>
      <div className="section-title">Components</div>
      <div className="card" style={{ display: "grid", gridTemplateColumns: "1fr", gap: 8 }}>
        <button className="button" onClick={() => add("resistor")}>Resistor</button>
        <button className="button" onClick={() => add("vsource")}>DC Source</button>
        <button className="button" onClick={() => add("ground")}>Ground</button>
      </div>
      <div style={{ marginTop: 12 }} className="hint">
        Drag endpoints to wire components. Add a ground for reference (0V).
      </div>
    </div>
  );
}
