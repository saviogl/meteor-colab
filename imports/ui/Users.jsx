import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { createContainer } from 'meteor/react-meteor-data';

import { People } from '../api/people.js';

// TextArea component - represents a single question
export default class TextArea extends Component {
  renderUsers() {
    return this.props.people.map((user)=> {
      let style = {
        'borderBottom': '5px solid #' + user.color
      }

      return (
        <li key={user._id}>
          <div style={style}>
            <span className="glyphicon glyphicon-user"></span>
            <p>#{user._id.substr(0,3)}</p>
          </div>
        </li>
      );
    });
  }

  render() {
    return (
      <ul className="users-list text-center">
        {this.renderUsers()}
      </ul>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('people');

  return {
    people: People.find().fetch()
  };
}, TextArea);