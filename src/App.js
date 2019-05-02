/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Memo from './components/Main_Menu'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header';
import Signin from './components/Signin'
import Memo_test from './components/Content_Memo'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div>
            <Switch>
                <Route exact path="/" component="Home"/>
                <Route path="/signin" component={Signin}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
