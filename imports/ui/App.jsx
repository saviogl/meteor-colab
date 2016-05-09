import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Question } from '../api/question.js';
// import { People } from '../api/people.js';

import TextArea from './TextArea.jsx';
import Users from './Users.jsx';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  renderTextAreas() { 
    return this.props.questions.map((q) => {
      return (
        <TextArea
        key={q._id}
        question={q}
        />
      );
    });
  }

  handleClick(event) {
    Meteor.call('question.insert', '');
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1 className="text-center">Collaborative Tool</h1>
        </header>

        <Users />

        <div className="question-textarea container">
          {this.renderTextAreas()}
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('questions');

  return {
    questions: Question.find({}, { sort: { createdAt: 1 } }).fetch()
  };
}, App);