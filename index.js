// require first
const { Module } = require('@dashup/module');

// import base
const FlowPage = require('./pages/flow');

// import base
const HookAction     = require('./actions/hook');
const CRONTrigger    = require('./triggers/cron');
const EventAction    = require('./actions/event');
const FilterAction   = require('./actions/filter');
const WebhookTrigger = require('./triggers/webhook');

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
    // register pages
    fn('page', FlowPage);
    
    // register actions
    fn('action', HookAction);
    fn('action', EventAction);
    fn('action', FilterAction);

    // register triggers
    fn('trigger', CRONTrigger);
    fn('trigger', WebhookTrigger);
  }
}

// create new
module.exports = new FlowModule();
