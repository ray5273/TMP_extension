import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { shadow } from './HeaderStyle';
import PropTypes from "prop-types";

/*
이미 만들어진 컴포넌트를 styled를 통하여 스타일링 할때
styled(Link) `
    background: ~~~,
`
 */

const BorderedButton = styled(Link)`
    font-weight: 600;
    color: ${oc.cyan[6]};
    border: 1px solid ${oc.cyan[6]};
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
    
    &:hover {
        background: ${oc.cyan[6]};
        color: white;
        ${shadow(1)}
    }

    &:active {
        /* 마우스 클릭시 아래로 미세하게 움직임 */
        transform: translateY(3px);
    }
`;

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false
        }
    }
    render() {
        const {types} = this.props;

        if (types === 'in') {
            return (
                <BorderedButton to ='/signin'>
                    sign in / up
                </BorderedButton>

            )
        } else {
            return (
                <BorderedButton to='/' onClick={this.props.clickSignOut}>
                    sign out
                </BorderedButton>
            )
        }
    }

}

LoginButton.propTypes = {
    type: PropTypes.string
}

export default LoginButton;
