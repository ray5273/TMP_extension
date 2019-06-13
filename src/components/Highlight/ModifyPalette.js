import React, {Component} from 'react';
import styled from 'styled-components';
import Icon from '../../assets/hl_add.png';

const Button = styled.button`
    background-color: ${props => props.color};
`;

class ModifyPalette extends Component {
    render() {
        const colors = ["#FBD6C6", "#FF9090", "#FFDF24", "#FFFF7E", "#7ED2FF", "#BCFFB5", "#C5C0FF", "#FFD9FA",
            "#B8B8B8"];
        return (
            <div className="palette-container">
                <img alt="" src={Icon} className="Highlight-icon"/>
                {colors.map(
                    color =>
                        <Button className="palette-item" onClick={() => this.props.ret(color)} color={color}></Button>
                )}

            </div>
        );
    }
}


export default ModifyPalette;









