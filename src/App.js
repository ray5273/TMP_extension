/*global chrome*/
import React, { Component } from 'react';
import './App.css';
import Memo from './components/Main_Menu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Signin from './components/Signin'
import Memo_test from './components/Content_Memo'
//여기서 조건문 어떻게 추가하는지 확인하기 --> 로그인 전후 인식하는 것
//memo 버튼 , bookmark 버튼 눌렀을때 차이 생기도록 하기
class App extends Component {
  render() {
    return (
      <Router>
        <Header />
      </Router>
    );
  }
}

export default App;
