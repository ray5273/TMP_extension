import React, { Component } from 'react';
import Memo from './Main_Menu';
import Login from './Signin';

class ContentContainer extends Component {
  render() {
    if (this.props.num == 1) return <Memo />
    else return <Login />
  }
}

export default ContentContainer;