//메모 인풋

import React, { Component } from 'react';
import firebase from '../../Firebase';
import './CSS/stickyNote.css';

class MemoInput extends Component {
    constructor(props) {
        super(props);
        var parentData = this.props.stateFromParent;
        if(parentData==null){
            this.state = {
                test:"",
                submitted:false,
                open:true
            }
        }else {
            this.state = {
                test: parentData[0],
                submitted: parentData[1],
                open:true
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
    handleDelete = ()=>{
        console.log("handleDelete Mode");
    };
    render() {
        return (
            <div className="memo-input-wrapper">
                <div className="input-menu-wrapper">
                    {/*이부분에 최소화 버튼 네모가 좋을듯 --> 빨간 배경에 - */}
                    {/*체크버튼 , 펜 버튼 왔다갔다하게 만들기*/}
                    {/*삭제버튼(X버튼) 추가하기*/}
                    {this.state.submitted
                        ?
                        <a className="submit-btn" onClick={this.handleRevise}>수정</a>
                        : <a className="submit-btn" onClick={this.handleSubmit}>확인</a>}
                    <a onClick={()=>this.setState({open:!this.state.open})}>최소화</a>
                    <a className="delete-btn" onClick={this.handleDelete}>삭제</a>
                    <div className="memo-text-wrapper">
                        {   this.state.open
                            ?

                                this.state.submitted
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
                                    </textarea>

                            :
                            <div className="memo-minimize">
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}
MemoInput.defaultProps={
    memos:'',
}
export default MemoInput;