import React, { Component } from 'react';
import styled from 'styled-components';
//import Icon from '../../assets/marker-icon.png';
import Icon from '../../assets/hlicon.png';

const Button = styled.button`
    background-color: ${props => props.color};
`

class Palette extends Component {
    constructor(props) {
        super(props);
        this.state={
            hlNum: 0
        }

        this.setState({
            hlNum: this.state.hlNum + 1,
        });
    }
    removeHighlight = (id) => {

    }
    addHighlight = (e, color) => {
        var selObj = window.getSelection();
        var selRange = selObj.getRangeAt(0);
        var newNode = document.createElement("span");

        var newtext = document.createTextNode(" 동적으로 추가되는 텍스트. ");
        var para = document.createElement("span");
        para.appendChild(newtext);

        if (selRange) {
            console.log("selobj:",selObj);
            console.log("selRange:", selRange);
            console.log("selRange.extractContents:::", selRange.extractContents);
            console.log("parent of selRange:", selRange.parentElement);
        
            newNode.setAttribute(
                "style",
                `background-color: ${color}; display: inline;`
            );
            newNode.setAttribute('id', `highlight${this.state.hlNum}`);
            newNode.addEventListener('click', ()=> {
                var x = newNode.textContent;
                newNode.replaceWith(x);
            } );
            //newNode.appendChild(selRange.extractContents());
            //selRange.insertNode(newNode);
            selRange.surroundContents(newNode);
        } 
        else {
            console.log("else else else");
        }
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













