import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {Link, BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Content_Memo from "./Content_Memo";
import Content_Bookmark from "./Content_Bookmark"
import Signin from "./Signin";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import SwipeableViews from 'react-swipeable-views';
import SearchBar from 'material-ui-search-bar'

//이쪽 UI 제대로 바꾸기 search , button , icons 얘네들 다 추가하기
//material-ui appbar로 검색하면 될듯



function TabContainer({ children, dir }) {
    return (
        <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
            {children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
};


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: '#2c323c',
    },
    tabsRoot: {
    //    borderBottom: '1px solid #e2315a',
        borderBottom: '1px solid #3f54af',

    },
    tabsIndicator: {
        backgroundColor: '#2c323c',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 100,
        fontWeight: theme.typography.fontWeightMedium,
       // background: '#e2315a',
        background:'#3f54af',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#ffffff',
            opacity: 1,
        },
        '&$tabSelected': {
            color: '#ffffff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#ffffff',
        },
    },
    tabSelected: {},
    typography: {
        padding: theme.spacing.unit * 3,
    },

});


class CustomizedTabs extends React.Component {
    state = {
        value: 0,
        search_val: "Search",
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };
    handleChangeIndex = index => {
        this.setState({ value: index });
    };

    render() {
        const { classes,theme } = this.props;
        const { value } = this.state;

        return (
            <MuiThemeProvider>
             <div className={classes.root}>
                <Tabs
                    value={value}
                    onChange={this.handleChange}
                    classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
                    variant="fullWidth"
                >
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="MEMO"
                    />
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="BOOKMARK"
                    />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><Content_Memo/></TabContainer>
                    <TabContainer dir={theme.direction}><Content_Bookmark/></TabContainer>
                </SwipeableViews>
                 <SearchBar
                     // value={this.state.search_val}
                     onChange={() => console.log('onChange')}
                     onRequestSearch={() => console.log('onRequestSearch')}
                     style={{
                         margin: '0 auto',
                         maxWidth: 800,
                         //background:'#e2315a',
                         background:'#3f54af',
                         //글자색을 어떻게 바꾸는지 모르겠네 ㅜㅜ
                         textColor:'#ffffff',
                         fontColor:'#ffffff',
                         color:'#ffffff',
                         //searchBarColor:'#2c323c',
                     }}
                     // 나중에 아래의 코드를 사용해야할듯
                     // onChange={(newValue) => this.setState({ value: newValue })}
                     // onRequestSearch={() => doSomethingWith(this.state.value)}
                 />
             </div>
           </MuiThemeProvider>
        );
    }
}

CustomizedTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles ,{ withTheme: true })(CustomizedTabs);

// appbar 디자인 이전버전
// const MyLink = props => <Link to="/open-bookmark" {...props} />
//
// const styles = theme => ({
//     root: {
//         width: '100%',
//     },
//     grow: {
//         flexGrow: 1,
//     },
//     menuMemo: {
//         marginLeft: -12,
//         marginRight: 20,
//     },
//     menuBookMark: {
//         marginLeft: 5,
//         marginRight: 5,
//     },
//     title: {
//         display: 'none',
//         [theme.breakpoints.up('sm')]: {
//             display: 'block',
//         },
//     },
//     search: {
//         position: 'relative',
//         borderRadius: theme.shape.borderRadius,
//         backgroundColor: fade(theme.palette.common.white, 0.15),
//         '&:hover': {
//             backgroundColor: fade(theme.palette.common.white, 0.25),
//         },
//         marginLeft: 0,
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             marginLeft: theme.spacing.unit,
//             width: 'auto',
//         },
//     },
//     searchIcon: {
//         width: theme.spacing.unit * 9,
//         height: '100%',
//         position: 'absolute',
//         pointerEvents: 'none',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     inputRoot: {
//         color: 'inherit',
//         width: '100%',
//     },
//     inputInput: {
//         paddingTop: theme.spacing.unit,
//         paddingRight: theme.spacing.unit,
//         paddingBottom: theme.spacing.unit,
//         paddingLeft: theme.spacing.unit * 10,
//         transition: theme.transitions.create('width'),
//         width: '100%',
//         [theme.breakpoints.up('sm')]: {
//             width: 120,
//             '&:focus': {
//                 width: 200,
//             },
//         },
//     },
// });
// function SearchAppBar(props) {
//     const { classes } = props;
//
//     return (
//         <div className="nav">
//             <Search click={this.clickSearch} change={this.changeSearchKeyword} value={this.state.keyword}/>
//             <br/>
//             {Buttons.map((x, idx)=> {return <button onClick={()=>this.changeTabState(idx)}>{x}</button>;})}
//             <TabContainer num={this.state.tab} />
//         </div>
//
//         // <div className={classes.root}>
//         //     <AppBar position="static">
//         //         <Toolbar>
//         //             {/*<IconButton className={classes.menuMemo} color="inherit" aria-label="Open drawer">*/}
//         //             {/*    <MenuIcon />*/}
//         //             {/*</IconButton>*/}
//         //             {/*<Tabs>*/}
//         //             {/*<Tab*/}
//         //             {/*    label='Memos'*/}
//         //             {/*    component={Link}*/}
//         //             {/*    to ="/tab1"*/}
//         //             {/*/>*/}
//         //             {/*<Tab*/}
//         //             {/*    label='Bookmark'*/}
//         //             {/*    component={Link}*/}
//         //             {/*    to="/tab2"*/}
//         //             {/*/>*/}
//         //             {/*</Tabs>*/}
//         //             <Typography className={classes.title} variant="h6" color="inherit" noWrap>
//         //                 Material-UI
//         //             </Typography>
//         //             <div className={classes.grow} />
//         //             <div className={classes.search}>
//         //                 <div className={classes.searchIcon}>
//         //                     <SearchIcon />
//         //                 </div>
//         //                 <InputBase
//         //                     placeholder="Search…"
//         //                     classes={{
//         //                         root: classes.inputRoot,
//         //                         input: classes.inputInput,
//         //                     }}
//         //                 />
//         //             </div>
//         //             <IconButton className={classes.menuBookMark} color="inherit" aria-label="Open drawer"
//         //                         containerElement={<Link to="/home" />}
//         //                         tooltip="home"
//         //                         linkButton={true}>
//         //                 <MenuIcon />
//         //             </IconButton>
//         //         </Toolbar>
//         //     </AppBar>
//         // </div>
//     );
// }
// class Memo extends React.Component{
//     render() {
//         return (
//             SearchAppBar()
//             );
//     }
// }

//search popup injection 부분
{/*<!doctype html>*/}
{/*<html>*/}
{/*<head>*/}
{/*    <title>Evernote Web Clipper SimSearch</title>*/}
{/*    <meta charset="utf-8">*/}
{/*        <script src="SimSearchFrame.js"></script>*/}
{/*        <link rel="stylesheet" href="SimSearchStyles.css">*/}
{/*        </head><body style="overflow: hidden;"><body>*/}
{/*<header>*/}
{/*    <a class="branding" target="_blank"></a>*/}
{/*    <div id="closeSimSearch">*/}
{/*        <div id="closeButton"></div>*/}
{/*        <div id="closeOptions" class="hidden">*/}
{/*            <ul>*/}
{/*                <li id="dismiss" message="searchHelper_hideTemp"></li>*/}
{/*                <li id="dismissForever" message="searchHelper_hidePerm"></li>*/}
{/*            </ul>*/}
{/*        </div>*/}
{/*    </div>*/}
{/*</header>*/}
{/*<div id="simSearchNotes">*/}
{/*    <div id="featureInfo" class="hidden">*/}
{/*        <span>*/}
{/*            <span message="alwaysShow" class="cta" id="keepSimsearchOn"></span> */}
{/*            <span>&nbsp;|&nbsp;</span> <span message="dontShowAgain" class="cta" id="disableSimsearch"></span> */}
{/*        </span><a message="whatsThis" class="info" target="_blank" href="https://evernote.com/contact/support/kb/#!/article/23193838"></a>*/}
{/*    </div><div id="featureInfoPreview" class="hidden">*/}
{/*    <h1 message="searchEvernoteAsYouSearchWeb"></h1>*/}
{/*    <br>*/}
{/*        <div class="body" message="evernoteDoesNotTrackYou"></div>*/}
{/*        <div class="green button" message="gotIt"></div>*/}
{/*    </div>*/}
{/*</body>*/}
{/*</body>*/}
{/*        </html>*/}