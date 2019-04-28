import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Memo from './Main_Menu';
import Login from './Signin';
import ContentContainer from './ContentContainer';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state={
            test:2
        }
    }
    shouldComponentUpdate () {
        return true;
    }   
    clickMemo = () => {
        this.setState({
            test:1
        })
    }
    clickLogin = () => {
        this.setState({
            test:2
        })
    }

    render() {
        return (
            <div>
                <button onClick={this.clickMemo} >메모</button>
                <button onClick={this.clickLogin}>로그인</button>
                <ContentContainer num={this.state.test}/>
            </div>
        );
    }
}

export default Header;


