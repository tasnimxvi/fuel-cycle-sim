import React from 'react';
import { Handle } from '@xyflow/react';

// CustomNode component style settings
export default function CustomNode({ data }) {
  return (
    <div style={{
      width: 180,
      height: 60,
      background: '#016c95', 
      color: 'white',
      borderRadius: 12,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: 'bold',
      position: 'relative'
    }}>
      {data.label}
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
}

