import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import firebase from './../Firebase.js'
import MainMenu from './MainMenu';
import SignIn from './Signin';
import Route from "react-router-dom/es/Route";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    shouldComponentUpdate () {
        return true;
    }

    clickSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
            this.setState({
                user: null
            });
        });
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
            } else {
                this.props.history.push('index.html');
            }
        });
    }

    render() {
        if (this.state.user == null) {
            return (
                <div>
                    <SignIn />
                </div>
            );
        } else {
            return (
                <div>
                    <button onClick={this.clickSignOut}>Sign Out</button>
                    <MainMenu />
                </div>
            );
        }
    }
}

export default Header;