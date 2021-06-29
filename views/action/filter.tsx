
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
      <label className="form-label">
        Only continue when the following matches
      </label>
      <Query
        isString

        page={ props.page }
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