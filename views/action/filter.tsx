
// import react
import React from 'react';
import { Query } from '@dashup/ui';

// create event action
const ActionFilter = (props = {}) => {

  // forms
  const forms = props.page.get('data.trigger.model') ? props.getForms([props.page.get('data.trigger.model')]) : [];

  // return jsx
  return (
    <>
      <Query
        isString

        page={ props.page }
        label="Continue when the following matches"
        query={ props.action.filter }
        dashup={ props.dashup }
        fields={ (forms.length ? props.getFields(forms) : []) }
        onChange={ (val) => props.setAction(props.action, 'filter', val) }
        getFieldStruct={ props.getFieldStruct }
      />
    </>
  );
};

// export default
export default ActionFilter;