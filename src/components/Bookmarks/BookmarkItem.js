import React, { Component } from 'react';
import Button from '@material-ui/core/Button/index';


class BookmarkItem extends Component {
    render() {
        const labelStyle = {
            backgroundColor: '#EEE',
            borderRadius: '5px'
        };

        const {id, title, url, summary, tag, handleRemove} = this.props;
        return (
            <div>
                <form className="bookmark-item">
                    <p>
                        <label  style={labelStyle}>id</label> <br/>
                        {id}
                    </p>
                    <p>
                        <label  style = {labelStyle}> Title </label><br/>
                        {title}
                    </p>
                    <p>
                        <label  style = {labelStyle}>Url</label> <br/>
                        {url}
                    </p>
                    <p>
                        <label style = {labelStyle}>Summary</label> <br/>
                        {summary}
                    </p>
                    <p>
                        <label style = {labelStyle}>Tags</label> <br/>
                        {tag}
                    </p>
                    <p>
                        <Button onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove(id);}}>
                            삭제하기
                        </Button>
                    </p>
                </form>
            </div>
        );
    }
}

export default BookmarkItem;