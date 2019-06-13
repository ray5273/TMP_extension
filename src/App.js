/*global chrome*/
import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header/Header';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div>
                        <Header/>
                    </div>
                    <br/><br/><br/>
                </div>
            </Router>
        );
    }
}

export default App;
