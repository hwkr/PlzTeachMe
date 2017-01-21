import React from 'react';
import Editor from './Editor';

export default function CodeView() {
  const baseOptions = {
    lineNumbers: true,
  };
  return (
    <div className="editorContainer">
      <Editor options={Object.assign({ mode: 'html' }, baseOptions)} />
      <Editor options={Object.assign({ mode: 'css' }, baseOptions)} />
      <Editor options={Object.assign({ mode: 'javascript' }, baseOptions)} />
    </div>
  );
}
