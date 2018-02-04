import React from 'react';

export default props => {
  const { title, count } = props;

  return (
    <div className="status__item">
      <span className="status__item-label">{title}</span>
      <span className="status__item-count">{count}</span>
    </div>
  );
};
