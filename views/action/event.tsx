
// import react
import React from 'react';

// create event action
const ActionEvent = (props = {}) => {

  // return jsx
  return (
    <>
      <label className="form-label">
        Trigger the event
      </label>
      <input className="form-control" value={ props.action.event || '' } type="text" onChange={ (e) => props.setAction(props.action, 'event', e.target.value) } />
    </>
  );
};

// export default
export default ActionEvent;