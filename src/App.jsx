import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Importing CustomNode component
import CustomNode from './CustomNode';

const nodeTypes = {
  custom: CustomNode,
};
 
// Defining initial nodes and edges, including id, type and labels
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'Storage' } },
  { id: '2', type: 'custom', position: { x: 500, y: 100 }, data: { label: 'Plasma' } },
  { id: '3', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'Tritium Extraction System' } },
  { id: '4', type: 'custom', position: { x: 500, y: 250 }, data: { label: 'Breeding Blanket' } },
];

// Defining initial edges and styles, including a dashed edge for neutrons
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'smoothstep' },
  { id: 'e3-1', source: '3', target: '1', type: 'smoothstep' },
  { id: 'e4-3', source: '4', target: '3', type: 'smoothstep' },
  {
    id: 'e2-4',
    source: '2',
    target: '4',
    type: 'straight',
    label: 'neutrons',
    labelStyle: { fill: '#555', fontSize: 10 },
    style: { strokeDasharray: '4 3', stroke: '#888' },
  },
];

// Main App component
export default function App() {
  // State management for nodes and edges
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  // Function to handle node and edge changes when user interacts with the graph
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  // Function to handle node clicks and set selected node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };
 
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
  
      {/* Side panel settings when a node is selected */}
      {selectedNode && (
        <div
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            height: '100vh',
            width: '300px',
            background: '#1e1e2f',
            color: '#ffffff',
            borderLeft: '1px solid #ccc',
            padding: '20px',
            boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
            zIndex: 10,
          }}
        >
        {/* Allows user to enter parameter for selected node */}
          <h3>{selectedNode.data.label}</h3>
          <label>Parameter:</label>
          <input
            type="text"
            value={selectedNode.data.param || ''}
            onChange={(e) => {
              const newValue = e.target.value;
              setNodes((nds) =>
                nds.map((node) =>
                  node.id === selectedNode.id
                    ? { ...node, data: { ...node.data, param: newValue } }
                    : node
                )
              );
              setSelectedNode((node) => ({
                ...node,
                data: { ...node.data, param: newValue },
              }));
            }}
            style={{ width: '100%', marginTop: 8 }}
          />
          <br />
          {/* Button to close side panel */}
          <button
            style={{ marginTop: 10 }}
            onClick={() => setSelectedNode(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
  
}
 


