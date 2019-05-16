import React, { Component } from 'react';
import Button from '@material-ui/core/Button/index';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';


class BookmarkItem extends  Component {
    constructor(props) {
        super(props);

    }
    handleClick = () => {
        window.location.href = this.props.url;
    }

    render() {
        const labelStyle = {
            backgroundColor: '#EEE',
            borderRadius: '5px'
        };

        const {id, title, url, summary, tag, handleRemove} = this.props;

        return (
                <fieldset className="bookmark-item" onClick={this.handleClick}>
                    <legend>북마크 정보 {id} : {title} </legend>
                        <label  style = {labelStyle}>Url : </label>
                        {url} <br/>
                        <label style = { labelStyle }>Summary : </label>
                        {summary}n<br/>
                        <label style = {labelStyle}>Tags : </label>
                        {tag} <br/>
                        <Button onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove(id);}}>
                            삭제하기
                        </Button>
                </fieldset>
        );
    }
}

export default BookmarkItem;