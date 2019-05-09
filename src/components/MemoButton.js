/*
지금은 클릭만해도 input이 생김 mouseup을 잘 다루거나 대안을 찾아야할듯
input에 뭐 치려면 마우스 꾹 누른상태로 해야함 이건 querySelectorAll을 잘 봐야할듯
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class MemoButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: 0,
            t: 0
        }
        this.addHighlight=this.addHighlight.bind(this);
    }


    // 드래그 출처: https://codepen.io/nickmoreton/pen/ogryWa
    /* 
    dragTest = () => {
        const elements = document.querySelectorAll('h3');
        this.setState({
            zet: 1
        })
        // Bind functions to events
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener('mousedown', this.drag);
            elements[i].addEventListener('mouseup', this.end);
        };
        // Destroy drag on mouse up
    }
    // Drag function
    drag = (event) => {
        console.log("drag 함수 시작");
        // Set variable to true on mousedown
        this.setState({
            moving: true
        })
        // Increase z-index so last clicked always on top
        this.setState({
            zet: this.state.zet + 1
        })
        // Select the item that was clicked

        // Positions cursor in center of element when being dragged, as oposed to the top left
        const widt = event.target.offsetWidth / 2;
        const heigh = event.target.offsetHeight / 2;
        // Element follows mouse cursor
        document.addEventListener('mousemove', function (e) {
            // Only run if variable is true (this is destroyed on mouseup)
            if (this.state.moving === true) {
                // Postion element, minus half width/height as above
                var x = e.clientX - widt;
                var y = e.clientY - heigh;

                // Store left, top, and z-index in variable
                var position = 'left:' + x + 'px;top:' + y + 'px;z-index:' + this.state.zet + ';cursor:move;';
                // Set style
                event.target.setAttribute('style', position);
            };
        });
    };

    end = () => {
        this.setState({
            moving: false
        })
        console.log("end");
    };
*/
    //툴팁 클릭 테스트 함수
    highlight_func = ()=> {
        window.alert("alert!");
    }

    //툴팁 띄우기 추가
    //텍스트 드래그시 마우스 좌표에 툴팁 띄우기
    addTooltip = ()=> {
        if(document.getElementById('toolTipDiv')==null) {
            var toolTipDiv = document.createElement('div');
            toolTipDiv.setAttribute('id', 'toolTipDiv');
            toolTipDiv.style.visibility = 'hidden';
            toolTipDiv.style.position = 'absolute';
            toolTipDiv.style.top = '0px';
            toolTipDiv.style.left = '0px';
            var highlight = document.createElement('a');
            highlight.text="Highlight_text";
            highlight.setAttribute('id','Highlight');

            //href attribute test 코드
            //highlight.setAttribute('href','https://google.com');


            //highlight_func으로 해당 text를 highlight 해야함
            //현재는 하이라이트와 메모구조를 정확히 이해 못해서 적용 시켜
            highlight.onclick = this.highlight_func;
            toolTipDiv.appendChild(highlight);

            // highlight.addEventListener('')

            document.body.appendChild(toolTipDiv);
        }

        // Lets listen to mouseup DOM events.
        document.addEventListener('mouseup', function (e) {
            var selection = window.getSelection().toString();
            var selection_pos =window.getSelection().getRangeAt(0).getBoundingClientRect();

            // console.log(selection_pos.top+": is top position");

            //선택된 text가 있을시 text 오른쪽 아래에 highlight <a> 태그를 표시
            if (selection.length > 0 ) {
                //var selected = document.createTextNode(selection);
                // toolTipDiv.style.top = e.clientY + "px";
                // toolTipDiv.style.visibility = "visible";
                // toolTipDiv.style.left = e.clientX + "px";
                toolTipDiv.style.top = selection_pos.top + 40 + "px";
                toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
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

    }

    //메모추가
    addMemo = (x) => {
        console.log("in addMemo")
        this.setState({
            t: this.state.t + 1
        })
        var memo_box = document.createElement('div');
        memo_box.setAttribute('id', `li${this.state.t}`);
        memo_box.setAttribute('class', 'memo-before-render');
        console.log(memo_box);

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
            "background-color: #FBD6C6; display: inline;"
        );
       
        newNode.appendChild(selRange.extractContents());
        selRange.insertNode(newNode);
        console.log("parent of newNode: ", newNode.parentElement);
        this.addMemo(newNode.parentElement);

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
                <div className="menus" onClick={this.addMemo}><p>메모 추가</p></div>
                <div className="menus"><p>하이라이트</p></div>
            </React.Fragment>
        );
    }

}


//메모 인풋
class Input extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
            submitted: false
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = () => {
        console.log("handleSubmit clicked");
        this.setState({
            submitted: true
        })
    }
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
                    />}
                    {this.state.submitted ? null : <button className="submit-btn" onClick={this.handleSubmit}>확인</button>}
            </React.Fragment>
        );
    }
}

export default MemoButton;