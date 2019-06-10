import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import EditIcon from '@material-ui/icons/Edit'
import styled from "styled-components";
import { BookmarkItem1 } from './BookmarkItem1';
import DeleteIcon from '@material-ui/icons/Delete';

const ChangeTitle = styled.input`
    border: none;
    border-bottom: 20px;
    width: 100%;
    font-size: 15px;
`;

class Bookmark_Category extends  Component {
    constructor(props) {
        super(props);
        // 차 후 DB 에서 목록을 가져오는 것을 추가해야한다.

        this.state = {
            categoryId: props.categoryId,
            isChangingName: false,
            categoryName : props.categoryName,
            changedCategoryName: props.categoryName,
            bookmarkList: props.bookmarkList,
            open: false,
            openRemoveCategory: false,
        };
    }

// 클릭마다, 북마크 리스트 open / close
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleEditCategoryName = (e) => {
        e.stopPropagation();

        this.setState({
            isChangingName: !this.state.isChangingName,
        });

        if(this.state.categoryName !== this.state.changedCategoryName) {
           this.props.handleChangeCategoryName(this.state);
        }
    };

    // 북마크 내용 편집 핸들링.
    handleEditBookmark = (bookmark) => {

        this.props.handleEditBookmark(this.state, bookmark);
    };

    // 북마크 삭제 핸들링.
    handleRemoveBookmark = (bookmark) => {
        this.props.handleRemoveBookmark(this.state.categoryId, bookmark.id);
    };

    componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
        // console.log("nextCategoryName : " + nextProps.categoryName);
        this.setState({
            categoryId: nextProps.categoryId,
            bookmarkList: nextProps.bookmarkList,
            categoryName: nextProps.categoryName,
            changedCategoryName: nextProps.categoryName
        });
    }

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleClick} id='list' >
                    <ListItemIcon>
                        <BookmarksIcon />
                    </ListItemIcon>
                        {!this.state.isChangingName ?
                            <ListItemText insert primary={this.state.changedCategoryName} />
                            : <ChangeTitle type='text' id='changedCategoryName' value={ this.state.changedCategoryName }
                                           onChange={(e)=>{this.setState({[e.target.id]: e.target.value})}}
                                           autoFocus placeholder='카테고리명을 입력하세요.'/>
                        }
                        {this.props.openRemoveCategory ?
                        <IconButton aria-label="Delete" onClick={(e) => { e.stopPropagation(); this.props.handleRemoveCategory(this.state.categoryId)
                        }}>
                            <DeleteIcon/>
                        </IconButton>
                        :
                        <IconButton aria-label="Edit" onClick={this.handleEditCategoryName}>
                            <EditIcon/>
                        </IconButton>
                        }

                        {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout = "auto" unmountOnExit>
                    <List component="div" disablePadding >
                        {this.props.bookmarkList.map( (bookmark) => (
                            <BookmarkItem1
                                bookmark = { bookmark }
                                handleRemoveBookmark={this.handleRemoveBookmark}
                                handleEditBookmark = {this.handleEditBookmark}/>
                        ))}
                    </List>
                </Collapse>
            </div>
        )
    }
}

export default Bookmark_Category;