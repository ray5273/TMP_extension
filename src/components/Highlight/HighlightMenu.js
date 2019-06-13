import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ModifyPalette from './ModifyPalette';
import Trash from '../../assets/hl_trash.png';
import Icon from '../../assets/hl_add.png';
import Firebase from '../../Firebase.js'

class HighlightMenu extends Component {
    addTool = (e) => {
        console.log("inside Modify addTooltip Func");
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
        ReactDOM.render(<ModifyPalette ret={this.props.ret}/>, toolTipDiv);

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

    removeHighlight = () => {
        //지우는코드 두줄. text를 따로 뽑은 뒤 element를 text로 대체하기
        var uid = this.props.uid;
        var url = encodeURIComponent(this.props.url);
        var db = Firebase.firestore();

        var node = this.props.node;

        db.collection("User").doc(uid).collection("Url").doc(url).collection("Highlights").doc(node.id.substr("highlight_".length)).delete();

        var toReplace = node.textContent;
        node.replaceWith(toReplace);
    };


    render() {
        return (
            <div className="highlight-menu">
                <img alt="" src={Trash} className="Highlight-icon" onClick={this.removeHighlight}/>
            </div>
        );
    }
}

export default HighlightMenu;