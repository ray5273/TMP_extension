/*global chrome*/
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import 'firebase/firestore';
import MenuBar from "./MenuBar";

class SimSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abc: document.getElementsByName('q')[0].value
        }
    }
    componentDidMount(): void {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                var curUser = user.uid;
            } else {
                this.setState({ user: user });
            }
        });
    }
    render() {
        return (
            <React.Fragment>
                <div className="search1">
                    <p>TMP</p>
                </div>
                <div className="search2">
                    <div className="search3">
                        <div className="search4"> 이건 제목 이건 제목 이건 제목 </div>
                        <div> {this.state.abc}</div>
                    </div>
                    <div className="search3">
                        <div className="search4"> 이건 제목 </div>
                        <div className="search5"> Ttttttttttttttttttttthis is my first project. So I am really interested in it. But recently I have no sleeping. Therefore I am exhausted. </div>
                    </div>
                    <div className="search3">
                        This is Chrome This is Chrome This is Chrome This is Chrome This is Chrome This is Chrome This is Chrome This is Chrome This is Chrome
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default SimSearch;

const check1 = document.createElement('div');
const check2 = document.getElementById('rhs');
const check = document.getElementById('rhs_block');
check2.insertBefore(check1, check);


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.message==="getID"){
            ReactDOM.render(<SimSearch uid={request.id}/>, check1);
        }
    }
);
