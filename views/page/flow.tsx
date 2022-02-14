
// import dependencies
import dotProp from 'dot-prop';
import shortid from 'shortid';
import ReactFlow, { MiniMap } from 'react-flow-renderer';
import { Page, Dialog, DialogContent, DialogContentText, DialogActions, DialogTitle, Button, Box } from '@dashup/ui';
import React, { useState, useEffect } from 'react';

// import node types
import './flow.scss';
import Menu from './flow/menu';
import Action from './flow/action';
import Trigger from './flow/trigger';

// set node
let fNode = null;
let iNode = null;

// create board page
const PageFlow = (props = {}) => {
  // use state
  const [menu, setMenu] = useState(false);
  const [fitted, setFitted] = useState(false);
  const [remove, setRemove] = useState(null);
  const [config, setConfig] = useState(false);
  const [loading, setLoading] = useState(false);
  const [actions, setActions] = useState(props.page.get('data.nodes') || []);
  const [updating, setUpdating] = useState(false);

  // check nodes
  if (!actions.length && props.page.get('data.children')) {
    // set nodes
    props.page.get('data.children').forEach((child, i) => {
      // create node
      actions.push({
        ...child,
        
        parent : !child.parent || child.parent === 'root' ? 'trigger' : child.parent,
        _flow  : {
          x : 250,
          y : ((i + 1) * 500),
        }
      });
    });
  }

  // set trigger
  const setAction = (action, key, value = false, prev = false) => {
    // find actual action
    const actualAction = actions.find((a) => a.uuid === action.uuid);

    // set values
    let updates = {
      [key] : value,
    };

    // set value
    if (typeof key === 'object') {
      prev = value;
      updates = key;
    }

    // keys
    Object.keys(updates).forEach((key) => {
      // set
      dotProp.set(actualAction, key, updates[key]);
    });

    // set trigger
    setActions([...actions]);
    return props.setData('nodes', actions, true);
  };

  // on dragged
  const onRemove = (action) => {
    // actual action
    const newActions = actions.filter((a) => a.uuid !== action.uuid);

    // return actions
    setRemove(null);
    setActions([...newActions]);
    return props.setData('nodes', newActions, true);
  };

  // on dragged
  const onDragged = (item) => {
    // actual action
    setAction({ uuid : item.id }, '_flow', item.position);
  };

  // on create
  const onCreate = (type) => {
    // get max top
    const maxTop = actions.reduce((top, action) => {
      // max top
      if (action?._flow?.y && ((action._flow.y + 500) > top)) return (action._flow.y + 500);

      // return top
      return top;
    }, 500);

    // create action
    const action = {
      type,
      uuid  : shortid(),
      _flow : {
        y : maxTop,
        x : 0,
      },
    };

    // set trigger
    setActions([...actions, action]);
    props.setData('nodes', [...actions, action], true);

    // fit view
    if (iNode) setTimeout(() => iNode.fitView(), 500);
  };

  // set trigger
  const setTrigger = (key, value, prev = false) => {
    // set trigger
    return props.setData(`trigger.${key}`, value, prev);
  };

  // on load
  const onLoad = (i = iNode) => {
    // set inode
    iNode = i;

    // set fitted
    setFitted(true);

    // fit view
    if (iNode && !fitted) iNode.fitView();
  };

  // connect
  const onConnect = (e) => {
    // get to/from
    const to   = e.toElement;
    const from = fNode;
    
    // reset fnode
    fNode = null;

    // check to/from
    if (!to || !from || !updating) return;

    // get ids
    const actualTo   = to.getAttribute('data-nodeid');
    const handleTo   = to.getAttribute('data-handleid');
    const actualFrom = from.getAttribute('data-nodeid');
    const handleFrom = from.getAttribute('data-handleid');

    // get bottom
    const top    = handleTo === 'i' ? actualFrom : actualTo;
    const source = handleTo === 'i' ? handleFrom : handleTo;
    const bottom = handleTo === 'i' ? actualTo : actualFrom;

    // actual node
    const actionNode = actions.find((a) => a.uuid === bottom);

    // set parent
    setAction(actionNode, {
      source,
      parent : top,
    });
  };

  // node types
  const nodeTypes = {
    action  : Action,
    trigger : Trigger,
  };

  // initial elements
  const initialElements = [
    {
      id   : 'trigger',
      type : 'trigger',
      data : {
        ...props,
        onLoad,
        setAction,
        setTrigger,
      },
      position : {
        x : 250,
        y : 0
      },
    }
  ];

  // add to initial elements
  const getElements = () => {
    // return elements
    return [
      ...initialElements,

      ...actions.map((action) => {
        return {
          id       : action.uuid,
          type     : 'action',
          data     : {
            ...props,
            action,
            onLoad,
            onConfig : () => setConfig(true),
            updating,
            setRemove,
            setAction,
            setTrigger,
          },
          position : action._flow || {
            x : -1,
            y : -1,
          },
        }
      }),

      ...actions.map((action) => {
        // add lines
        return action.parent && (actions.find((p) => p.uuid === action.parent) || action.parent === 'trigger') && {
          id           : `${action.uuid}-${action.parent}`,
          source       : action.parent,
          target       : action.uuid,
          animated     : true,
          sourceHandle : action.source || 'a',
          targetHandle : 'i',
        };
      }).filter((a) => a),
    ];
  };

  useEffect(() => {

  }, [props.page && props.page.get('data.nodes')]);

  // remove jsx
  const removeJsx = remove && (
    <Dialog open={ !!remove } onClose={ () => setRemove(null) }>
      <DialogTitle>
        Removing <b>{ remove.type }</b>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove <b>{ remove.type }</b>?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={ () => setRemove(null) }>Cancel</Button>
        <Button variant="contained" color="error" onClick={ (e) => onRemove(remove) }>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );

  // return jsx
  return (
    <Page { ...props } loading={ loading } onConfig={ () => setConfig(true) }>

      <Page.Config show={ config } onHide={ (e) => setConfig(false) } />

      <Page.Filter presence={ props.presence }>

        { updating && props.dashup.can(props.page, 'manage') && (
          <Button variant="contained" color="primary" onClick={ () => setMenu(true) }>
            Add Action
          </Button>
        ) }
        { props.dashup.can(props.page, 'manage') && (
          <Button variant="contained" color={ updating ? 'success' : 'primary' } onClick={ () => setUpdating(!updating) }>
            { updating ? 'Finish' : 'Update Flow' }
          </Button>
        ) }
      </Page.Filter>
      
      <Page.Body>
        <Box flex={ 1 } position="relative">
          <Box position="absolute" top={ 0 } left={ 0 } right={ 0 } bottom={ 0 }>
            <ReactFlow
              nodesConnectable={ updating && props.dashup.can(props.page, 'manage') }
              nodesDraggable={ updating && props.dashup.can(props.page, 'manage') }
              onLoad={ onLoad }
              elements={ getElements() }
              nodeTypes={ nodeTypes }
              onConnectEnd={ onConnect }
              onConnectStart={ (e) => fNode = e.target }
              onNodeDragStop={ (e, item) => onDragged(item) }
            >
              <MiniMap />
            </ReactFlow>
          </Box>
        </Box>
      </Page.Body>
      <Menu available={ props.available.actions } show={ menu } onHide={ (e) => setMenu(false) } onAction={ onCreate } />
      { removeJsx }
    </Page>
  );
};

// export default board page
export default PageFlow;