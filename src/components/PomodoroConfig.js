import React from 'react';

export default function PomodoroConfig({sessionTime, breakTime, increment, decrement}) {
     return (
          <div className="config">
               <div className="length-control">
                    <div id="break-label">Break Length</div>
                    <div className="controls">
                         <div className="config-length">
                              <i className="fas fa-arrow-alt-circle-down" id="break-decrement" onClick={decrement}></i>
                         </div>
                         <div id="break-length" className="config-length">{breakTime}</div>
                         <div className="config-length">
                              <i className="fas fa-arrow-alt-circle-up" id="break-increment" onClick={increment}></i>
                         </div>
                    </div>
               </div>
               <div className="length-control">
                    <div id="session-label">Session Length</div>
                    <div className="controls">
                         <div className="config-length">
                              <i className="fas fa-arrow-alt-circle-down" id="session-decrement" onClick={decrement}></i>
                         </div>
                         <div id="session-length" className="config-length">{sessionTime}</div>
                         <div className="config-length">
                              <i className="fas fa-arrow-alt-circle-up" id="session-increment" onClick={increment}></i>
                         </div>
                    </div>
               </div>
          </div>
     );
}