
// import dependencies
import dotProp from 'dot-prop';
import SimpleBar from 'simplebar-react';
import React, { useState } from 'react';
import { Drawer, Card, Button, CardHeader, Typography, IconButton, Icon, Box, TextField, Divider, Avatar, useTheme } from '@dashup/ui';

// create dashup grid body
const PageFlowMenu = (props = {}) => {
  // theme
  const theme = useTheme();

  // selected
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  // return jsx
  return (
    <Drawer
      open={ props.open || props.show }
      anchor="left"
      onClose={ props.onClose || props.onHide }
    >
      <Box px={ 3 } py={ 2 } height="100%" display="flex" flexDirection="column" maxWidth={ 360 }>
        <Box display="flex" flexDirection="row" alignItems="center" mb={ 1 }>
          <Typography variant="h5">
            Flow Actions
          </Typography>
          <IconButton onClick={ props.onClose || props.onHide } sx={ {
            ml : 'auto',
          } }>
            <Icon type="fas" icon="times" />
          </IconButton>
        </Box>
        <Typography gutterBottom>
          Select one of these actions and click "Add Action" to add it to your flow.
        </Typography>

        <TextField
          label="Search"
          value={ search }
          onChange={ (e) => setSearch(e.target.value) }
          fullWidth
          placeholder="Filter Actions"
        />

        <Box my={ 2 }>
          <Divider />
        </Box>

        <Box flex={ 1 } position="relative">
          <Box position="absolute" top={ 0 } left={ 0 } right={ 0 } bottom={ 0 }>
            <SimpleBar style={ {
              width  : '100%',
              height : '100%',
            } }>
              { (props.available || []).sort((a, b) => {
                // return sort
                return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
              }).filter((action) => {
                return !(search || '').length || `${action.title} ${action.description}`.toLowerCase().includes(search.toLowerCase());
              }).map((action, i) => {
                // return actions
                return (
                  <Card variant="outlined" key={ `field-${action.type}` } sx={ {
                    mb              : 2,
                    color           : action.type === selected ? theme.palette.getContrastText(theme.palette.primary.main) : undefined,
                    cursor          : 'pointer',
                    backgroundColor : action.type === selected ? 'primary.light' : undefined,
                  } } data-type={ action.type } onClick={ (e) => setSelected(action.type) }>
                    <CardHeader
                      avatar={ (
                        <Avatar bgColor={ action.type === selected ? 'primary.main' : action.color && dotProp.get(theme.palette, `${action.color}.main`) }>
                          <Icon type="fas" icon={ action.icon } />
                        </Avatar>
                      ) }
                      title={ action.title }
                      subheader={ action.description }
                    />
                    <Box />
                  </Card>
                );
              }) }
            </SimpleBar>
          </Box>
        </Box>

        { !!selected && (
          <>
            <Box my={ 2 }>
              <Divider />
            </Box>
            <Button color="primary" size="large" variant="contained" fullWidth onClick={ (e) => {
              props.onAction(selected);
              (props.onClose || props.onHide)();
            } }>
              Add Action
            </Button>
          </>
        ) }
      </Box>
    </Drawer>
  );
};

// export default page menu
export default PageFlowMenu;

