import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Palette from './Palette';
import Paint from './Paint'
class Tooltip extends Component {

    constructor(props) {
        super(props);
        this.state = {
            MemoTop :0,
            MemoLeft :0,
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

        //이미지 hover시 이미지 옆에 툴팁 띄우기
        onMouseOver=(index)=>{
            var e = window.event;
            var toolTipDiv = document.getElementById(`toolTipDivForImage${index}`)
            if(toolTipDiv.style.display=="none") {
                toolTipDiv.style.top = window.scrollY + e.clientY + 'px';
                toolTipDiv.style.left = window.scrollX + e.clientX + 'px';
                toolTipDiv.style.display = "block";
            }

        }
        //이미지 밖으로 나가면 툴팁 없애기
        onMouseOut=(index)=>{
            setTimeout(function(){
                var toolTipDiv = document.getElementById(`toolTipDivForImage${index}`)
                toolTipDiv.style.display="none";

            },2000);

        }
        componentDidMount(){
           document.body.addEventListener('mouseup',this.addTooltip);
            var image = document.getElementsByTagName('img');
             for(var i = 0 ; i< image.length;i++){
                 var toolTipDiv = document.createElement('div');
                 image[i].addEventListener('mouseover',this.onMouseOver.bind(this,i));
                 image[i].addEventListener('mouseout',this.onMouseOut.bind(this,i));
                 toolTipDiv.setAttribute('id', `toolTipDivForImage${i}`);
                 toolTipDiv.style.visibility = 'visible';
                 toolTipDiv.style.position = 'absolute';
                 toolTipDiv.style.display="none";
                 toolTipDiv.style.zIndex = 10000;
                 //TODO: 위치를 잘 조정해 보자
                 toolTipDiv.style.top = '0px';
                 toolTipDiv.style.left = '0px';
                 document.body.appendChild(toolTipDiv);

                 //여기서 component에 i 값을 넘겨주고 paint.js에서 i값을 받아서 onclick에 사용하자.
                 ReactDOM.render(<Paint imageIndexFromParent={i}/>, toolTipDiv);
             }
        }
    render() {
        return (
            <div className="menus-highlight">
                {/*<p>하이라이트</p>*/}
            </div>
        );
    }
}

export default Tooltip;


