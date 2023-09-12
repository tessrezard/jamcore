import React from 'react';

function Track (prop){
    return(
      <li>
          <h3>
            {prop.title} 
          </h3>
          <h4>
            {prop.artist}
          </h4>
      </li>
    );
  }

  export default Track;