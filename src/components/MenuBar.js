import React, { Component } from 'react';
import DomMemo from './Memo/DomMemo';
import HighLight from './Highlight/Tooltip';
import DrawingTool from './Memo/DrawingTool'
class MenuBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="menus"> <p>북마크</p></div>
                <div className="menus"> <p>PDF</p></div>
                <DomMemo />
                <DrawingTool/>
                <HighLight />
            </React.Fragment>
        );
    }

}

export default MenuBar;