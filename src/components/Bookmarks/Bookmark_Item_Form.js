/*global chrome*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import firebase from '../../Firebase';
import {Bookmark, Category} from "./BookmarkStructures";

class Bookmark_Add_Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            uid: this.props.uid,
            categoryName: '',
            categories: [],
            title: '',
            url:  this.props.url,
            summary:'',
            tag:'',
            html: '',
        };

    };

    componentDidMount(): void {
        var uid = this.props.uid;
        var db = firebase.firestore();
        var categoryList= [];


        const request = require('request');
        request(this.state.url, function (err, res, html) {
            if (!err) {
                this.setState({
                    html: html
                })
            }

        }.bind(this));
        /*
           DB 구조
           (Collection) (Doc)     - Field
           Bookmark - Category_Id - categoryCount (Field)
                                  - categoryName  (Field)
                                  - Boomark 1 ~ n
           북마크 추가시 가져와야 할 것
            1) category_id
            2) categoryName
         */

        this.getCategoryListFromFirebase();
    }

    getCategoryListFromFirebase = () => {

        var db = firebase.firestore();
        var categoryList= [];

        db.collection("User").doc(this.state.uid).collection("Bookmark").get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
                if(doc.id !== "C_Info") {
                    categoryList.push(new Category(doc.id, doc.data()['categoryName'], ''));
                }
            });
            this.setState({
                categories: categoryList
            });
        });
    };
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = async () => {
        var bookMark_popup = document.getElementById('bookmark_popup');
        bookMark_popup.style.display='none';

        var db = firebase.firestore().collection("User").doc(this.state.uid).collection("Bookmark");

        var bookmarkNum = 'not';
        await db.doc(this.state.categoryName).get().then( doc => {
            bookmarkNum = doc.data().bookmarkCount;

            db.doc(this.state.categoryName).update({
                bookmarkCount: bookmarkNum + 1
            });
        });
        var newId = 'bookmark'+bookmarkNum;

        db.doc(this.state.categoryName).set({
            [newId]: {
                url: this.state.url,
                title: this.state.title,
                html: this.state.html,
                summary:this.state.summary
            }
        }, {merge: true});
    };


    render() {
        const labelStyle = {
            backgroundColor: '#EEE',
            borderRadius: '5px'
        };

        return (
            <div className="bookmark_popup">
                <h1>BookMark</h1>
                <label>Select categories</label>
                <select id='categoryName' name="categoryName" placeholder="Categories" onChange={this.handleChange}>
                    {
                        this.state.categories.map( data => {
                        return <option value={data.id}> {data.categoryName} </option>
                    })}
                </select>
                <input id="title" placeholder="BookMark Title" value={this.state.title} onChange={this.handleChange}/>
                <input id="summary" placeholder="Summary" value={this.state.summary} onChange={this.handleChange}/>
                <div>
                    <button onClick={this.handleSubmit}>Add Bookmark</button>
                </div>
            </div>
        );
    };
}
export default Bookmark_Add_Form;