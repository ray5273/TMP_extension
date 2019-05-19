import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Palette from './Highlight/Palette';
import DomMemo from './Memo/DomMemo';

class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            MemoTop :0,
            MemoLeft :0,
            color:'black'
        }
    }

    //텍스트 드래그시 마우스 좌표에 툴팁 띄우기
    addTooltip = ()=> {
        if(document.getElementById('toolTipDiv')==null) {
            var toolTipDiv = document.createElement('div');
            toolTipDiv.setAttribute('id', 'toolTipDiv');
            toolTipDiv.style.visibility = 'hidden';
            toolTipDiv.style.position = 'absolute';
            toolTipDiv.style.top = '0px';
            toolTipDiv.style.left = '0px';
            document.body.appendChild(toolTipDiv);
            ReactDOM.render(<Palette />, toolTipDiv);
        }
      
        // Lets listen to mouseup DOM events.
        document.addEventListener('mouseup', function (e) {

            var selection = window.getSelection().toString();
            // var selection_pos =window.getSelection().getRangeAt(0).getBoundingClientRect();
            // console.log(selection_pos.top+": is top position");
            //선택된 text가 있을시 text 오른쪽 아래에 highlight <a> 태그를 표시
            if (selection.length > 0 ) {
                //var selected = document.createTextNode(selection);
                toolTipDiv.style.top = window.scrollY+ e.clientY + "px";
                // toolTipDiv.style.visibility = "visible";
                toolTipDiv.style.left = window.scrollX+ e.clientX + "px";
                // toolTipDiv.style.top = selection_pos.top + 40 + "px";
                // toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
                toolTipDiv.style.visibility = "visible";
                toolTipDiv.style.display="block";
            }
        }, false);


       // Close the bubble when we click on the screen.
        document.addEventListener('mousedown', function (e) {
            //hidden시 a태그를 클릭해도 a tag가 실행이 안되는 문제 settimeout을 통해서 해결!
            setTimeout(function(){
                toolTipDiv.style.display='none';
            },200);

        }, false);
    };
    //sticky memo 추가하는 method
    
    componentDidMount(){
        document.body.addEventListener('mouseup',this.addTooltip);
    }
    render() {
        return (
            <React.Fragment>
                <div className="menus"> <p>북마크</p></div>
                <div className="menus"> <p>PDF</p></div>
                <DomMemo />
                <div className="menus"><p>하이라이트</p></div>
            </React.Fragment>
        );
    }

}

export default MenuBar;