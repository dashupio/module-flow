
// import base
import { Action } from '@dashup/module';

/**
 * create dashup action
 */
export default class HookAction extends Action {

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
      config : 'action/hook/config',
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
   * triggered
   *
   * @param opts 
   * @param element 
   * @param data 
   */
  async triggered(opts, element, data) {
    // trigger hook
    if ((element.config || {}).hook) {
      // trigger hook
      await this.dashup.hook(`${element.config.hook}`, data);
    }

    // continue
    return true;
  }
}