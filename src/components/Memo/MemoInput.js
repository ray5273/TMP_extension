import React, { Component } from 'react';
import firebase from '../../Firebase';
import './CSS/stickyNote.css';
import minimize_icon from '../../assets/stickyNote/minimize.png';
import close_icon from '../../assets/stickyNote/close.png';
import check_icon from '../../assets/stickyNote/check.png';
import modify_icon from '../../assets/stickyNote/modify.png';

class MemoInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text,
            submitted: !props.isNew,
            open: true,
            id: "",
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = () => {
        this.setState({
            submitted: true
        });

        const url = encodeURIComponent(this.props.url);
        var db = firebase.firestore();

        db.collection("User").doc(this.props.uid).collection("Url").doc(url).collection("Memos").doc(this.props.id).update({
            content: this.state.text
        })
        .then(function() {
            console.log("Memo content data changed");
        })
        .catch(function(error) {
            console.error("Error while changing memo content data", error);
        });
    };

    handleRevise = ()=>{
        console.log("handleRevise Mode");
        this.setState({
            submitted :false,
        })
    };

    handleDelete = ()=>{
        console.log("handleDelete Mode");

        const url = encodeURIComponent(this.props.url);
        const ask = window.confirm("정말 삭제하시겠습니까?");
        if(ask) {
            var db = firebase.firestore();

            db.collection("User").doc(this.props.uid).collection("Url").doc(url).collection("Memos").doc(this.props.id).delete();

            document.getElementById(`stickyMemo_${this.props.id}`).style.visibility = 'hidden';
        }else{

        }
    };


    render() {
        return (
            <div className="memo-input-wrapper">
                <div className="input-menu-wrapper">

                    {/*이부분에 최소화 버튼 네모가 좋을듯 --> 빨간 배경에 - */}
                    {/*체크버튼 , 펜 버튼 왔다갔다하게 만들기*/}
                    {/*삭제버튼(X버튼) 추가하기*/}
                    <a className="delete-btn" onClick={this.handleDelete}>
                        <img src={close_icon} alt=""/>
                    </a>
                    <a onClick={()=>this.setState({open:!this.state.open})}>
                        <img src={minimize_icon} alt=""/>
                    </a>
                    {this.state.submitted
                        ?
                        <a className="submit-btn" onClick={this.handleRevise}>
                            <img src={modify_icon} alt=""/>
                        </a>
                        : <a className="submit-btn" onClick={this.handleSubmit}>
                            <img src={check_icon} alt=""/>
                        </a>}
                    <div className="memo-text-wrapper">
                        {   this.state.open
                            ?
                                this.state.submitted
                                    ?
                                    <div className="memo-text">
                                        <textarea readOnly className="memo-input">
                                            {this.state.text}
                                        </textarea>
                                    </div>
                                    :
                                    <textarea
                                        onChange={this.handleChange}
                                        name="text"
                                        className="memo-input"
                                    >
                                    {this.state.text}
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
export default MemoInput;