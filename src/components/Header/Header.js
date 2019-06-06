/*global chrome*/
import React, { Component } from 'react';
import firebase from '../../Firebase.js'
import styled, { css } from 'styled-components';
import oc from 'open-color';
import { Redirect } from 'react-router-dom';

import LoginButton from "./LoginButton";
import MainMenu from "../MainMenu";
import Signin from '../Signin';


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
const BorderedButton = styled.div`
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
// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
    width: 100%;
`;

const HeaderContents = styled.div`
    width: 100%;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
`;
// 로고
const Logo = styled.div`
    font-size: 1.4rem;
    letter-spacing: 2px;
    color: ${oc.teal[7]};
    font-family: 'Rajdhani';
`;
// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;
// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 3px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    shouldComponentUpdate() {
        return true;
    }

    clickSignOut = () => {
        firebase.auth().signOut()
            .then(() => {
                this.setState({
                    user: null
                });
            });
    };

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ user: user });
                var curUser = user.uid;
                console.log("user value:"+curUser);
                chrome.runtime.sendMessage({
                    contentScriptQuery:"getID",
                    id:curUser
                });

            } else {
                this.props.history.push('index.html');
            }
        });
    }

    render() {
        return (
            <div>


                <Positioner>
                    <WhiteBackground>
                        <HeaderContents>
                            <Logo>Trendy Memo Project</Logo>
                            <Spacer />
                            {this.state.user == null ?
                           null
                            
                            :
                                <BorderedButton types="out" onClick={this.clickSignOut}>로그아웃</BorderedButton>
                               
                                
                            }
                        </HeaderContents>
                    </WhiteBackground>

                    <GradientBorder />
                </Positioner>

                {this.state.user == null ?
                    <div><Signin /></div>
                    :
                    <div><MainMenu /></div>
                }
            </div>
        )

    }
}

export default Header;

