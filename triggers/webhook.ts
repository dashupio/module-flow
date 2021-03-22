// import base
import { v4 as uuid } from 'uuid';
import { Struct, Query } from '@dashup/module';

/**
 * create dashup action
 */
export default class WebhookTrigger extends Struct {

  /**
   * construct
   */
  constructor(...args) {
    // return
    super(...args);
    
    // webhook action
    this.keyAction     = this.keyAction.bind(this);
    this.webhookAction = this.webhookAction.bind(this);
  }

  /**
   * returns action type
   */
  get type() {
    // return action type label
    return 'webhook';
  }

  /**
   * returns trigger type
   */
  get icon() {
    // return trigger type label
    return 'fa fa-wrench';
  }

  /**
   * returns action type
   */
  get title() {
    // return action type label
    return 'Webhook Trigger';
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      config : 'trigger/webhook/config',
    };
  }

  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      key     : this.keyAction,
      webhook : this.webhookAction,
    };
  }

  /**
   * returns category list to show action in
   */
  get categories() {
    // return array of categories
    return [];
  }

  /**
   * returns category list to show action in
   */
  get description() {
    // return description string
    return 'Webhook Trigger';
  }

  /**
   * host action
   *
   * @param opts 
   * @param id 
   */
  async keyAction(opts) {
    // load key
    const key = await this.dashup.connection.rpc(opts, 'page.key', opts.page);

    // return info
    return key;
  }

  /**
   * get triggerable
   */
  async webhookAction(opts, key, body) {
    // query page
    const page = await new Query({
      
    }, 'page').where({
      key,
      type                : 'flow',
      'data.trigger.type' : 'webhook', 
    }).findOne();

    // check page
    if (!page) return;

    // emit new message
    this.dashup.connection.action({
      page   : page.get('_id'),
      type   : 'page',
      nonce  : uuid(),
      struct : 'flow',
    }, 'trigger', {
      type : 'webhook',
      data : body,
    });
  }
}