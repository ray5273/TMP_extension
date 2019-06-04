
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Bookmark_Add_Form from "./Bookmarks/Bookmark_Item_Form";
import Bookmark_Category from "./Bookmarks/Bookmark_Category";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {Bookmark, Category} from './Bookmarks/BookmarkStructures';

const BookmarkButton = styled(Button)`
    variant: outlined;
    color: primary;
    margin: 5px
`;

class Bookmarks extends Component {
    id = 1;
    categoryId = 1;

    constructor(props) {
        super(props);
        this.state = {
            addBookmark: false,
            categories: this.getCategoryListFromFirebase(),
            openRemoveCategory: false
        }
    };

    // Content_Bookmark 초기 생성 시 fb에서 리스트를 가져옴.
    // TODO: 파이어베이스 연동을 해야함. 북마크 관련해서 파이어베이스 연동을 아직 안함.
    getCategoryListFromFirebase = () => {
        var b1 = new Bookmark('https://www.naver.com', '네이버','testing....', '#연습');
        var b2 = new Bookmark('https://www.google.com', '구글','testing....', "#연습");
        const bookmarklist = [b1, b2];

        return [].concat(new Category(this.categoryId++, '기본카테고리', bookmarklist))
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props;
 /*
        if (oldProps.keyword !== newProps.keyword) {
            this.setState({
                searched: this.state.bookmarks.filter(
                    x => x.title.indexOf(this.props.keyword) > -1
                )
            })
        }

  */
    };

    // 카테고리 이름(id), 북마크 리스트? ..... 아직 미정.
    handleCreateFolder = () => {

        this.setState( {
            categories: this.state.categories.concat(new Category(this.categoryId++, '추가된 카테고리' + (this.categoryId-1), []))
        });

    };

    handleAddBookmark = () => {

        this.setState({
            addBookmark: !this.state.addBookmark
        });
    };

    // 카테고리의 변화를 핸들링.
    handleChange = (changedCategory) => {
        this.setState({
            categories: this.state.categories.map((category)=> {
                if(category.categoryName === changedCategory.categoryName) {
                  //  category.categoryName = changedCategory.changedCategoryName;
                  //  category.bookmarkList = changedCategory.bookmarkList;
                    return new Category(category.id, changedCategory.changedCategoryName, changedCategory.bookmarkList);
                }
                else
                    return category;
            })
        });
    };

    // 카테고리의 삭제 변화를 다룬다. 예를 들어, 북마크의 삭제 혹은 카테고리의 삭제.
    handleRemove = (categoryName, list) => {
        list.map( (item) => {
            console.log("remove from Content_Bookmark : " + item.title);
        });

        this.setState({
            categories: this.state.categories.map((category) => {
                if (category.categoryName === categoryName) {
                    category.categoryName = categoryName;
                    category.bookmarkList = list;
                    return category;
                } else
                    return category;
            })
        });
    };

    // 카테고리 삭제
    handleRemoveCategory = (categoryName) => {
        console.log("removed : " + categoryName);
        this.setState({
            openRemoveCategory: !this.state.openRemoveCategory,
            categories: this.state.categories.filter( cate => { if(cate.categoryName !== categoryName) { console.log(cate.categoryName); return cate;}
            })
        });
        this.state.categories.map((c) => console.log("from removeCategory : " + c.categoryName));
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
                    categoryName={item.categoryName}
                    bookmarkList={item.bookmarkList}
                    openRemoveCategory = {this.state.openRemoveCategory}
                    handleRemoveCategory = {this.handleRemoveCategory}
                    handleRemove={this.handleRemove}
                    handleChange={this.handleChange}/>
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