import React, { Component } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    background-color: ${props => props.color};
`

class Palette extends Component {
    constructor(props) {
        super(props);

    }

    addHighlight = (e, color) => {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        var newNode = document.createElement("span");
        if (selRange) {
            console.log("selobj:",selObj);
            console.log("selRange:", selRange);
            console.log("selRange.extractContents:::", selRange.extractContents);
            console.log("parent of selRange:", selRange.parentElement);
            newNode.setAttribute(
                "style",
                `background-color: ${color}; display: inline;`
            );
            newNode.appendChild(selRange.extractContents());
            selRange.insertNode(newNode);
            //위의 두줄을 대체가능-> selRange.surroundContents(newNode);
        } 
        else {
            console.log("else else else");
        }
    }
    render() {
        const colors=["#FBD6C6","#F35ADF", "#FFDF24", "#FFFF7E", "#BCFFB5", "#C5C0FF", "#FFD9FA",
        "#B8B8B8", "#489CFF"]
        return (
            <div className="palette-container">
                {colors.map(
                    color =>
                    <Button className="palette-item" onClick={(e)=>this.addHighlight(e, color)} color={color}></Button>
                )}
             
            </div>
        );
    }
}



export default Palette;
