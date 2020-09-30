
// import base
import { Action } from '@dashup/module';

/**
 * create dashup action
 */
export default class EventAction extends Action {

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
    return 'fa fa-play';
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
      config : 'action/event/config',
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
    return 'Trigger Event';
  }

  /**
   * triggered
   *
   * @param opts 
   * @param element 
   * @param data 
   */
  async run(opts, element, data) {
    // trigger event
    if ((element.config || {}).event) {
      // trigger event
      this.dashup.emit(element.config.event, data);
    }

    // continue
    return true;
  }
}