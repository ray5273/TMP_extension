import React, { Component } from 'react';
import DomMemo from './Memo/DomMemo';
import HighLight from './Highlight/Tooltip';

class MenuBar extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="menus"> <p>북마크</p></div>
                <div className="menus"> <p>PDF</p></div>
                <DomMemo />
                <HighLight />
            </React.Fragment>
        );
    }

}

export default MenuBar;