import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import styled from "styled-components";
import {instanceOf} from "prop-types";
import BookmarkItem1 from "./BookmarkItem1";

const ChangeTitle = styled.input`
    border: none;
    border-bottom: 20px;
`;

const menu = styled.div`
    display:none;
    position:fixed;
    width:150px; 
    height:200px; 
    background: #fff;
    box-shadow:1px 1px 5px 0 rgba(0, 0, 0, 0.54);
`;


class Bookmark_Category extends  Component {
    constructor(props) {
        super(props)
        console.log(props)
        // 차 후 DB 에서 목록을 가져오는 것을 추가해야한다.
        this.state = {
            isChangingName: false,
            categoryName : props.categoryName,
            bookmarkList: props.bookmarkList,
            open: false,

        };
    }

    componentDidMount(): void {

    };

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    handleRightClick = (event) => {
        event.preventDefault();


        /*
        this.setState({
            [e.target.name]: e.target.value,
            }
        );
         */
    };
    handleContextMenu = (e) => {
        console.log(this.state.isChangingName);
        e.preventDefault();
        this.setState({
            isChangingName: !this.state.isChangingName,
        })

        return false;
    };

    render() {
        return (
            <div>
                <ListItem button onClick={this.handleClick} id='list' onContextMenu={this.handleContextMenu}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    {this.state.title !== "" || !this.state.isChangingName ?
                        <ListItemText inset primary={this.state.categoryName} />
                        : <ChangeTitle type='text' id='changeTitle' name='title11111' value="" placeholder='카테고리명을 입력하세요.'/>}

                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout = "auto" unmountOnExit>
                    <List component="div" disablePadding >
                        {this.props.bookmarkList.map( (item) => (
                            <ListItem button onClick={() => {window.location.href = item.bookmark.url }}>
                                <ListItemIcon>
                                    <StarBorder/>
                                </ListItemIcon>
                                <BookmarkItem1
                                    url={item.bookmark.url}
                                    title={item.bookmark.title}
                                    summary={item.bookmark.summary}
                                    tag={item.bookmark.tag}
                                    />
                            </ListItem>
                        ))}
                    </List>
                </Collapse>
            </div>
        )
    }
}

export default Bookmark_Category;