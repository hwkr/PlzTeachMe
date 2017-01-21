import React from 'react';
import Editor from './Editor';

export default function CodeView() {
  return (
    <div className="editorContainer">
      <Editor options={{ mode: 'html' }} />
      <Editor options={{ mode: 'css' }} />
      <Editor options={{ mode: 'javascript' }} />
    </div>
  );
}
