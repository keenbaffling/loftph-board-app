import React from 'react';

import ListItem from './ListItem';

export default props => {
  return (
    <div className="status">
      <header className="status__header">
        <h3 className="status__heading">Spaces Available:</h3>
      </header>
      <div className="status__content">
        {!!props.status.length ? (
          props.status.map((item, index) => (
            <ListItem
              title={item.title}
              count={item.total - item.occupied}
              key={index}
            />
          ))
        ) : (
          <div style={{ color: '#fff' }}>Nothing to show.</div>
        )}
      </div>
    </div>
  );
};
