import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Firebase from '../Firebase'
class SimSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            abc: document.getElementsByName('q')[0].value
        }
    }
    getData = () =>{
        var db = Firebase.firestore();
        var uid = "guest";
        var docRef = db.collection("User").doc(uid).collection("Memo").doc("VkVgZ5yhz6lZgMmiNgPv");

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    };

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
                        <button onClick={this.getData}>button</button>
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
ReactDOM.render(<SimSearch/>, check1);
