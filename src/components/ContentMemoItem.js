import React, {Component} from 'react';
import MemoMaxIcon from '../assets/content_memo_max.png';
import MemoDelIcon from '../assets/content_memo_delete.png';
import Clip from '../assets/clip.png';
class ContentMemoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            overClicked: false
        }
    }

    render() {
        const {url, name, content, fid, handleRemove} = this.props;
        return (
            <div className={`memo-item-wrapper ${this.state.overClicked ? "over" : ""}`}>
                <div className="memo-top-wrapper">
                    <img className="clip-image" src={Clip} alt="" />
                    <div className={`iframe-memo-title ${this.state.overClicked ? "over" : ""}`}
                         onClick={() => window.open(url)}>{name}</div>
                    <div className="iframe-memo-buttons-container">
                        {content.length > 100 ?
                            <img className="iframe-memo-max-button" alt="" src={MemoMaxIcon}
                                 onClick={() => this.setState({overClicked: !this.state.overClicked})}
                                 style={{margin: 5 + "px"}}/>
                            :
                            null
                        }

                        <img src={MemoDelIcon} alt="" onClick={(e) => {
                            e.stopPropagation();
                            handleRemove(fid, url)
                        }} className="iframe-memo-x-button" style={{margin: 5 + "px"}}
                        />
                    </div>
                </div>

                <div className={`iframe-memo-content ${this.state.overClicked ? "over" : ""}`}
                     //onClick={() => window.open(url)}
                     >{content}</div>

                {/*<div className="url-container">*/}
                {/*    <img className="clip-image" src={Clip} alt="" />*/}
                {/*    <div className="iframe-memo-url"> <span className={`iframe-memo-link ${this.state.overClicked ? "over" : ""}`}><div className="link-text"  </div></span></div>*/}
                {/*</div>*/}
            </div>
        );
    }

}

export default ContentMemoItem;