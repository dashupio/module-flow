
// import base
import { Struct } from '@dashup/module';

/**
 * create dashup action
 */
export default class HookAction extends Struct {

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
    return 'hook';
  }

  /**
   * returns trigger type
   */
  get icon() {
    // return trigger type label
    return 'fa fa-calendar-exclamation';
  }

  /**
   * returns action type
   */
  get title() {
    // return action type label
    return 'Hook';
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      config : 'action/hook',
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
    return 'Trigger Hook';
  }

  /**
   * action method
   *
   * @param param0 
   * @param action 
   * @param data 
   */
  async runAction(opts, action, data) {
    // trigger event
    await this.dashup.connection.hook(opts, action.hook, data);

    // continue
    return { data };
  }
}