
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Bookmark_Add_Form from "./Bookmarks/Bookmark_Item_Form";
import Bookmark_Category from "./Bookmarks/Bookmark_Category";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import {Bookmark, Category} from './Bookmarks/BookmarkStructures';

const styles = theme => ({
    main: {
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {

            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },

    submit: {
        marginTop: theme.spacing.unit * 3,
    },

    button: {
      margin:theme.spacing.unit,
    },

});

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

        }
    };

    // Content_Bookmark 초기 생성 시 fb에서 리스트를 가져옴.
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
                    category.categoryName = changedCategory.changedCategoryName;
                    category.bookmarkList = changedCategory.bookmarkList;
                    return category;
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

    handleSubmit = (data) => {
        var bookmark = new Bookmark(data.url, data.title, data.summary, data.tag);
        var newCategories = this.state.categories.map( (category) => {
            if(data.categoryName === category.categoryName) {
                category.bookmarkList = (category.bookmarkList).concat(bookmark);
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
                return <Bookmark_Category
                    categoryName={item.categoryName}
                    bookmarkList={item.bookmarkList}
                    handleRemove={this.handleRemove}
                    handleChange={this.handleChange}/>
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <div>
                    <BookmarkButton onClick={this.handleCreateFolder}>폴더 생성</BookmarkButton>
                    <BookmarkButton>폴더 삭제</BookmarkButton>
                    <BookmarkButton onClick={this.handleAddBookmark}>북마크 추가</BookmarkButton>
                </div>

                <main className={classes.main}>
                    <div>
                        { this.state.addBookmark ? <Bookmark_Add_Form handleSubmit={this.handleSubmit} categories={this.state.categories} />  : "" }
                    </div>
                    <br/>
                    <div>
                        { this.showCategories() }
                    </div>
                </main>
            </div>
        );
    };
}

Bookmarks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmarks);