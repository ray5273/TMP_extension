import React, { Component } from 'react';
class Item extends Component {
    render() {
        const { id, name, content, handleRemove} = this.props;
        return (
            <div className="memo-item">
                <div className="memo-top-wrapper">
                    <div className="iframe-memo-number"> URL: {id} <br/>title:{name}</div>
                    <button onClick={(e)=> {
                            e.stopPropagation();
                            handleRemove(id)
                        }} className="iframe-buttons">
                        X</button>
                </div>

                
                <div className="iframe-memo-content">{content}</div>
                
            </div>
        );
    }

}
export default Item;