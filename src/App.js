/*global chrome*/
import React, { Component } from 'react';
import './App.css';
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
            <div>
                <Switch>
                    <Route exact path="/" component="home"/>
                    <Route path="/signin" component={Signin}/>
                    <Route path="/mainMenu" component={MainMenu}/>
                </Switch>
            </div>
        </div>
        
        
      </Router>
    );
  }
}

export default App;
