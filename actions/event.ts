
// import base
import { Struct } from '@dashup/module';

/**
 * create dashup action
 */
export default class EventAction extends Struct {

  /**
   * construct
   */
  constructor(...args) {
    // return
    super(...args);

    // run listen
    this.runAction = this.runAction.bind(this);
  }

  /**
   * returns action type
   */
  get type() {
    // return action type label
    return 'event';
  }

  /**
   * returns trigger type
   */
  get icon() {
    // return trigger type label
    return 'fad fa-plus-square';
  }

  /**
   * returns action type
   */
  get title() {
    // return action type label
    return 'Event';
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      config : 'action/event',
    };
  }

  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      run : this.runAction,
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
    return 'Named Event Trigger';
  }

  /**
   * action method
   *
   * @param param0 
   * @param action 
   * @param data 
   */
  runAction(opts, action, data) {
    // trigger event
    this.dashup.connection.event(opts, action.event, data);

    // continue
    return { data };
  }
}