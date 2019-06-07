import React, {Component} from 'react';
import Draggable from 'react-draggable-component';
import Firebase from '../../Firebase'
import 'firebase/firestore'
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
                    <div className="temp-text-wrapper">
                        <div className="tmp-btn">Image</div>
                        <div className="tmp-btn" onClick={()=>this.setState({open:!this.state.open})}>
                            Toggle
                        </div>
                    </div>
                    <div>
                        {this.state.open ?
                            <img src={this.props.src}/> : <p>closed</p>
                        }
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default DragImage;