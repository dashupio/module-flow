// import dependencies
import { Handle } from 'react-flow-renderer';
import React, { memo } from 'react';
import { Box, View, Select, Card, CardHeader, Avatar, Icon, useTheme, CardContent, TextField, MenuItem } from '@dashup/ui';

// export default
export default memo(({ data : props }) => {
  // use theme
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
    <Box>
      <Card sx={ {
        minWidth : 360,
        maxWidth : 360,
      } }>
        <CardHeader
          avatar={ (
            <Avatar bgColor={ theme.palette.primary.main }>
              <Icon type="fas" icon="bolt" />
            </Avatar>
          ) }
          title="Trigger"
          subheader="Initial Flow Trigger"
        />
        <CardContent>
          <TextField
            label="Trigger"
            value={ props.page.get('data.trigger.type') || '' }
            select
            onChange={ (e) => props.setTrigger('type', e.target.value) }
            fullWidth
          >
            { getTriggers().map((trigger) => {
              // return jsx
              return (
                <MenuItem key={ trigger.value } value={ trigger.value }>
                  { trigger.label }
                </MenuItem>
              )
            }) }
          </TextField>
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
        </CardContent>
        <Box />
      </Card>
      <Handle
        id="a"
        type="source"
        position="bottom"
      />
    </Box>
  );
});