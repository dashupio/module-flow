
// import base
import query from 'query';
import { Struct } from '@dashup/module';

/**
 * create dashup action
 */
export default class FilterAction extends Struct {

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
    return 'filter';
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
    return 'Filter';
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      config : 'action/filter/config',
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
    return 'Trigger Filter';
  }

  /**
   * action method
   *
   * @param param0 
   * @param action 
   * @param data 
   */
  async runAction(opts, action, data) {
    // get queries
    const queries = action.query ? JSON.parse(action.query) : [];

    // find where doesn't match
    if (queries.find((q) => {
      // return length
      return !query.query([data], q).length;
    })) {
      // return false
      return false;
    }
    
    // return true
    return { data };
  }
}