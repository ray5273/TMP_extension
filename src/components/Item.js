import React, { Component } from 'react';
import Clip from '../assets/clip.png';
import Max from '../assets/max.png';
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
            <div className="memo-item">
                <div className="memo-top-wrapper">
                    <div className="iframe-memo-title">&lt;{name}&gt;</div>
                    <div className="iframe-memo-buttons-container">
                        {content.length > 100 ?
                            <img className="max-icon" alt="" src={Max} onClick={() => this.setState({ overClicked: !this.state.overClicked })} />
                            :
                            null
                        }

                        <button onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fid, url)
                        }} className="iframe-buttons">
                            X</button>
                    </div>
                </div>
                <br />


                <div className={`iframe-memo-content ${this.state.overClicked ? "over" : ""}`}>{content}</div>
                <br />
                <div className="url-container">
                    <img className="clip-image" src={Clip} alt="" />
                    <div className="iframe-memo-url"> <span className="iframe-memo-link"><a href={url}> {url} </a></span></div>
                </div>
            </div>
        );
    }

}
export default Item;