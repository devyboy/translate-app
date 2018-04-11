import React from 'react';
import '../App.css';

const Card =  (props) => {

  return (
    <div>
      <div className={props.children.class}>
          {props.children.text}
      </div>
      <div style={{clear:"both"}}></div>
    </div>
  );
}

export { Card };
