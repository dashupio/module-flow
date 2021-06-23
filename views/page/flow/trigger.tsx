// import dependencies
import { Handle } from 'react-flow-renderer';
import React, { memo } from 'react';
import { View, Select } from '@dashup/ui';

// export default
export default memo(({ data : props }) => {

  // get props
  const getProps = () => {
    // new props
    const newProps = { ...props };

    // delete unwanted
    delete newProps.type;
    delete newProps.view;
    delete newProps.struct;

    // return new props
    return newProps;
  };

  // get trigger
  const getTrigger = (type = props.page.get('data.trigger.type')) => {
    // get trigger
    const actualTrigger = (props.available.triggers || []).find((t) => t.type === type);

    // return actual trigger
    return actualTrigger;
  };

  /**
   * get value
   */
  const getTriggers = () => {
    // return triggers
    return (props.available.triggers || []).map((trigger) => {
      // return object
      return {
        label    : trigger.title,
        value    : trigger.type,
        selected : props.page.get('data.trigger.type') === trigger.type,
      };
    });
  };

  // return jsx
  return (
    <>
      <div className="card card-flowing card-trigger">
        <div className="card-header">
          <div className="card-icon">
            <i className="fa fa-bolt" />
          </div>
          Trigger
        </div>
        <div className="card-body">
          <div className="mb-3">
            <Select options={ getTriggers() } defaultValue={ getTriggers().filter((f) => f.selected) } onChange={ (val) => props.setTrigger('type', val?.value) } />
          </div>
          { !!props.page.get('data.trigger.type') && (
            <View
              type="trigger"
              view="config"
              struct={ props.page.get('data.trigger.type') }
              trigger={ getTrigger() }

              { ...getProps() }
            >
              <i className="fa fa-spinner fa-spin ms-2" />
            </View>
          ) }

        </div>
      </div>
      <Handle
        id="a"
        type="source"
        position="bottom"
      />
    </>
  );
});