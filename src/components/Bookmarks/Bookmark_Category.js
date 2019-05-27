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
import EditIcon from '@material-ui/icons/Edit'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {Bookmark, Category} from './BookmarkStructures';
import styled from "styled-components";
import { BookmarkItem1 } from './BookmarkItem1';
import {EditForm} from './EditForm';

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
            isChangingName: false,
            categoryName : props.categoryName,
            changedCategoryName: props.categoryName,
            bookmarkList: props.bookmarkList,
            open: false,

        };
    }

    // 클릭마다, 북마크 리스트 open / close
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    // 카테고리명 변경 해들링. (아직 미완성.)
    handleEditCategoryName = (e) => {
        e.stopPropagation();

        this.setState({
            isChangingName: !this.state.isChangingName,
        })

        //
        if(!this.state.isChangingName) {
           this.props.handleChange(this.state);
        }

    };

    // 북마크 내용 편집 핸들링.
    handleEditBookmark = (bookmark) => {

        this.setState({
            // eslint-disable-next-line array-callback-return
                 bookmarkList: this.state.bookmarkList.map( (item)=>{
                     if(bookmark.url !== item.url) {
                         return item;
                     }
                     else {
                         item.title = bookmark.title;
                         item.summary = bookmark.summary;
                         item.tag = bookmark.tag;
                         return item;
                     }
                 })
        });
        this.props.handleChange(this.state);
    };

    // 북마크 삭제 핸들링.
    handleRemoveBookmark = (url) => {
        this.setState({
            bookmarkList: this.state.bookmarkList.filter( bookmark => bookmark.url !== url)
        });
        this.props.handleRemove(new Category(0, this.state.categoryName, this.state.bookmarkList));
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleClick} id='list' >
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                        {!this.state.isChangingName ?
                            <ListItemText insert primary={this.state.changedCategoryName} />
                            : <ChangeTitle type='text' id='changedCategoryName' value={ this.state.changedCategoryName } onChange={(e)=>{this.setState({[e.target.id]: e.target.value})}} autoFocus placeholder='카테고리명을 입력하세요.'/>}
                    <IconButton aria-label="Edit" onClick={this.handleEditCategoryName}>
                        <EditIcon/>
                    </IconButton>

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