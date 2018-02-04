import React from 'react';

import ListItem from './ListItem';

export default props => {
  const { items } = props;

  return (
    <React.Fragment>
      {!!items && !!items.length ? (
        <div className="news">
          <div className="news__overlay" />
          {items.map((item, index) => (
            <ListItem
              date={item.date}
              title={item.title}
              location={item.location}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </React.Fragment>
  );
};
