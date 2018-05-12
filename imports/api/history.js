import { Mongo } from 'meteor/mongo';
 
export const History = new Mongo.Collection('history');

Meteor.methods({
'history.insert'(agency, route) {

    check(agency, String);
    check(route, String);
 
    // Make sure the user is logged in before inserting a entry in history 
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    History.insert({
      agency,
      route, 
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  });