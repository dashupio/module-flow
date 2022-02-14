
// import react
import React from 'react';
import { TextField } from '@dashup/ui';

// create event action
const ActionEvent = (props = {}) => {

  // return jsx
  return (
    <>
      <TextField
        label="Trigger Event"
        value={ props.action.event || '' }
        onChange={ (e) => props.setAction(props.action, 'event', e.target.value) }
        fullWidth
      />
    </>
  );
};

// export default
export default ActionEvent;