import React, { Component } from 'react';
import ListItemText from '@material-ui/core/ListItemText';



// 임시 북마크 아이템... 수정 중....
class BookmarkItem1 extends  Component {
    constructor(props) {
        super(props);

    }
    handleClick = () => {
        window.location.href = this.props.url;
        console.log("item click. show bookmark" + this.props.url);
    }
    render() {

        const {title, url, summary, tag} = this.props;

        return (
            <ListItemText insert primary={'title : ' + title} secondary={'summary : ' + summary} />
        );
    }
}

export default BookmarkItem1;