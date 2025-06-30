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
import { makeEdge } from './CustomEdge';

// Add CustomNode as a node type for this script
const nodeTypes = {
  custom: CustomNode,
};
 
// Defining initial nodes. In the data section, we have label, but also parameters specific to the node.
const initialNodes = [
  { id: '1', type: 'custom', position: { x: 300, y: 100 }, data: { label: 'Storage', a: '', b: '', output: null } },
  { id: '2', type: 'custom', position: { x: 500, y: 100 }, data: { label: 'Plasma', c: '', output: null } },
  { id: '3', type: 'custom', position: { x: 300, y: 250 }, data: { label: 'Tritium Extraction System', a: '', b: '', output: null } },
  { id: '4', type: 'custom', position: { x: 500, y: 250 }, data: { label: 'Breeding Blanket', a: '', b: '', output: null } },
];

// Defining initial edges
const initialEdges = [
  makeEdge({ id: 'e1-2', source: '1', target: '2' }),
  makeEdge({ id: 'e3-1', source: '3', target: '1' }),
  makeEdge({ id: 'e4-3', source: '4', target: '3' }),
  makeEdge({ id: 'e2-4', source: '2', target: '4' }),
];

// Main App component
export default function App() {
  // State management for nodes and edges: adds the initial nodes and edges to the graph and handles node selection
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  // Lets user connect two nodes by creating an edge
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  // Function that when we click on a node, sets that node as the selected node
  const onNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  // Function to compute output for the selected node by sending a request to the backend
  const computeOutput = async (node) => {
    const params = { ...node.data };
    // Deleting the preexisting label and output that were assigned to the node's parameters
    delete params.label;
    delete params.output;
  
    // Here we fetch the computed result of the applied function in the python backend
    try {
      const response = await fetch('http://localhost:8000/compute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: node.id,
          params: params,
        }),
      });
  
      const result = await response.json();
  
      // Updating the output field of the node
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id
            ? { ...n, data: { ...n.data, output: result.output } }
            : n
        )
      );
      // If the computation doesn't work, we return an error
    } catch (error) {
      console.error('Error computing output:', error);
    }
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
          <h3>{selectedNode.data.label}</h3>
          {Object.entries(selectedNode.data)
            .filter(([key]) => key !== 'label' && key !== 'output')
            .map(([key, value]) => (
              <div key={key} style={{ marginBottom: '10px' }}>
                <label>{key}:</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newValue = e.target.value;
                    const updatedNode = {
                      ...selectedNode,
                      data: { ...selectedNode.data, [key]: newValue },
                    };
                  
                    setNodes((nds) =>
                      nds.map((node) =>
                        node.id === selectedNode.id ? updatedNode : node
                      )
                    );
                    setSelectedNode(updatedNode);
                  
                    computeOutput(updatedNode); // Trigger output computation (to backend)
                  }}
                  style={{ width: '100%', marginTop: 4 }}
                />
              </div>
            ))}

          <br />
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
 


