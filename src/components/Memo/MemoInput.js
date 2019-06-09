//메모 인풋

import React, { Component } from 'react';
import firebase from '../../Firebase';
import './CSS/stickyNote.css';
import minimize_icon from '../../assets/stickyNote/minimize.png';
import close_icon from '../../assets/stickyNote/close.png';
import check_icon from '../../assets/stickyNote/check.png';
import modify_icon from '../../assets/stickyNote/modify.png';

class MemoInput extends Component {
    static defaultProps = {
        data:[],
      }
    constructor(props) {
        super(props);
            this.state = {
                text:this.props.text,
                submitted:false,
                open:true,
                
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
        const ddoc=db.collection("User").doc(this.props.uid).collection("Url").doc(url);

         
        ddoc.get().then(
            (doc) => {
                if(doc.exists){
                    this.setState({
                        tmpdata: doc.data().memos
                    })
                    
                    console.log(doc.data());
                    console.log("this.state.tmpdata: ",this.state.tmpdata);
               }
            }
        ).then(()=>{
        const id = this.state.tmpdata[this.state.tmpdata.length-1].id;
        const newdata = this.state.tmpdata.concat(
            {
                id: id+1,
                posX :10,
                posY :30,
                text: this.state.text
            });
        console.log("id:" ,id);
        ddoc.set({memos: newdata }).then(()=> {
            console.log("Document successfully written!");
        });
    });

        console.log("props: ", this.props.data);
        

        
    };

    handleRevise = ()=>{
        console.log("handleRevise Mode");
        this.setState({
            submitted :false,
        })
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
                                        {this.state.text}
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
MemoInput.defaultProps={
    memos:'',
}
export default MemoInput;