import React, { Component } from 'react';
import Draggable from 'react-draggable-component';
import Input from './MemoInput';
import MemoIcon from 'assets/Memo-icon.png';
import firebase from '../../Firebase'

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

        var changed_posX = window.scrollX + e.clientX;
        var changed_posY = window.scrollY + e.clientY;

        var db = firebase.firestore();
        var url = encodeURIComponent(this.props.url);

        db.collection("User").doc(this.props.uid).collection("Url").doc(url).collection("Memos").doc(this.props.id).set({
            posX: changed_posX,
            posY: changed_posY
        })
        .then(function() {
            console.log("Memo position data changed");
        })
        .catch(function(error) {
            console.error("Error while changing memo position data", error);
        });
    };

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
                    <Input id={this.props.id} text={this.props.text} uid = {this.props.uid} url = {this.props.url}
                     posX={this.props.posX} posY={this.props.posY} />
                </div>
            </Draggable>
        );
    }
}

export default DragText;