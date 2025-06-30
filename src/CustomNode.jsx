import React from 'react';
import { Handle } from '@xyflow/react';

export default function CustomNode({ data }) {
  return (
    <div
      style={{
        width: 180,
        background: '#016c95',
        color: 'white',
        borderRadius: 12,
        padding: 10,
        fontWeight: 'bold',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
      <div style={{ marginBottom: 4 }}>{data.label}</div>
      {data.output !== null && (
        <div style={{ fontSize: 12, marginTop: 6 }}>
          Output: {data.output}
        </div>
      )}
      <Handle type="target" position="top" style={{ background: '#555' }} />
      <Handle type="source" position="bottom" style={{ background: '#555' }} />
    </div>
  );
}
