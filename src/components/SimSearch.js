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
            abc: document.getElementsByName('q')[0].value,
            search: []
        }
    }
    componentDidMount(): void {
        console.log("uid in Simsearch : " + this.props.uid);

        this.setState({
            abc: this.state.abc.replace(/(\s*)/g,"")
        });

        var uid = this.props.uid;
        var url = this.props.url;

        url = encodeURIComponent(url);

        var db = firebase.firestore();

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({user: user});
                var curUser = user.uid;
                console.log("SimSearch: User value:" + curUser);

            } else {
                this.setState({user: user});
                console.log("SimSearch: Signed Out");
            }
        });

        /*db.collection("User").doc(uid).collection("Url").doc("https%3A%2F%2Fjechue.tistory.com%2F55").get().then(docs => {
            docs.data().memos.forEach(memo => {
                console.log(memo.y);
            })
        });
        console.log("됐나?");

        console.log(this.state.abc);*/
        //User(col)-UID(doc)-Url(col)-Url1(doc)-field(memos:[{},{},{}])의 db structure 일 때
        /*db.collection("User").doc(uid).collection("Url").get()
            .then(docs=>{
                console.log(docs);
                docs.forEach(doc=>{
                    console.log(doc);
                    console.log(doc.id);
                    console.log(doc.data());
                    console.log(doc.data().memos);
                    doc.data().memos.forEach( memo => {
                        console.log(memo);
                        let temp = memo.content;
                        console.log(temp);
                        temp = temp.replace(/(\s*)/g,"");

                        if(temp.indexOf(this.state.abc) !== -1){
                            this.setState({
                                search: this.state.search.concat({content: memo.content, url: doc.data().url, title: doc.data().title})
                            })
                        }
                    });
                })
            });*/
        db.collection("User").doc(uid).collection("Url").get()
            .then(docs => {
                console.log(docs);
                docs.forEach(doc => {
                    console.log(doc);
                    db.collection("User").doc(uid).collection("Url").doc(doc.id).collection("Memos").get()
                        .then(memos => {
                            console.log(memos);
                            memos.forEach(memo => {
                                let temp = memo.data().content;
                                console.log(temp);
                                temp = temp.replace(/(\s*)/g,"");
                                const decodedUrl = decodeURIComponent(memo.data().url);
                                if(temp.indexOf(this.state.abc) !== -1){
                                    this.setState({
                                        search: this.state.search.concat({content: memo.data().content, url:decodedUrl, title: memo.data().title})
                                    })
                                }
                            })
                        })
                })
            });
    }
    render() {
        let j = 0;
        const open = this.state.search.map((memo,i) =>{
            j = j + 1;
            return(
                //<React.Fragment key = {i}>
                <div key = {i} className="search3" onClick={()=>window.open(memo.url)}>
                    <div className="search4"> {memo.title} </div>
                    <div className="search5"> {memo.content} </div>
                </div>
                //</React.Fragment>
            )
        });
        return (
            <React.Fragment>
                <div className="search1">
                    Trendy Memo Project
                </div>
                <div className="search2">
                    {j === 0 ? <div> 관련된 데이터가 없습니다. </div> : open}
                </div>
            </React.Fragment>
        /*<div className="search1">
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

            </React.Fragment>*/
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
