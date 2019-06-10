
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Bookmark_Add_Form from "./Bookmarks/Bookmark_Item_Form";
import Bookmark_Category from "./Bookmarks/Bookmark_Category";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {Bookmark, Category} from './Bookmarks/BookmarkStructures';
import firebase from '../Firebase';

const BookmarkButton = styled(Button)`
    variant: outlined;
    color: primary;
    margin: 5px
`;

const FirstCollection = "User";
const C_Info = "C_Info";

class Bookmarks extends Component {
    id = 1;
    categoryId = 1;

    constructor(props) {
        super(props);
        this.state = {
            uid: firebase.auth().currentUser.uid,
            addBookmark: false,
            categories: [],
            openRemoveCategory: false
        }

    };

    componentWillUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
    }

    componentWillMount(): void {

        var db = firebase.firestore().collection("User").doc(this.state.uid);
        // console.log("this user uses it at first.111 : ", this.state.uid);
        if(db === undefined) {
            console.log("this user uses it at first.");
            db.collection(FirstCollection).doc(this.state.uid).collection("Bookmark").doc(C_Info).set({
                categoryCount:1
            });
            db.collection(FirstCollection).doc(this.state.uid).collection("Bookmark").doc('기본카테고리').set({
                bookmarkCount:0
            });
        }
        else {
            console.log("componentWillMount : 이미 사용한 적이 있다. 파이어 베이스에서 불러와야 한다.");
        }
    }
    componentDidMount(): void {
        this.getCategoryListFromFirebase();
    }

    // Take a Categories from Firestore.
     getCategoryListFromFirebase = () => {
         var categoryList= [];
         var db = firebase.firestore();

        // console.log("Bookmark Collection exist. it means that user used it");
        db.collection(FirstCollection).doc(this.state.uid).collection("Bookmark").get().then((snapshot) => {
              snapshot.docs.forEach(doc => {
                  var categoryName = "";
                  var bookmarkList = [];
                 if(doc.id !== C_Info) {
                     for(var book in doc.data()) {
                         if(book === 'bookmarkCount') {}
                         else if(book === 'categoryName') {
                             categoryName = doc.data()[book];
                             // console.log("categoryName : ", categoryName);
                         } else {
                             var _url, _title, _summary, _html;
                             for(var element in doc.data()[book]) {
                                 if(element === 'url') {
                                     _url = doc.data()[book][element];
                                 } else if(element === 'title') {
                                     _title = doc.data()[book][element];
                                 } else if(element === 'summary') {
                                     _summary = doc.data()[book][element];
                                 } else if(element === 'html') {
                                     _html = doc.data()[book][element];
                                 }
                             }
                             // console.log("book : ", book);
                             bookmarkList.push(new Bookmark(book, _url, _title, _summary, '', _html));
                         }
                     }
                     // console.log("doc ic : ", doc.id, ", name : ", categoryName);
                     categoryList.push(new Category(doc.id, categoryName,bookmarkList));
                 }
             });
             this.setState({
                 categories: categoryList
             })
         });
    };

    // Create Category Folder
    handleCreateFolder = async () => {
        var db = firebase.firestore().collection(FirstCollection).doc(this.state.uid).collection("Bookmark");
        var categoryNum = 'not';
        await db.doc(C_Info).get().then( doc => {
            categoryNum = doc.data().categoryCount;
        });

        console.log("categoryNum : ", categoryNum);
        db.doc(C_Info).set({
           categoryCount: categoryNum+1
        }).then(function () {
            console.log("categoryCount successfully updated");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });

        db.doc("category"+categoryNum).set({
            categoryName: "생성된 카테고리",
            bookmarkCount: 0
        }).then(function () {
            console.log("category successfully added");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });

        // after update, re-take bookmarks.
        this.getCategoryListFromFirebase();
    };

    // Remove Category Folder
    handleRemoveCategory = (categoryId) => {
        console.log("removed : " + categoryId);

        var db = firebase.firestore().collection(FirstCollection).doc(this.state.uid).collection("Bookmark");
        db.doc(categoryId).delete();

        this.getCategoryListFromFirebase();

        this.setState({
            openRemoveCategory: !this.state.openRemoveCategory,
        });
    };

    // Chane Category Name
    handleChangeCategoryName = (category) => {
        var db = firebase.firestore().collection(FirstCollection).doc(this.state.uid).collection("Bookmark");
        db.doc(category.categoryId).update({
            categoryName:category.changedCategoryName
        }).then(function () {
            console.log("changedCategoryName successfully updated");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });

        this.getCategoryListFromFirebase();
    };

    // addBookmark open handling
    handleAddBookmark = () => {
        this.setState({
            addBookmark: !this.state.addBookmark
        });
    };

    // handle boomark's edition in category
    handleEditBookmark = (changedCategory, bookmark) => {

        var changedBookmark = {
            html: bookmark.html,
            summary: bookmark.summary,
            title: bookmark.title,
            url: bookmark.url
        };
        var db = firebase.firestore().collection(FirstCollection).doc(this.state.uid).collection("Bookmark");
        console.log("handleEditBookmark : ", bookmark.id, ", ");
        db.doc(changedCategory.categoryId).update({
           [bookmark.id]: changedBookmark
        }).then(function () {
            console.log([bookmark.id], " successfully updated");
        }).catch(function (error) {
            console.error("Error writing document: ", error);
        });

        this.getCategoryListFromFirebase();
    };

    // handleRemove Bookmark in a category
    handleRemoveBookmark = (categoryId, bookmarkId) => {

        var db = firebase.firestore().collection(FirstCollection).doc(this.state.uid).collection("Bookmark");
        db.doc(categoryId).update({
           [bookmarkId]: firebase.firestore.FieldValue.delete()
        });

        this.getCategoryListFromFirebase();
    };


    handleSubmit = (data) => {
        var bookmark = new Bookmark(data.url, data.title, data.summary, data.tag, data.html);
        console.log("HTML from Content_bookmark : arg : \n"+ data.html);

        var newCategories = this.state.categories.map( (category) => {
            if(data.categoryName === category.categoryName) {
                category.bookmarkList = (category.bookmarkList).concat(new Bookmark(data.url, data.title, data.summary, data.tag, data.html));
            }
            return category;
        });

        if (data.title !== '') {
            this.setState({
                addBookmark: !this.state.addBookmark,
                categories: newCategories,
            })
        } else {
            alert("공백으로 만들 수 없습니다.");
        }
    };


    showCategories() {
        return this.state.categories.map((item) => {
           // console.log("from showCategories : " + item.categoryName);
            return <Bookmark_Category
                categoryId = {item.id}
                categoryName={item.categoryName}
                bookmarkList={item.bookmarkList}
                handleChangeCategoryName = {this.handleChangeCategoryName}
                openRemoveCategory = {this.state.openRemoveCategory}
                handleRemoveCategory = {this.handleRemoveCategory}
                handleRemoveBookmark={this.handleRemoveBookmark}
                handleEditBookmark={this.handleEditBookmark}/>
        })
    }

    render() {
        return (
            <div >
                <div>
                    <BookmarkButton onClick={this.handleCreateFolder}>폴더 생성</BookmarkButton>
                    <BookmarkButton onClick={() => {
                        this.setState({openRemoveCategory: !this.state.openRemoveCategory});
                        }}>폴더 삭제</BookmarkButton>
                    <BookmarkButton onClick={this.handleAddBookmark}>북마크 추가</BookmarkButton>
                </div>
                <div>
                    { this.state.addBookmark ? <Bookmark_Add_Form handleSubmit={this.handleSubmit} categories={this.state.categories} />  : "" }
                </div>
                <br/>
                <div>
                    { this.showCategories() }
                </div>
            </div>
        );
    };
}

Bookmarks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default Bookmarks;