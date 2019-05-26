import React, { Component } from 'react';
class Item extends Component {
    render() {
        const { id, name, content, tag, handleRemove} = this.props;
        return (
            <div className="memo-item">
                <div className="memo-top-wrapper">
                    <div className="iframe-memo-number"> #{id} {name}</div>
                    <button onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove(id)
                        }} className="iframe-buttons">
                        삭제</button>
                </div>
                <div className="iframe-memo-content">{content}</div>
                <div className="tag-and-button-wrapper">
                    <div className="iframe-memo-tag">{tag}</div>
                    
                </div>
            </div>
        );
    }

}
export default Item;