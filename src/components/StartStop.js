import React from 'react';

export default function StartStop({reset, start, pause}){
     return (
          <div id="start_stop">
          <div className="start button bgcolor" onClick={start}>
               <i className="fas fa-play"></i>
               Start
          </div>
          <div className="pause button bgcolor" onClick={pause}>
               <i className="fas fa-pause"></i>
               Pause
          </div>
          <div id="reset" className="button bgcolor" onClick={reset}>
               <i className="fas fa-sync-alt"></i>
               Reset
          </div>
     </div>
     );
}