import React from 'react';
import formatDuration from 'format-duration';

function calcTime(events) {
  console.log('calctime fct >>>');
  let elapsed = 0;
  for (let i = 0; i < events.length; i += 2) {
    const start = events[i];
    const stop = events[i + 1] || new Date();

    elapsed += stop - start;
  }
  return elapsed;
}

export default function TimeDisplay(props) {
  return (
    <div>
      <span>{formatDuration(calcTime(props.timingEvents))}</span>
    </div>
  );
}
