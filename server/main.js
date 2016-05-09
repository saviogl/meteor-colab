import { Meteor } from 'meteor/meteor';

import { People } from '../imports/api/people.js';
import { Question } from '../imports/api/question.js';

People.remove({});
Question.remove({});

Meteor.startup(() => {
  Meteor.server.stream_server.register(Meteor.bindEnvironment((socket) => {
    let intervalID = Meteor.setInterval(() => {
      if (socket._meteorSession) {

        let connection = {
          connectionID: socket._meteorSession.id,
          connectionAddress: socket.address,
          userID: socket._meteorSession.userId,
          color: Math.floor(Math.random()*16777215).toString(16)
        };

        socket.id = socket._meteorSession.id;

        People.insert(connection);

        Meteor.clearInterval(intervalID);
      }
    }, 1000);

    socket.on('close', Meteor.bindEnvironment(() => {
      People.remove({
        connectionID: socket.id
      });
    }, (e) => {
      Meteor._debug("Exception from connection close callback:", e);
    }));
  }, (e) => {
    Meteor._debug("Exception from connection registration callback:", e);
  }));

  Meteor.call('question.insert', '');
});
