import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from '../../assets/hl_add.png';
import ReactDOM from 'react-dom';
import HighlightMenu from './HighlightMenu';
import Firebase from '../../Firebase'
import * as rangy from 'rangy'
import "rangy/lib/rangy-serializer";

const Button = styled.button`
    background-color: ${props => props.color};
`;

class Palette extends Component {
    static defaultProps = {
        isNew: false
    };

    constructor(props) {
        super(props);
        this.state = {
            hlNum: 0,
            nowNode: '',
            modifying: false,
            toModify: ''
        };
        rangy.init();
    }

    /* 수정할색깔이 바뀌면 현재 state node의 색을 바꾸려 시도중
    componentWillUpdate(nextState) {
        if (nextState.toModify != this.state.toModify) {
          this.state.nowNode.setAttribute(
            "style",
            `background-color: ${nextState.toModify}; display: inline;`
        );
        }
      }
    */

    //가장 최근에 select한 range를 state에 넣어두고 지울 수 있게(db없이 임시)

    retModifiedColor = (color) => {
        this.setState({
            toModify: color
        })
    };

    addTool = (e, newNode) => {
        var uid = this.props.uid;
        var url = encodeURIComponent(this.props.url);
        var hid = this.props.isNew ? this.props.hid : this.state.hid;

        console.log("inside addTooltip Func");
        var toolTipDiv = document.createElement('div');
        toolTipDiv.setAttribute('id', 'toolTipDiv');

        toolTipDiv.style.position = 'absolute';
        toolTipDiv.style.top = window.scrollY + e.clientY + "px";
        // toolTipDiv.style.visibility = "visible";
        toolTipDiv.style.left = window.scrollX + e.clientX + "px";
        // toolTipDiv.style.top = selection_pos.top + 40 + "px";
        // toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
        toolTipDiv.style.visibility = "visible";
        toolTipDiv.style.display = "block";
        document.body.appendChild(toolTipDiv);
        ReactDOM.render(<HighlightMenu uid={uid} url={decodeURIComponent(url)} node={e.target}/>, toolTipDiv); //ret={this.retModifiedColor}
        setTimeout(function () {
            toolTipDiv.parentElement.removeChild(toolTipDiv);
        }, 3000);

        /*
               // Close the bubble when we click on the screen.
                document.addEventListener('mousedown', function (e) {
                    //hidden시 a태그를 클릭해도 a tag가 실행이 안되는 문제 settimeout을 통해서 해결!
                    setTimeout(function(){
                        toolTipDiv.style.display='none';
                    },200);

                }, false);
        */
    };

    createXPathFromElement = (elm) => {
        var allNodes = document.getElementsByTagName('*');
        for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode) {
            if (elm.hasAttribute('id')) {
                var uniqueIdCount = 0;
                for (var n = 0; n < allNodes.length; n++) {
                    if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                    if (uniqueIdCount > 1) break;
                }
                if (uniqueIdCount == 1) {
                    segs.unshift('id("' + elm.getAttribute('id') + '")');
                    return segs.join('/');
                } else {
                    segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                }
            } else if (elm.hasAttribute('class')) {
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
            } else {
                var i, sib;
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == elm.localName) i++;
                }
                segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
            }
        }
        return segs.length ? '/' + segs.join('/') : null;
    };


    addHighlight = (e, color) => {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        var newNode = document.createElement("span");

        console.log("in addhighlight!");

        var uid = this.props.uid;
        var url = encodeURIComponent(this.props.url);
        var db = Firebase.firestore();

        var comp = this;

        if (selRange) {
            var serialized = rangy.serializeRange(selRange, true, selRange.commonAncestorContainer.parentElement);
            var hid = "";

            db.collection("User").doc(uid).collection("Url").doc(url).collection("Highlights").add({
                serialized: serialized,
                ancestorXPath: this.createXPathFromElement(selRange.commonAncestorContainer.parentElement),
                text: selRange.toString(),
                color: color
            })
                .then(function (docRef) {
                    console.log("Generated highlight id: ", docRef.id);
                    hid = docRef.id;

                    newNode.setAttribute(
                        "style",
                        `background-color: ${color}; display: inline;`
                    );
                    newNode.setAttribute('id', `highlight_${hid}`);
                    newNode.addEventListener('click', (e) => {
                        comp.addTool(e, newNode);
                    });
                    //newNode.appendChild(selRange.extractContents());
                    //selRange.insertNode(newNode);
                    selRange.surroundContents(newNode);

                    comp.setState({hid: hid});
                })
                .catch(function (error) {
                    console.error("Error inserting highlight data: ", error);
                });

        } else {
            console.log("No selected Range");
        }

        this.setState({
            hid: hid,
            nowNode: newNode
        });
    };


    render() {
        const colors = ["#FBD6C6", "#FF9090", "#FFDF24", "#FFFF7E", "#7ED2FF", "#BCFFB5", "#C5C0FF", "#FFD9FA",
            "#B8B8B8"];
        return (
            <div className="palette-container">
                <img alt="" src={Icon} className="Highlight-icon"/>
                {colors.map(
                    color =>
                        <Button className="palette-item" onClick={(e) => this.addHighlight(e, color)}
                                color={color}></Button>
                )}

            </div>
        );
    }
}


export default Palette;













