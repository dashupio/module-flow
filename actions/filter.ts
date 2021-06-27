
// import base
import query from 'query';
import pretty from 'pretty-ms';
import moment from 'moment-timezone';
import helpers from 'handlebars-helpers';
import handlebars from 'handlebars';
import { Struct } from '@dashup/module';

// register helper
handlebars.registerHelper(helpers());
handlebars.registerHelper('ms', (amount, extra, options) => {
  // check now
  amount = parseInt(amount);

  // return formatted
  return pretty(amount);
});
handlebars.registerHelper('date', (date, fmt, options) => {
  // check now
  if (date === 'now') date = new Date();

  // check options
  if (typeof fmt !== 'string') {
    fmt = 'MMMM DD YYYY, LT';
    options = fmt;
  }

  // return formatted
  return moment(date).format(fmt);
});
handlebars.registerHelper('timezone', (tz, options) => {
  // check now
  let date = new Date();

  // return formatted
  return moment(date).tz(tz).format('ha z');
});
handlebars.registerHelper('since', (date, extra, options) => {
  // check now
  if (date === 'now') date = new Date();

  // check options
  if (typeof extra !== 'boolean') {
    extra = true;
    options = extra;
  }

  // return formatted
  return moment(date).fromNow(extra);
});
handlebars.registerHelper('var', (varName, varValue, options) => {
  // set var
  options.data.root[varName] = varValue;
});

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
      config : 'action/filter',
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
    let queries = action.query ? JSON.parse(action.query) : [];

    // loop
    queries = queries.map((filter) => {
      // try/catch
      try {
        // set type
        const type = Object.keys(filter)[0];

        // set type
        filter[type] = filter[type].map((item) => {
          // get keys
          const name = Object.keys(item)[0];
          const fn = Object.keys(item[name])[0];

          // return item
          if (typeof item[name][fn] !== 'string') return item;

          // create thing
          const template = handlebars.compile(item[name][fn]);

          // value
          let value = template({
            ...data,
          });

          // fix falsy
          if (`${value}`.toLowerCase() === 'true') value = true;
          if (`${value}`.toLowerCase() === 'false') value = false;

          // return filtered
          return {
            [name] : {
              [fn] : value,
            },
          };
        }).filter((t) => t);
      } catch (e) {}

      // return filter
      return filter;
    });

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