import React, { Component } from 'react';
import Draggable from 'react-draggable-component';
import Input from './MemoInput';
import MemoIcon from 'assets/Memo-icon.png';

class DragText extends Component {
    static defaultProps = {
        posX:0,
        posY:0,
        text:''
    }
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            submit:false
        }
    }
    handleStop = ()=>{
        var e = window.event;
        console.log("x val :"+(window.scrollX+e.clientX));
       console.log("y val :"+(window.scrollY+e.clientY));
        var changed_posX = window.scrollX+e.clientX;
        var changed_posY = window.scrollY+e.clientY;


   }
    render() {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={{x: this.props.posX, y: this.props.posY}}
                grid={[25, 25]}
                scale={1}
                dragStartCallback={this.handleStart}
                dragCallback={this.handleDrag}
                dragStopCallback={this.handleStop}>
                <div className="input-wrapper">
                    {console.log("in Draggable: ", this.props.text, this.props.posX,this.props.posY)}
                    <Input isInserted={this.props.isInserted} id={this.props.id} index={this.props.index} text={this.props.text} uid = {this.props.uid} url = {this.props.url}
                    data={this.props.data} posX={this.props.posX} posY={this.props.posY} />
                </div>
            </Draggable>
        );
    }
}

export default DragText;