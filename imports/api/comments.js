import { Mongo } from "meteor/mongo";
 
export const Comments = new Mongo.Collection("comments");


Meteor.methods({
"comments.insert"(text, agency, agency_name, route, route_name) {

	check(text, String);
    check(agency, String);
    check(agency_name, String);
    check(route, String);
    check(route_name, String);
 
    // Make sure the user is logged in before inserting a entry in history 
    if (! this.userId) {
      throw new Meteor.Error("not-authorized");
    }
 
    Comments.insert({
      text,
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