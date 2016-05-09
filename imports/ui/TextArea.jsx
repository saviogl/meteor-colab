import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import { Question } from '../api/question.js';

// TextArea component - represents a single question
export default class TextArea extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.keyUp = this.keyUp.bind(this);
    this.click = this.click.bind(this);
  }

  handleChange(e) {
    this.setState({
      cursor: e.target.selectionStart,
      length: e.target.value.length
    });

    Meteor.call('question.update', this.props.question._id, e.target.value, e.target.selectionStart);
  }

  keyUp(e){
    this.setState({
      cursor: this.refs.textarea.selectionStart
    });
  }

  click(){
    this.setState({
      cursor: this.refs.textarea.selectionStart
    }); 
  }

  deleteQuestion(e){
    Meteor.call('question.remove', this.props.question._id);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state && this.state.cursor) {
      let userCursor = this.props.question.usercursor;
      if (prevProps.question.content !== this.props.question.content){
        if (userCursor < this.state.cursor) {
          let diff = this.props.question.content.length - this.state.length;
          console.log('diff', diff);
          console.log('userCursor', userCursor);
          console.log('owncusor', this.state.cursor);
          if (diff > 0) {
            this.setState({
              cursor: this.state.cursor + diff,
              length: this.props.question.content.length
            });
          }
        }
      }

      this.refs.textarea.setSelectionRange(this.state.cursor, this.state.cursor);
    }
  }

  render() {
    return (
      <div className="row">
        <div className="row">
          <div className="col-lg-12">
            <textarea
              className="form-control"
              rows="4"
              ref="textarea"
              onChange={this.handleChange}
              onKeyUp={this.keyUp}
              onClick={this.click}
              value={this.props.question.content}
              placeholder="Type question here..."
            ></textarea>
          </div>
        </div>
      </div>
    );
  }
}

TextArea.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  question: PropTypes.object.isRequired
};