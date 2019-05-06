import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './MemoButton.css';

class MemoButton extends Component {
    constructor(props) {
        super(props);
        this.state={
            clicked:0,
            t:0
        }
    }

    testf=(temp)=>{
        ReactDOM.render(<Input />, document.getElementById(`this-${temp}`))
    }

    /*
    addMemo=()=>{
        this.setState({
            clicked:this.state.clicked+1
        })
        const temp=this.state.clicked;
        return <div>
            <div id={`this-${this.state.clicked}`} onClick={this.testf(temp)} >메모 #{this.state.clicked}</div>
         </div>
    }
    */

dragTest=()=>{
   const elements = document.querySelectorAll('h3');
   this.setState({
       zet:1
   })
   
   // Bind functions to events
   for(var i = 0; i < elements.length; i++){
     elements[i].addEventListener('mousedown', this.drag);
     elements[i].addEventListener('mouseup', this.end);
   };
   
   // Destroy drag on mouse up
}

   // Drag function
   drag =(event)=> {
       console.log("drag 함수 시작");
    // Set variable to true on mousedown
    this.setState({
        moving: true
    })
    // Increase z-index so last clicked always on top
    this.setState({
        zet:this.state.zet+1
    })
    // Select the item that was clicked
    
    // Positions cursor in center of element when being dragged, as oposed to the top left
    const widt = event.target.offsetWidth / 2;
     const heigh = event.target.offsetHeight / 2;
    // Element follows mouse cursor
    document.addEventListener('mousemove',function(e) {
      // Only run if variable is true (this is destroyed on mouseup)
      if(this.state.moving === true){
        // Postion element, minus half width/height as above
        var x = e.clientX - widt;
        var y = e.clientY - heigh;
  
        // Store left, top, and z-index in variable
        var position = 'left:' + x + 'px;top:' + y + 'px;z-index:'+this.state.zet+';cursor:move;';
        // Set style
        event.target.setAttribute('style', position);
      };
    });
  };

 end =() =>{
    this.setState({
        moving : false
    })
    console.log("end");
  };

    addMemo=() => {
        console.log("in addMemo");
        this.setState({
            t:this.state.t+1
        })
        var q = document.createElement('div');
        q.setAttribute('id',`li${this.state.t}`);
        console.log(q);
        document.body.insertBefore(q, document.body.firstChild);
        ReactDOM.render(<Input />, document.getElementById(`li${this.state.t}`));
    }
    highlightRange=(range)=> {
        var newNode = document.createElement("div");
        newNode.setAttribute(
           "style",
           "background-color: yellow; display: inline;"
        );
        range.surroundContents(newNode);
    }





    addHl=()=>{
        var selObj = window.getSelection(); 
        alert(selObj);
        var selRange = selObj.getRangeAt(0);


        var newNode = document.createElement("div");
        newNode.setAttribute(
           "style",
           "background-color: yellow; display: inline;"
        );
        selRange.surroundContents(newNode);

        // do stuff with the range
        var selectedText = selObj.toString();
        console.log(selectedText);
    }

    componentDidMount() {
        //document.body.addEventListener('click', this.addHl);
    }
    render() {
       
        return (
            <div>         
                <div class="box"> 드래그 테스트!</div>
                왜안될까.....
                <div onClick={this.addMemo}>메모 추가하기</div>
                <div onClick={this.addHl}>하이라이트</div>
            </div>
        );
    }
    
}


class Input extends Component {
    constructor(props) {
        super(props);
        this.state={
            test:"",
            submitted:false
        }
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=()=> {
        console.log("handleSubmit clicked");
        this.setState({
            submitted:true
        })
    }
    render() {
        return (
            <div>
                
            {this.state.submitted?null:<button className="btn" onClick={this.handleSubmit}>확인</button>}
            
            {this.state.submitted
            ?
            <div>
            {this.state.test}
            </div>
            :
            <input
            onChange={this.handleChange}
            name="test"
            />}
            </div>
        );
    }
}


export default MemoButton;