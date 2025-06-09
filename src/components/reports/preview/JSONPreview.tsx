import React from 'react';

interface JSONPreviewProps {
  data: any;
}

export function JSONPreview({ data }: JSONPreviewProps) {
  return (
    <div className="h-96 overflow-auto bg-gray-900 p-4">
      <pre className="text-green-400 font-mono text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}