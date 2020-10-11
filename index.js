// require first
const { Module } = require('@dashup/module');

// import base
const FlowPage = require('./pages/flow');

// import base
const HookAction   = require('./actions/hook');
const EventAction  = require('./actions/event');
const FilterAction = require('./actions/filter');

/**
 * export module
 */
class FlowModule extends Module {

  /**
   * construct discord module
   */
  constructor() {
    // run super
    super();
  }
  
  /**
   * register logic
   *
   * @param {*} fn 
   */
  register(fn) {
    // register sms action
    fn('page', FlowPage);
    
    // register actions
    fn('action', HookAction);
    fn('action', EventAction);
    fn('action', FilterAction);
  }
}

// create new
module.exports = new FlowModule();
