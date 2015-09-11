import '!style!css!../resources/styles/solarized_dark.css';

import React, { Component } from 'react';
import Highlight from 'react-highlight';

export default class WhatItLooksLike extends Component {
  render() {
    return (
      <div className="code-slide">
        <Highlight className='javascript'>
          {`
import React, { Component, PropTypes } from 'react';
import { addTodo, completeTodo, setVisibilityFilter, VisibilityFilters } from '../actions';
import AddTodo from '../components/AddTodo';
import TodoList from '../components/TodoList';
import Footer from '../components/Footer';

class App extends Component {
  static propTypes = {
    visibleTodos: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })),
    visibilityFilter: PropTypes.oneOf(['ALL', 'COMPLETED', 'ACTIVE']).isRequired
  };

  constructor(props) {
    super();
    this.handleKeyDown = ({ keyCode, shiftKey, ctrlKey }) => {
      if (keyCode === Left) { this.props.dispatch(previousSlide(this.props.slideNumber, shiftKey, ctrlKey)); }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div>
        <h1>Todo List</h1>
        <AddTodo onAddClick={ (text) => { addTodo(text); } } />
        <TodoList todos={visibleTodos} onTodoClick={ (index) => { completeTodo(index); } } />
        <Footer
          filter={visibilityFilter}
          onFilterChange={ (nextFilter) => { setVisibilityFilter(nextFilter); } }/>
      </div>
    );
  }
}

export default App
          `}
        </Highlight>
        <ul>
          <li>PropTypes</li>
          <li>Render method</li>
          <li>Some lifecycle methods we wont worry about right now</li>
        </ul>
      </div>
    );
  }
}