//메모 인풋

import React, { Component } from 'react';
import firebase from '../../Firebase';
class MemoInput extends Component {
    constructor(props) {
        super(props);
        var parentData = this.props.stateFromParent;
        if(parentData==null){
            this.state = {
                test:"",
                submitted:false
            }
        }else {
            this.state = {
                test: parentData[0],
                submitted: parentData[1]
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleSubmit = () => {
        console.log("handleSubmit clicked");
        this.setState({
            submitted: true
        });
        var toParent =[];
        toParent[0] = this.state.test;
        toParent[1] = true;
        this.props.callbackFromParent(toParent);

        var db = firebase.firestore();
        db.collection("memo").doc("a").set({
            memos: [{
                text:this.state.test,
                posX: 3,
                posY: 4,
            },
            {
                text:this.state.test+"asdgsdg",
                posX: 37,
                posY: 43,
            }]
        }).then(function() {
            console.log("Document successfully written!");
        });

    };
    handleRevise = ()=>{
        console.log("handleRevise Mode");
        this.setState({
            submitted :false,
        })
        var toParent =[];
        toParent[0] = this.state.test;
        toParent[1] = false;
        this.props.callbackFromParent(toParent);
    };
    render() {
        return (
            <div className="memo-input-wrapper">
                {this.state.submitted
                    ?
                    <div className="memo-text">
                        {this.state.test}
                    </div>
                    :
                    <textarea
                        onChange={this.handleChange}
                        name="test"
                        className="memo-input"
                    >
                        {this.state.test}
                    </textarea>}
                    {this.state.submitted ? <button className="submit-btn" onClick={this.handleRevise}>수정</button>
                        : <button className="submit-btn" onClick={this.handleSubmit}>확인</button>}
            </div>
        );
    }
}
MemoInput.defaultProps={
    memos:'',
}
export default MemoInput;