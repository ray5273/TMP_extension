import React, { Component } from 'react';
class Item extends Component {
    render() {
        const { id, name, content,fid, handleRemove} = this.props;
        return (
            <div className="memo-item">
                <div className="memo-top-wrapper">
                    <div className="iframe-memo-url"> URL:<a href={id}> {id} </a></div>
                    <button onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove(fid)
                        }} className="iframe-buttons">
                        X</button>
                </div>

                <div className="iframe-memo-title">title:{name}</div>
                
                <div className="iframe-memo-content">{content}</div>
                
            </div>
        );
    }

}
export default Item;