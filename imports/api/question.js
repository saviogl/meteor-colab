import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Question = new Mongo.Collection('question');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('questions', function questionPublication() {
    return Question.find({});
  });
}

Meteor.methods({
  'question.insert'(content) {

    Question.insert({
      content,
      createdAt: new Date()
    });
  },
  'question.remove'(questionId) {
    check(questionId, String);
    Question.remove(questionId);
  },
  'question.update'(questionId, content, cursor) {
    check(questionId, String);
    Question.update(questionId, { $set: { content: content, usercursor: cursor } });
  }
});