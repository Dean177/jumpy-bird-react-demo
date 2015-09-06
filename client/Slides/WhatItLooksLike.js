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
      </div>
    );
  }
}