import React from 'react';
import moment from 'moment';

export default props => {
  const { date, title, location } = props;
  const month = moment(date).format('MMM');
  const day = moment(date).format('D');

  return (
    <div className="news__item news__item--shadow">
      <div className="news__sched">
        <div className="news__month">{month}</div>
        <div className="news__day">{day}</div>
      </div>
      <div className="news__content">
        <h3 className="news__title">{title}</h3>
        <div className="news__meta">
          <span className="news__location">{location}</span>
        </div>
      </div>
    </div>
  );
};
