
import React, { useState, useEffect } from 'react';

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
          <label className="form-label">
            Webhook URL
          </label>
          <input className="form-control" value={ `https://dashup.io/api/hook/${key}` } readOnly />
          <small>
            Both GET and POST work
          </small>
        </>
      ) : (
        <div className="text-center">
          <i className="h1 fa fa-spinner fa-spin" />
        </div>
      ) }
    </>
  );
};

// export default
export default TriggerWebhook;