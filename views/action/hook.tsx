
// import react
import React from 'react';

// create event action
const ActionHook = (props = {}) => {

  // return jsx
  return (
    <>
      <label className="form-label">
        Await the hook
      </label>
      <input className="form-control" value={ props.action.hook || '' } type="text" onChange={ (e) => props.setAction(props.action, 'hook', e.target.value) } />
    </>
  );
};

// export default
export default ActionHook;