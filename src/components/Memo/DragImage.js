import React, {Component} from 'react';
import Draggable from 'react-draggable-component';

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
    render() {
        return (
            <Draggable
                axis="x"
                handle=".handle"
                defaultPosition={{x:0, y:0}}
                position={{x:this.props.push_x,y:this.props.push_y}}
                grid={[25, 25]}
                scale={1}
                onStart={this.handleStart}
                onDrag={this.handleDrag}
                onStop={this.handleStop}>
                <div className="image-wrapper">
                    <div className="temp-text-wrapper">
                        <div className="tmp-btn">Image</div>
                        <div className="tmp-btn" onClick={()=>this.setState({open:!this.state.open})}>
                            Toggle
                        </div>
                    </div>
                    <div>
                        {this.state.open ?
                            <img src={this.props.push_src}/> : <p>closed</p>
                        }
                    </div>
                </div>
            </Draggable>
        );
    }
}

export default DragImage;