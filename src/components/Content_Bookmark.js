import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import BookmarkItem from './Bookmarks/BookmarkItem';
import Bookmark_Add_Form from "./Bookmarks/Bookmark_Item_Form";
import Bookmark_Category from "./Bookmarks/Bookmark_Category";
import BookmarkItem1 from "./Bookmarks/BookmarkItem1";
import styled from "styled-components";
import Button from "@material-ui/core/Button";


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
            bookmark: [],  //   not categorized bookmarkItems
            categories: [
                {   categoryName: '기본카테고리',
                    bookmarks: [
                        {"id": this.id++,
                            bookmark: <BookmarkItem1
                            url={'http://www.naver.com'}
                            title={'네이버'}
                            summary={'testing....'}
                            tag={'#연습'}

                        />},
                        {"id": this.id++,
                            bookmark: <BookmarkItem1
                            url={'http://www.google.com'}
                            title={'구글'}
                            summary={'testing....'}
                            tag={'#연습2'}
                        />}]
                }],
            searched: [],
            addBookmark: false,
            list: [
                <BookmarkItem1
                    id={1}
                    url={'http://www.naver.com'}
                    title={'네이버'}
                    summary={'testing....'}
                    tag={'#연습'}

                />,
                <BookmarkItem1
                    id={2}
                    url={'http://www.google.com'}
                    title={'구글'}
                    summary={'testing....'}
                    tag={'#연습2'}
                />,

            ],
        }
    };

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
        console.log("event : handleCreateFolder");

        this.setState( {
            categories: this.state.categories.concat({categoryName: "기본카테고리" + this.categoryId++, bookmarks: []})
        });

        this.state.categories.map( (category) =>(
            console.log("event : handleCreateFolder" + category)
        ));
        

    };

    handleAddBookmark = () => {

        this.setState({
            addBookmark: !this.state.addBookmark
        });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    };

    handleRemove = (id) => {
        /* 파이어베이스에 보낼 코드 */

        const {bookmarks} = this.state;
        this.setState({
            bookmarks: bookmarks.filter(bookmark => bookmark.id !== id),

        });
    };

    handleSubmit = (data) => {
        /* 파이어베이스에 보낼 코드  */

        this.state.categories.map( (item) => (
                console.log("handleSubmit : " + item)
            )
        )

        var newCategories = this.state.categories.map( (category) => {
            if(data.categoryName === category.categoryName) {
                console.log("log" + data.categoryName)
                console.log(category.bookmarks)
                category.bookmarks = category.bookmarks.concat({
                    "id": this.id++,
                    bookmark: <BookmarkItem1
                        url={data.url}
                        title={data.title}
                        summary={'testing....'}
                        tag={data.tag}
                    />
                })
                return category;
            }
        });

        newCategories.map( (data) => {
            if(typeof  data != 'undefined' && data != null)
                console.log("newCateory: " + data.categoryName + ", " + data.bookmarks)
        });

        if (data.title !== '') {
            console.log("submit start : ", data.categoryName + "list :" + newCategories[0].bookmarks);
            this.setState({
                addBookmark: !this.state.addBookmark,
                categories: newCategories,
            })
        } else {
            alert("공백으로 만들 수 없습니다.");
        }
        console.log("submit start : ", data.categoryName + "list :" + this.state.categories[0].bookmarks);
    };

    handleShow() {
        return this.state.bookmark.map(
            ({id, title, url, summary, tag}) => (
                <BookmarkItem
                    id={id}
                    title={title}
                    url={url}
                    summary={summary}
                    tag={tag}
                    handleRemove={this.handleRemove}
                />
            )
        )
    }

    showCategories() {
        console.log(this.state.categories[0].bookmarks);
        return this.state.categories.map((item) => {
                console.log("imem : " + item.categoryName + " " + item.bookmarks);
                return <Bookmark_Category categoryName={item.categoryName} bookmarkList={item.bookmarks}/>
            }
        )

    }

    render() {
        const { classes } = this.props;
        return (
            <div >
                <div>
                    <BookmarkButton onClick={this.handleCreateFolder}>폴더 생성</BookmarkButton>
                    <BookmarkButton>폴더 삭제</BookmarkButton>
                    <BookmarkButton onClick={this.handleAddBookmark}>북마크 추가</BookmarkButton>
                    <BookmarkButton>북마크 삭제</BookmarkButton>
                </div>

                <main className={classes.main}>
                    <div>
                        { this.state.addBookmark ? <Bookmark_Add_Form handleSubmit={this.handleSubmit} categories={this.state.categories} />  : "" }
                    </div>
                    <br/>
                    <div>
                        { this.showCategories() }
                    </div>
                    <div>
                        { this.handleShow() }
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