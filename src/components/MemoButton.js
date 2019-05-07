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
    componentDidMount() {
        //node list를 반환해서 하나씩 추가해주는거.. 지금안됨
        /*var arr = document.querySelectorAll("p,h1,h2,h3,h4,h5,h6,span,li,ui,em,div");
        Array.prototype.forEach.call(arr, function(x) {
            x.addEventListener('mouseup', this.addHighlight);
        });*/

        //바디 전체에 추가하기
        document.body.addEventListener('mouseup', this.addHighlight);
    
    
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