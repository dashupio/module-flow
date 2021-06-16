// import dependencies
import { View } from '@dashup/ui';
import { Handle } from 'react-flow-renderer';
import React, { memo } from 'react';

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

  // struct
  const struct = props.getActionStruct(props.action.type);

  // return jsx
  return (
    <>
      <Handle
        id="i"
        type="input"
        position="top"
      />
      <div className="card card-flowing card-trigger">
        <div className="card-header d-flex flex-row">
          <div className="card-icon">
            <i className="fa fa-bolt" />
          </div>
          Action
          { props.updating && (
            <div className="ms-auto">
              <button className="btn btn-danger" onClick={ () => props.setRemove(props.action) }>
                <i className="fa fa-trash" />
              </button>
            </div>
          ) }
        </div>
        <div className="card-body">
          { !!props.page.get('data.trigger.type') && (
            <View
              type="action"
              view="config"
              struct={ props.action.type }
              action={ props.action }
              
              { ...getProps() }
            >
              <i className="fa fa-spinner fa-spin ms-2" />
            </View>
          ) }

        </div>
      </div>
      { struct?.data?.handles ? struct.data.handles.map((handle) => {
        // return jsx
        return (
          <Handle
            key={ `action-${props.action.uuid}-${handle.id}` }
            { ...handle }
          />
        );
      }) : (
        <Handle
          id="a"
          type="source"
          position="bottom"
        />
      ) }
    </>
  );
});