// import dependencies
import { Handle } from 'react-flow-renderer';
import React, { memo } from 'react';
import { View, useTheme, Box, Card, CardHeader, Avatar, Icon, CardContent, IconButton } from '@dashup/ui';

// export default
export default memo(({ data : props }) => {
  // theme
  const theme = useTheme();

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
    <Box>
      <Handle
        id="i"
        type="input"
        position="top"
      />
      
      <Card sx={ {
        minWidth : 360,
        maxWidth : 360,
      } }>
        <CardHeader
          avatar={ (
            <Avatar bgColor={ theme.palette.primary.main }>
              <Icon type="fas" icon={ struct?.icon || 'bolt' } />
            </Avatar>
          ) }
          action={ !!props.updating && (
            <IconButton onClick={ () => props.setRemove(props.action) } color="error">
              <Icon type="fas" icon="trash" />
            </IconButton>
          ) }
          title="Trigger"
          subheader="Initial Flow Trigger"
        />
        <CardContent>
          { !!props.page.get('data.trigger.type') && (
            <View
              type="action"
              view="config"
              struct={ props.action.type }
              action={ props.action }
              
              { ...getProps() }
            />
          ) }
        </CardContent>
        <Box />
      </Card>
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
    </Box>
  );
});