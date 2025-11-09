"use client";

import React from "react";
import { useEditorStore } from "@/lib/store";

export function PropertiesPanel() {
  const { selectedId, nodes, updateComponentProps, edges, lastSolveVoltages } = useEditorStore((s) => ({
    selectedId: s.selectedId,
    nodes: s.nodes,
    edges: s.edges,
    updateComponentProps: s.updateComponentProps,
    lastSolveVoltages: s.lastSolveVoltages,
  }));

  const node = nodes.find((n) => n.id === selectedId);
  if (!node) {
    return (
      <div className="hint">Select a component to edit properties.</div>
    );
  }

  const data: any = node.data ?? {};

  return (
    <div>
      <div className="section-title">Selected</div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div style={{ fontWeight: 700 }}>{data.label ?? node.type}</div>
        <div style={{ color: "#94a3b8", fontSize: 12 }}>ID: {node.id}</div>
      </div>

      {node.type === "resistor" && (
        <div className="card">
          <label className="label">Resistance (?)</label>
          <input
            className="input"
            type="number"
            step="1"
            min="0.001"
            value={data.resistance ?? 1000}
            onChange={(e) => updateComponentProps(node.id, { resistance: Number(e.target.value) })}
          />
        </div>
      )}
      {node.type === "vsource" && (
        <div className="card">
          <label className="label">Voltage (V)</label>
          <input
            className="input"
            type="number"
            step="0.1"
            value={data.voltage ?? 5}
            onChange={(e) => updateComponentProps(node.id, { voltage: Number(e.target.value) })}
          />
        </div>
      )}

      <div style={{ height: 12 }} />
      <div className="section-title">Solve results</div>
      <div className="card">
        {lastSolveVoltages ? (
          <pre style={{ margin: 0, fontSize: 12, color: "#93c5fd" }}>{JSON.stringify(lastSolveVoltages, null, 2)}</pre>
        ) : (
          <div className="hint">Run Simulate DC to compute node voltages.</div>
        )}
      </div>
    </div>
  );
}
