import React, { Component } from 'react';
import firebase from '../../Firebase.js'
import styled from 'styled-components';
import oc from 'open-color';
import {shadow, media } from './HeaderStyle';
import MainMenu from '../MainMenu';
import { Redirect } from 'react-router-dom';

import LoginButton from "./LoginButton";

// 상단 고정, 그림자
const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

const HeaderContents = styled.div`
    width: 1200px;
    height: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
    ${media.wide`
        width: 992px;
    `}

    ${media.tablet`
        width: 100%;
    `}
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

    shouldComponentUpdate () {
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
            } else {
                this.props.history.push('index.html');
            }
        });
    }

    render() {
        if(this.state.user == null) {
            return (
                <div>
                    <Redirect to='/'/>
                    <div>
                        <Positioner>
                            <WhiteBackground>
                                <HeaderContents>
                                    <Logo>Trendy Memo Project</Logo>
                                    <Spacer/>
                                    <LoginButton types ="in" />
                                </HeaderContents>
                            </WhiteBackground>
                            <GradientBorder/>
                        </Positioner>
                    </div>
                </div>
            );
        } else {
            return(
                <div>
                    <Redirect to='/mainMenu'/>
                    <div>
                        <Positioner>
                            <WhiteBackground>
                                <HeaderContents>
                                    <Logo>Trendy Memo Project</Logo>
                                    <Spacer/>
                                    <LoginButton types="out" clickSignOut={this.clickSignOut}/>
                                </HeaderContents>
                            </WhiteBackground>
                            <GradientBorder/>
                        </Positioner>
                    </div> <br/>
                </div>

            );
        }
    }
}

export default Header;