import React, { Component } from 'react';
import styled from 'styled-components';
//import Icon from '../../assets/marker-icon.png';
import Icon from '../../assets/hlicon.png';
import ReactDOM from 'react-dom';
import HighlightMenu from './HighlightMenu';
import Firebase from '../../Firebase'
import * as rangy from 'rangy'
import "rangy/lib/rangy-serializer";

const Button = styled.button`
    background-color: ${props => props.color};
`

class Palette extends Component {
    static defaultProps = {
        isNew: false
    };
    constructor(props) {
        super(props);
        this.state={
            hlNum: 0,
            nowNode: '',
            modifying: false,
            toModify:''
        };
        rangy.init();
    }

    /* 수정할색깔이 바뀌면 현재 state node의 색을 바꾸려 시도중
    componentWillUpdate(nextState) {
        if (nextState.toModify != this.state.toModify) {
          this.state.nowNode.setAttribute(
            "style",
            `background-color: ${nextState.toModify}; display: inline;`
        );
        }
      }
    */

    //가장 최근에 select한 range를 state에 넣어두고 지울 수 있게(db없이 임시)

    retModifiedColor=(color)=>{
        this.setState({
            toModify:color
        })
    }

    addTool = (e, newNode)=> {
            console.log("inside addTooltip Func");
            var toolTipDiv = document.createElement('div');
            toolTipDiv.setAttribute('id', 'toolTipDiv');

            toolTipDiv.style.position = 'absolute';
            toolTipDiv.style.top = window.scrollY+ e.clientY + "px";
            // toolTipDiv.style.visibility = "visible";
            toolTipDiv.style.left = window.scrollX+ e.clientX + "px";
            // toolTipDiv.style.top = selection_pos.top + 40 + "px";
            // toolTipDiv.style.left = selection_pos.left + selection_pos.width + "px";
            toolTipDiv.style.visibility = "visible";
            toolTipDiv.style.display="block";
            document.body.appendChild(toolTipDiv);
            ReactDOM.render(<HighlightMenu rmfunc={this.removeHighlight}/>, toolTipDiv); //ret={this.retModifiedColor}
        
/* 
       // Close the bubble when we click on the screen.
        document.addEventListener('mousedown', function (e) {
            //hidden시 a태그를 클릭해도 a tag가 실행이 안되는 문제 settimeout을 통해서 해결!
            setTimeout(function(){
                toolTipDiv.style.display='none';
            },200);

        }, false);
*/
    };



    addHighlight = (e, color) => {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        var newNode = document.createElement("span");

        console.log("in addhighlight!");

        var uid = this.props.uid;
        var url = encodeURIComponent(this.props.url);
        var db = Firebase.firestore();

        var comp = this;

        if (selRange) {
            var serialized = rangy.serializeRange(selRange, false);
            var hid = "";

            db.collection("User").doc(uid).collection("Url").doc(url).collection("Highlights").add({
                serialized: serialized,
                color: color
            })
            .then(function(docRef) {
                console.log("Generated highlight id: ", docRef.id);
                hid = docRef.id;

                newNode.setAttribute(
                    "style",
                    `background-color: ${color}; display: inline;`
                );
                newNode.setAttribute('id', `highlight_${hid}`);
                newNode.addEventListener('click', (e)=> {
                    comp.addTool(e, newNode);
                } );
                //newNode.appendChild(selRange.extractContents());
                //selRange.insertNode(newNode);
                selRange.surroundContents(newNode);

                comp.setState({hid: hid});
            })
            .catch(function(error) {
                console.error("Error inserting highlight data: ", error);
            });

        }
        else {
            console.log("No selected Range");
        }
        
        this.setState({
            hid: hid,
            nowNode: newNode
        });
    }

    
    render() {
        const colors=["#FBD6C6","#FF9090", "#FFDF24", "#FFFF7E","#7ED2FF", "#BCFFB5", "#C5C0FF", "#FFD9FA",
        "#B8B8B8" ]
        return (
            <div className="palette-container">
                <img alt="" src={Icon} className="Highlight-icon" />
                {colors.map(
                    color =>
                    <Button className="palette-item" onClick={(e)=>this.addHighlight(e, color)} color={color}></Button>
                )}
             
            </div>
        );
    }
}



export default Palette;













