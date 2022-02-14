
// import react
import React from 'react';
import { TextField } from '@dashup/ui';

// create event action
const ActionHook = (props = {}) => {

  // return jsx
  return (
    <>
      <TextField
        label="Await hook"
        value={ props.action.hook || '' }
        onChange={ (e) => props.setAction(props.action, 'hook', e.target.value) }
        fullWidth
      />
    </>
  );
};

// export default
export default ActionHook;