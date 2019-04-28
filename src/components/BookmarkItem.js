import React, { Component } from 'react';

class BookmarkItem extends Component {
    render() {
        const { id, name, content, tag, handleRemove} = this.props;
        return (
            <div className="memo-item">
                ID: {id}, 제목: {name} <br />
                내용: {content}, 태그:{tag}
                <button onClick={(e)=> {
                    e.stopPropagation();
                    handleRemove(id)
                }}>
                삭제하기</button>
            </div>
        );
    }
}

export default BookmarkItem;