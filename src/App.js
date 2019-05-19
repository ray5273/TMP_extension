/*global chrome*/
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Header from './components/Header/Header';
import Signin from './components/Signin';
import MainMenu from './components/MainMenu';

class App extends Component {
  render() {
    return (
      <Router> 
        <div>
            <div>
                <Header />
            </div><br/><br/><br/>
        </div>
      </Router>
    );
  }
}

export default App;
