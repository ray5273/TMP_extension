import React, { Component } from 'react';
import Draggable from 'react-draggable-component';
import Input from './MemoInput';
import MemoIcon from 'assets/Memo-icon.png';

class DragText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
            open:false,
            submit:false
        }
    }
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
                dragStartCallback={this.handleStart}
                dragCallback={this.handleDrag}
                dragStopCallback={this.handleStop}>
                <div className="input-wrapper">
                    <Input stateFromParent={text_submit} callbackFromParent={this.myCallback}/>
                </div>
            </Draggable>
        );
    }
}

export default DragText;