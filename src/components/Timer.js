import React from 'react';

export default function Timer({timerLabel, timeleftDisplay}) {
     return (
          <div className="timer">
               <div id="timer-label">{timerLabel}</div>
               <div id="time-left">{timeleftDisplay}</div>
          </div>
     );
}