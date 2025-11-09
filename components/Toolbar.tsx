"use client";

import React from "react";
import { useEditorStore } from "@/lib/store";

export function Toolbar() {
  const { simulate, exportDesign, importDesign, clear, lastSolveError, lastSolveVoltages } = useEditorStore(
    (s) => ({
      simulate: s.simulate,
      exportDesign: s.exportDesign,
      importDesign: s.importDesign,
      clear: s.clear,
      lastSolveError: s.lastSolveError,
      lastSolveVoltages: s.lastSolveVoltages,
    })
  );

  const fileRef = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <button className="button" onClick={simulate}>Simulate DC</button>
      <button className="button secondary" onClick={() => {
        const json = exportDesign();
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "design.json";
        a.click();
        URL.revokeObjectURL(url);
      }}>Export</button>
      <button className="button secondary" onClick={() => fileRef.current?.click()}>Import</button>
      <button className="button danger" onClick={clear}>Clear</button>
      <input ref={fileRef} type="file" accept="application/json" style={{ display: "none" }} onChange={async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        importDesign(text);
      }} />
      <div style={{ marginLeft: "auto", color: lastSolveError ? "var(--danger)" : "#94a3b8", fontSize: 13 }}>
        {lastSolveError ? `Error: ${lastSolveError}` : lastSolveVoltages ? `Solved nodes: ${Object.keys(lastSolveVoltages).length}` : ""}
      </div>
    </>
  );
}
