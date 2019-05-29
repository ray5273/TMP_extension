import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ModifyPalette from './ModifyPalette';
import Trash from '../../assets/trashcan.png';
import Icon from '../../assets/hlicon.png';

class HighlightMenu extends Component {
    addTool = (e)=> {
        console.log("inside Modify addTooltip Func");
        var toolTipDiv = document.createElement('div');
        toolTipDiv.setAttribute('id', 'toolTipDiv');

        toolTipDiv.style.position = 'absolute';
        toolTipDiv.style.top = window.scrollY+ e.clientY + "px";
        // toolTipDiv.style.visibility = "visible";
        toolTipDiv.style.left = window.scrollX+ e.clientX + "px";
        // toolTipDiv.style.top = selection_pos.top + 40 + "px";
        // toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
        toolTipDiv.style.visibility = "visible";
        toolTipDiv.style.display="block";
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


    render() {
        return (
            <div className="highlight-menu">
                <img alt="" src={Icon} className="Highlight-icon"/>
                <img alt="" src={Trash} className="Highlight-icon" onClick={this.props.rmfunc}/>
            </div>
        );
    }
}

export default HighlightMenu;