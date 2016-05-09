import { Meteor } from 'meteor/meteor';

export const People = new Meteor.Collection("people");

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('people', function questionPublication() {
    return People.find({});
  });
}