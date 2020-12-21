import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import Home from './home.js';
import List from './list.js';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/list" component={List} />
        </div>
      </BrowserRouter>
    );
  }
}

// eslint-disable-next-line no-undef
ReactDom.render(<App />, document.getElementById('root'));
