
// import react
import React from 'react';
import { Query } from '@dashup/ui';

// create event action
const ActionFilter = (props = {}) => {

  // return jsx
  return (
    <>
      <label className="form-label">
        Only continue when the following matches
      </label>
      <Query onChange={ console.log } />
    </>
  );
};

// export default
export default ActionFilter;