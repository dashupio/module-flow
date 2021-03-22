// import base
import moment from 'moment';
import { Struct, Query } from '@dashup/module';

/**
 * create dashup action
 */
export default class CRONTrigger extends Struct {

  /**
   * construct
   */
  constructor(...args) {
    // return
    super(...args);

    // bind functions
    this.getTriggerable = this.getTriggerable.bind(this);

    // floor
    const floor = Math.floor((Math.random() * (60 * 1000)) + (10 * 1000));
    
    // interval
    setInterval(this.getTriggerable, floor);
  }

  /**
   * returns action type
   */
  get type() {
    // return action type label
    return 'cron';
  }

  /**
   * returns trigger type
   */
  get icon() {
    // return trigger type label
    return 'fa fa-alarm-clock';
  }

  /**
   * returns action type
   */
  get title() {
    // return action type label
    return 'CRON (Timed trigger)';
  }

  /**
   * returns object of views
   */
  get views() {
    // return object of views
    return {
      config : 'trigger/cron/config',
    };
  }

  /**
   * returns object of views
   */
  get events() {
    // return object of views
    return {
      
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
    return 'Timed Trigger';
  }

  /**
   * get triggerable
   */
  async getTriggerable() {
    // query where date ends
    const endQuery = {
      'data.trigger.date.until' : {
        '$gt' : new Date(),
      },
      'data.trigger.date.start' : {
        '$lt' : new Date(),
      },
      'data.trigger.date.repeat'   : true,
      'data.trigger.date.rep.ends' : 'until',
    };

    // query where date forever
    const foreverQuery = {
      'data.trigger.next' : {
        '$lt' : new Date(),
      },
      'data.trigger.date.start' : {
        '$lt' : new Date(),
      },
      'data.trigger.date.repeat'  : true,
      'data.trigger.date.repends' : 'forever',
    };

    // query where date forever
    const foreverQueryTwo = {
      'data.trigger.next'       : null,
      'data.trigger.date.start' : {
        '$lt' : new Date(),
      },
      'data.trigger.date.repeat'   : true,
      'data.trigger.date.rep.ends' : 'forever',
    };

    // query where date forever
    const singleQuery = {
      'data.trigger.next'       : null,
      'data.trigger.date.start' : {
        '$lt' : new Date(),
      },
      'data.trigger.date.repeat' : false,
    };

    // create queries
    const pages = [].concat(
      ...(await new Query({
      
      }, 'page').where({
        type                : 'flow',
        'data.trigger.type' : 'cron', 
      }).where(endQuery).find()),
      ...(await new Query({
      
      }, 'page').where({
        type                : 'flow',
        'data.trigger.type' : 'cron', 
      }).where(foreverQuery).find()),
      ...(await new Query({
      
      }, 'page').where({
        type                : 'flow',
        'data.trigger.type' : 'cron', 
      }).where(foreverQueryTwo).find()),
      ...(await new Query({
      
      }, 'page').where({
        type                : 'flow',
        'data.trigger.type' : 'cron', 
      }).where(singleQuery).find()),
    );
    
    // create singular ids
    const filteredPages = Object.values(pages.reduce((accum, page) => {
      // push
      if (!accum[page.get('_id')]) accum[page.get('_id')] = page;

      // accum
      return accum;
    }, {}));

    // set values
    filteredPages.forEach((page) => {
      // check next
      if (page.get('data.trigger.next')) page.set('data.trigger.prev', page.get('data.trigger.next'));

      // prev
      const prev = page.get('data.trigger.prev') || page.get('data.trigger.date.start');

      // check prev
      if (!prev) return;

      // next date
      let next = moment(prev);

      // chech while
      while (next.toDate() < new Date()) {
        // add
        next.add(page.get('data.trigger.date.rep.amount') || 1, page.get('data.trigger.date.rep.period') || 'minute');
      }

      // set next
      page.set('data.trigger.next', next);
      page.save({});

      // emit new message
      this.dashup.connection.action({
        page   : page.get('_id'),
        type   : 'page',
        struct : 'flow',
      }, 'trigger', {
        type : 'cron',
        data : {
          next,
          prev,
        },
      });
    });
  }
}