import { Mongo } from 'meteor/mongo';
 
export const History = new Mongo.Collection('history');


if (Meteor.isServer) {
  Meteor.publish('history', function historyPublication() {
    return History.find({
         owner: this.userId },
    );
  });
}

Meteor.methods({
'history.insert'(agency, agency_name, route, route_name) {

    
    check(agency, String);
    check(agency_name, String);
    check(route, String);
    check(route_name, String);
 
    // Make sure the user is logged in before inserting a entry in history 
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
 
    History.insert({
      agency,
      agency_name,
      route, 
      route_name,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  });