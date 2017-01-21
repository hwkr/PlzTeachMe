import React from 'react';

import Icon from 'parts/Icon';

export default function Preview() {
  return (
    <div className="preview">
      <div className="empty">
        <Icon name="flash" />
        <p className="empty-title">Preview Loading</p>
        <p className="empty-meta"><span className="loading">Loading...</span></p>
      </div>
    </div>
  );
}
