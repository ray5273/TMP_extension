/*
지금은 클릭만해도 input이 생김 mouseup을 잘 다루거나 대안을 찾아야할듯
input에 뭐 치려면 마우스 꾹 누른상태로 해야함 이건 querySelectorAll을 잘 봐야할듯
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Draggable from 'react-draggable-component';
import Palette from './Palette';

class MemoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 0,
            t: 0,
            MemoTop :0,
            MemoLeft :0,
            color:''
        }
        this.latestDragged=null;
        this.addHighlight=this.addHighlight.bind(this);
    }


    //툴팁 클릭 테스트 함수
    highlight_func = ()=> {
        window.alert("in highlight func");
        this.addHighlight();
        //highlightNode는 하이라이트할 항목을 감쌀 새로운 엘리먼트
        var highlightNode = document.createElement("span");
        highlightNode.setAttribute(
            "style",
            "background-color: #FBD6C6; display: inline;"
        );
        
        highlightNode.appendChild(this.latestDragged.extractContents());
        this.latestDragged.insertNode(highlightNode);
    }

    //툴팁 띄우기 추가
    //텍스트 드래그시 마우스 좌표에 툴팁 띄우기
    //Palette에 전달할 현재color스테이트 바꿀 함수
    changeColor = (e) => {
        this.setState({
            color: e.target.id
        });
        console.log("now color: ", this.state.color);
        this.addHighlight();
    }
    addTooltip = ()=> {
        
        if(document.getElementById('toolTipDiv')==null) {
            var toolTipDiv = document.createElement('div');
            toolTipDiv.setAttribute('id', 'toolTipDiv');
            toolTipDiv.style.visibility = 'hidden';
            toolTipDiv.style.position = 'absolute';
            toolTipDiv.style.top = '0px';
            toolTipDiv.style.left = '0px';
            //var highlight = document.createElement('a');
            //highlight.text="Highlight_text";
            //highlight.setAttribute('id','Highlight');

            //href attribute test 코드
            //highlight.setAttribute('href','https://google.com');


            //highlight_func으로 해당 text를 highlight 해야함
            //현재는 하이라이트와 메모구조를 정확히 이해 못해서 적용 시켜
            toolTipDiv.onclick = this.highlight_func;
            //toolTipDiv.appendChild(highlight);
        
            // highlight.addEventListener('')

            document.body.appendChild(toolTipDiv); 
            ReactDOM.render(<Palette change={this.changeColor}/>, toolTipDiv);
        }
      
        // Lets listen to mouseup DOM events.
        document.addEventListener('mouseup', function (e) {
            
            this.latestDragged = window.getSelection().getRangeAt(0);

            
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
            //hidden시 a태그를 클릭해도 a tag가 실행이 안되는 문제
            //settimeout을 통해서 해결!
            setTimeout(function(){
                toolTipDiv.style.display='none';
            },200);

        }, false);
    };
    //sticky memo 추가하는 method
    addStickyMemo = (x) => {
        window.alert("sticky memo!");
        this.setState({
            t: this.state.t + 1,
            MemoTop:this.state.MemoTop ,
            MemoLeft :this.state.MemoLeft +50

        });
        if(document.getElementById(`stickyMemo${this.state.t}`)==null) {
            var stickyMemo = document.createElement('div');
            stickyMemo.setAttribute('id', `stickyMemo${this.state.t}`);
            stickyMemo.style.position = 'absolute';
            stickyMemo.style.width="300px";
            //sticky memo 생성위치 조정
            stickyMemo.style.top = `${this.state.MemoTop}px`;
            stickyMemo.style.left = `${this.state.MemoLeft}px`;
            //stickymemo를 z-index 통해 최상위로 올려줌
            stickyMemo.style.zIndex=2147483647;
            stickyMemo.setAttribute('class', 'memo-before-render');

            // var testbtn = document.createElement('input');
            // testbtn.text = 'button';
            // stickyMemo.appendChild(testbtn);
            //console.log(stickyMemo);
           // console.log("stickymemo top pos : "+stickyMemo.style.top.toString());
            //console.log("stickymemo left pos : "+stickyMemo.style.left.toString());
            document.body.appendChild(stickyMemo);
            // ReactDOM.render(<Input />, document.getElementById(`stickyMemo${this.state.t}`));
            ReactDOM.render(<DragText />, document.getElementById(`stickyMemo${this.state.t}`));

        }
    };
    //메모추가
    addMemo = (x) => {
        //console.log("in addMemo");
        this.setState({
            t: this.state.t + 1
        })
        var memo_box = document.createElement('div');
        memo_box.setAttribute('id', `li${this.state.t}`);
        memo_box.setAttribute('class', 'memo-before-render');
        //console.log(memo_box);

        //새로만든 memo_box 를 드래그한애 전에 추가
        x.parentElement.insertBefore(memo_box, x);
        ReactDOM.render(<Input />, document.getElementById(`li${this.state.t}`))
        /* 
        //네모박스 뜨고 클릭하면 거기에 인풋 render
        memo_box.addEventListener('click', ReactDOM.render(<Input />, document.getElementById(`li${this.state.t}`)));
        */  
    }

    //하이라이트 추가
    addHighlight = () => {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        this.setState({
            latestDragged: selObj
        })
        
        console.log("selobj:",selObj);
        console.log("selRange:", selRange);
        console.log("parent of selRange:", selRange.parentElement);
        var newNode = document.createElement("span");
        newNode.setAttribute(
            "style",
            `background-color: ${this.state.color}; display: inline;`
        );
       
        newNode.appendChild(selRange.extractContents());
        selRange.insertNode(newNode);
        //console.log("parent of newNode: ", newNode.parentElement);
        //this.addMemo(newNode.parentElement);

        //var selectedText = selObj.toString();
        //console.log(selectedText);
    }

    //이 컴포넌트가 처음 render될 때 아래의 셀렉터들에게 추가한거
    componentDidMount(){
        //node list를 반환해서 하나씩 추가해주는거.. 지금안됨
        /*var arr = document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,span,li,ui,em,div");
        Array.prototype.forEach.call(arr, function(x) {
            x.addEventListener('mouseup', this.addHighlight);
        });*/

        //바디 전체에 추가하기
        // document.body.addEventListener('mouseup', this.addHighlight);
        document.body.addEventListener('mouseup',this.addTooltip);
    
    }
    render() {
        return (
            <React.Fragment>
                <div className="menus"> <p>북마크</p></div>
                <div className="menus"> <p>PDF</p></div>
                <div className="menus" onClick={this.addStickyMemo}><p>메모 추가</p></div>
                <div className="menus"><p>하이라이트</p></div>
            </React.Fragment>
        );
    }

}

//이 부분을 따로 javascript 파일로 바꾸는게 좋을듯
//draggable test
class DragText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
            open:false,
            submit:false
        }
    }
    eventLogger = (e: MouseEvent, data: Object) => {
        console.log('Event: ', e);
        console.log('Data: ', data);
    };

    myCallback = (dataFromChild) => {
        var childList = dataFromChild;
        var text_data = childList[0];
        var submit_data = childList[1];
        console.log("get submit data : "+submit_data);
        this.setState({
             test:text_data,
             submit:submit_data
        });
        // this.setState({ test: dataFromChild });
    };

    render() {
        var text_submit = [];
        text_submit[0] = this.state.test;
        text_submit[1] = this.state.submit;
        console.log("listname:"+text_submit);
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="input-wrapper">
                    <div className="handle">Drag from here</div>
                    <div className="to-move" onClick={()=>this.setState({open:!this.state.open})}>
                        Toggle from here
                    </div>
                    <div>
                        {this.state.open?<Input stateFromParent={text_submit} callbackFromParent={this.myCallback}/>:<div className="memo-closed">closed</div>}
                    </div>
                </div>
            </Draggable>
        );
    }
}


//메모 인풋
class Input extends Component {
    constructor(props) {
        super(props);
        var parentData = this.props.stateFromParent;
        if(parentData==null){
            this.state = {
                test:"",
                submitted:false
            }
        }else {
            this.state = {
                test: parentData[0],
                submitted: parentData[1]
            }
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    handleSubmit = () => {
        console.log("handleSubmit clicked");
        this.setState({
            submitted: true
        });
        var toParent =[];
        toParent[0] = this.state.test;
        toParent[1] = true;
        this.props.callbackFromParent(toParent);
    };
    handleRevise = ()=>{
        console.log("handleRevise Mode");
        this.setState({
            submitted :false,
        })
        var toParent =[];
        toParent[0] = this.state.test;
        toParent[1] = false;
        this.props.callbackFromParent(toParent);
    };
    render() {
        return (
            <React.Fragment className="memo-input-wrapper">
                {this.state.submitted
                    ?
                    <div className="memo-text">
                        {this.state.test}
                    </div>
                    :
                    <textarea
                        onChange={this.handleChange}
                        name="test"
                        className="memo-input"
                    >
                        {this.state.test}
                    </textarea>}
                    {this.state.submitted ? <button className="submit-btn" onClick={this.handleRevise}>수정</button>
                        : <button className="submit-btn" onClick={this.handleSubmit}>확인</button>}
            </React.Fragment>
        );
    }
}

export default MemoButton;