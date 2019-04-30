import React, { Component } from 'react';
import ContentContainer from './ContentContainer';
import firebase from './../Firebase.js'

class Header extends Component {
    constructor() {
        super();
        this.state = {
            user: 0,
        };
    }

    shouldComponentUpdate () {
        return true;
    }

    clickSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
            this.setState({
                user: 0
            });
        });
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    user: 1
                });
            }
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.clickSignOut}>Sign Out</button>
                <ContentContainer num={this.state.user}/>
            </div>
        );
    }
}

export default Header;


