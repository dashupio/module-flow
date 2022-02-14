
import React, { useState, useEffect } from 'react';
import { TextField, Box, CircularProgress } from '@dashup/ui';

// create model trigger
const TriggerWebhook = (props = {}) => {
  // state
  const [key, setKey] = useState(null);

  // use effect
  useEffect(() => {
    // load key
    props.dashup.action({
      type   : 'trigger',
      page   : props.page.get('_id'),
      struct : 'webhook',
    }, 'key').then(setKey);
  }, [props.page && props.page.get('_id')])

  // return jsx
  return (
    <>
      { key ? (
        <>
          <TextField
            label="Webhook URL"
            value={ `https://dashup.com/api/hook/${key}` }
            helperText="Both GET and POST"
            fullWidth
            
            InputProps={ {
              readOnly : true,
            } }
          />
        </>
      ) : (
        <Box width="100%" textAlign="center" py={ 2 }>
          <CircularProgress />
        </Box>
      ) }
    </>
  );
};

// export default
export default TriggerWebhook;