import React from 'react';

function Track (prop){
    return(
      <div>
          <h3>
            {prop.title} 
          </h3>
          <h4>
            {prop.artist}
          </h4>
      </div>
    );
  }

  export default Track;