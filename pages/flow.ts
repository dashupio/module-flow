
// import page interface
import { Struct, Query } from '@dashup/module';

/**
 * build address helper
 */
export default class FlowPage extends Struct {

  /**
   * construct
   */
  constructor(...args) {
    // return
    super(...args);

    // checks
    this.checks = [];

    // run listen
    this.triggerAction = this.triggerAction.bind(this);
  }

  /**
   * returns page type
   */
  get type() {
    // return page type label
    return 'flow';
  }

  /**
   * returns page type
   */
  get icon() {
    // return page type label
    return 'fa fa-code-merge';
  }

  /**
   * returns page type
   */
  get title() {
    // return page type label
    return 'Flow Page';
  }

  /**
   * returns page data
   */
  get data() {
    // return page data
    return {};
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      view   : 'page/flow/view',
      menu   : 'page/flow/menu',
      config : 'page/flow/config',
    };
  }

  /**
   * returns object of views
   */
  get actions() {
    // return object of views
    return {
      trigger : this.triggerAction,
    };
  }

  /**
   * returns category list for page
   */
  get categories() {
    // return array of categories
    return ['Workflow'];
  }

  /**
   * returns page descripton for list
   */
  get description() {
    // return description string
    return 'Automated workflow page';
  }

  /**
   * run methods
   *
   * @param children 
   * @param tld 
   * @param opts 
   * @param data 
   */
  run(children, tld, opts, data) {
    // find children by tld
    const actualChildren = [...children].filter((child) => (child.parent || 'root') === tld);

    // loop
    actualChildren.forEach(async (actualChild) => {
      // emit new message
      let { data:newData } = await this.dashup.connection.action({
        ...opts,
  
        type   : 'action',
        struct : actualChild.type,
      }, 'run', actualChild, data) || {};

      // check data
      if (!newData) return;

      // if array
      if (!Array.isArray(newData)) newData = [newData];

      // all children
      newData.forEach((actualNewData) => {
        // run children
        this.run(children, actualChild.uuid, opts, actualNewData);
      });
    });
  }

  /**
   * trigger action
   *
   * @param opts 
   * @param data 
   */
  async triggerAction(opts, data) {
    // check nonce
    if (this.checks.includes(opts.nonce)) return null;

    // push
    this.checks.push(opts.nonce);

    // length
    if (this.checks.length > 100) this.checks.shift();

    // query pages where
    const page = await new Query(opts, 'page').findById(opts.page);

    // actions
    const children = page.get('data.children') || [];

    // get root children
    this.run(children, 'root', opts, data);
  }
}