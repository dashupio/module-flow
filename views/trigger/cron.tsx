
import React from 'react';
import { View } from '@dashup/ui';

// create model trigger
const TriggerCron = (props = {}) => {

  // get field
  const getField = () => {
    // return field
    return {
      uuid : 'none',
      name : 'none',

      label  : 'Date/Time',
      repeat : true,
    };
  };

  // get value
  const getValue = () => {
    // return field
    return props.trigger?.date || {
      start  : new Date(),
      repeat : true,
    };
  };

  // on change
  const onChange = (val) => {
    // set value
    props.setTrigger('date', val, true);
    props.setTrigger('next', null);
  };

  // return jsx
  return (
    <View
      view="input"
      type="field"
      struct="date"
      dashup={ props.dashup }

      field={ getField() }
      value={ getValue() }

      onChange={ onChange }
    />
  );
};

// export default
export default TriggerCron;