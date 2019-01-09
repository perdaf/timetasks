import React from 'react';
import '../../scss/BouttonTimer.scss';

export default function ButtonTimer(props) {
  const label = props.timingEvents.length % 2 === 0 ? 'start' : 'stop';

  return (
    <div>
      <button
        onClick={props.handleClick}
        className={`btn-timer${label === 'start' ? ' start' : ' stop'}`}
      />
    </div>
  );
}
