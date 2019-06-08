import React, {Component} from 'react';
import Draggable from 'react-draggable-component';
import Firebase from '../../Firebase'
import 'firebase/firestore'
import 'firebase/storage'

import minimize_icon from '../../assets/stickyNote/minimize.png';
import close_icon from '../../assets/stickyNote/close.png';
import move_icon from '../../assets/stickyNote/move.png';

import ReactDOM from "react-dom";

class DragImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            test: "",
            open:false,
            submit:false,
            x : 0,
            y : 0
        }
    }
    componentDidUpdate=()=>{
    };
    handleStart = () =>{
        var str = "x pos: "+ this.props.push_x + " y pos: "+this.props.push_y;
        console.log(str);
    };
    handleStop = ()=>{
         console.log("handle stop!");
         var e = window.event;
         console.log("this.props.uid:"+this.props.uid);
         console.log("htis.props.url:"+this.props.url);

         console.log("x val :"+(window.scrollX+e.clientX));
        console.log("y val :"+(window.scrollY+e.clientY));
         var changed_posX = window.scrollX+e.clientX;
         var changed_posY = window.scrollY+e.clientY;
         const database = Firebase.firestore();
          database.collection("User").doc(this.props.uid).collection(this.props.url).doc(`ImageMetadata${this.props.idx}`).set({
              x:changed_posX,
              y:changed_posY
         });

    }
    deleteImage = () =>{
        console.log("delete Image");
        console.log("");
        const storage = Firebase.storage();
        const storage_ref = storage.ref();
        const imageMemo = document.getElementById(`imageMemo${this.props.idx}`);
        imageMemo.style.display = 'none';
        const imagePath = this.props.uid +'/'+this.props.url+'/'+'image'+this.props.idx+'.png';
        const dataRef = storage_ref.child(imagePath);
        dataRef.delete().then(function (snapshot) {
            console.log("deleted file!");
        });

    }
    render() {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x:0, y:0}}
                position={{x:this.props.push_x,y:this.props.push_y}}
                grid={[25, 25]}
                scale={1}
                dragStartCallback={this.handleStart}
                dragCallback={this.handleDrag}
                dragStopCallback={this.handleStop}>
                <div className="image-wrapper">
                    <div className="image-wrapper-inside">
                        <a className="image-move">
                            <img src={move_icon} alt=""/>
                        </a>
                        <a onClick={()=>this.setState({open:!this.state.open})}>
                            <img src={minimize_icon} alt=""/>
                        </a>
                        <a onClick={this.deleteImage}>
                            <img src={close_icon} alt=""/>
                        </a>
                    </div>
                    <div>
                        {this.state.open ?
                            <img src={this.props.src}/> :
                            <div className="memo-minimize">
                            </div>
                        }
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default DragImage;