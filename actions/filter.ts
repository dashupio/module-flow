
// import base
import query from 'query';
import { Struct } from '@dashup/module';

/**
 * create dashup action
 */
export default class FilterAction extends Struct {

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
   * triggered
   *
   * @param opts 
   * @param element 
   * @param data 
   */
  async run(opts, element, data) {
    // get queries
    const queries = element.config.query ? JSON.parse(element.config.query) : [];

    // find where doesn't match
    if (queries.find((q) => {
      // return length
      return !query.query([data.sanitised], q).length;
    })) {
      // return false
      return false;
    }
    
    // return true
    return true;
  }
}