"use client";

import React, { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  NodeProps,
  Handle,
  Position,
  addEdge,
  Connection,
  Edge as RFEdge,
  Node as RFNode,
} from "reactflow";
import "reactflow/dist/style.css";
import { useEditorStore } from "@/lib/store";

function Port({ id, position }: { id: string; position: Position }) {
  return (
    <Handle id={id} type="source" position={position} style={{ width: 10, height: 10, background: "#22d3ee", border: "2px solid #083344" }} />
  );
}

function ResistorNode({ id, data }: NodeProps) {
  return (
    <div className="node-box">
      <div className="node-title">Resistor</div>
      <div style={{ fontSize: 12 }}>{(data as any)?.resistance ?? 1000} ?</div>
      <Port id="a" position={Position.Left} />
      <Port id="b" position={Position.Right} />
    </div>
  );
}

function VSourceNode({ id, data }: NodeProps) {
  return (
    <div className="node-box">
      <div className="node-title">DC Source</div>
      <div className="voltage-badge">{(data as any)?.voltage ?? 5} V</div>
      <Port id="+" position={Position.Left} />
      <Port id="-" position={Position.Right} />
    </div>
  );
}

function GroundNode({ id }: NodeProps) {
  return (
    <div className="node-box">
      <div className="node-title">Ground</div>
      <Port id="g" position={Position.Bottom} />
    </div>
  );
}

const nodeTypes = {
  resistor: ResistorNode,
  vsource: VSourceNode,
  ground: GroundNode,
};

export default function EditorCanvas() {
  const { nodes, edges, setNodes, setEdges, setSelected, simulate } = useEditorStore((s) => ({
    nodes: s.nodes,
    edges: s.edges,
    setNodes: s.setNodes,
    setEdges: s.setEdges,
    setSelected: s.setSelected,
    simulate: s.simulate,
  }));

  const onConnect = useCallback((c: Connection) => setEdges((eds) => addEdge({ ...c, type: "default" } as any, eds)), [setEdges]);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      let next = nds.map((n) => ({ ...n }));
      changes.forEach((ch: any) => {
        if (ch.type === "position" && ch.id) {
          const idx = next.findIndex((n) => n.id === ch.id);
          if (idx >= 0) next[idx] = { ...next[idx], position: ch.position } as RFNode;
        }
        if (ch.type === "remove" && ch.id) {
          next = next.filter((n) => n.id !== ch.id);
        }
        if (ch.type === "select" && ch.id) {
          // handled by onSelectionChange
        }
      });
      return next;
    });
  }, [setNodes]);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => {
      let next = [...eds];
      changes.forEach((ch: any) => {
        if (ch.type === "remove" && ch.id) next = next.filter((e) => e.id !== ch.id);
      });
      return next;
    });
  }, [setEdges]);

  const onSelectionChange = useCallback(({ nodes: selNodes }: { nodes: RFNode[]; edges: RFEdge[] }) => {
    setSelected(selNodes?.[0]?.id ?? null);
  }, [setSelected]);

  return (
    <div style={{ height: "calc(100vh - 56px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={onConnect}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onSelectionChange={onSelectionChange as any}
        nodeTypes={nodeTypes as any}
        fitView
      >
        <Background variant={BackgroundVariant.Dots} gap={18} size={1} />
        <Controls />
        <MiniMap pannable zoomable />
      </ReactFlow>
    </div>
  );
}
