import React from 'react';
import styled, {css} from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";

/*
이미 만들어진 컴포넌트를 styled를 통하여 스타일링 할때
styled(Link) `
    background: ~~~,
`
 */
const shadow = (weight) => {
    const shadows = [
        css`box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);`,
        css`box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);`,
        css`box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);`,
        css`box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);`
    ];

    return shadows[weight];
};

const BorderedButton = styled(Link)`
    font-weight: 600;
    color: #83b8f4;
    border: 1px solid #83b8f4;
    padding: 0.5rem;
    padding-bottom: 0.4rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    transition: .2s all;
    
    &:hover {
        background: #83b8f4;
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
                <div>
                    <BorderedButton to ='/signin'>
                        sign in / up
                    </BorderedButton>
                </div>
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
