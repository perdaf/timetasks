import React from 'react';
import formatDuration from 'format-duration';

function calcTime(events, elapsTime) {
  // recup du elapsed time de la task et convert en ms ----
  // -------
  let tt = elapsTime.split(':');
  let ms = (tt[0] * 3600 + tt[1] * 60 + tt[2] * 1) * 1000;
  let elapsed = ms || 0;
  // -------------------------------------------------------
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
      <span>
        {formatDuration(calcTime(props.timingEvents, props.elapsTime))}
      </span>
    </div>
  );
}
