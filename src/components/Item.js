import React, { Component } from 'react';
import Clip from '../assets/clip.png';
import Max from '../assets/max.png';
import XIcon from '../assets/xicon.png';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overClicked: false
        }
    }
    render() {
        const { url, name, content, fid, handleRemove } = this.props;
        return (
            <div className={`memo-item-wrapper ${this.state.overClicked ? "over" : ""}`}>
                <div className="memo-top-wrapper">
                    <div className={`iframe-memo-title ${this.state.overClicked ? "over" : ""}`}>{name}</div>
                    <div className="iframe-memo-buttons-container">
                        {content.length > 100 ?
                            <img className="max-icon" alt="" src={Max} onClick={() => this.setState({ overClicked: !this.state.overClicked })} />
                            :
                            null
                        }

                        <img src={XIcon} alt="" onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fid, url)
                        }} className="iframe-memo-xbutton"
                            />
                    </div>
                </div>
                
                <div className={`iframe-memo-content ${this.state.overClicked ? "over" : ""}`}>{content}</div>
               
                <div className="url-container">
                    <img className="clip-image" src={Clip} alt="" />
                    <div className="iframe-memo-url"> <span className={`iframe-memo-link ${this.state.overClicked ? "over" : ""}`}><div className="link-text" onClick={()=>window.open(url)}> {url} </div></span></div>
                </div>
            </div>
        );
    }

}
export default Item;