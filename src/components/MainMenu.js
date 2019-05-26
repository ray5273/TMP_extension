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
import '../content.css';

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
        backgroundColor: '#F9F9F9',
    },
    tabsRoot: {
    //    borderBottom: '1px solid #e2315a',
        borderBottom: '1px solid #6B9900',

    },
    tabsIndicator: {
        backgroundColor: '#6B9900',
    },
    tabRoot: {
        textTransform: 'initial',
        minWidth: 100,
        fontWeight: theme.typography.fontWeightMedium,
       // background: '#e2315a',
        background:'#93CC8D',
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
        keyword:""
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
                    className="header-button-div"
                >
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="MEMO"
                        className="header-button"
                        
                    />
                    <Tab
                        disableRipple
                        classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
                        label="BOOKMARK"
                        className="header-button"
                    />
                </Tabs>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabContainer dir={theme.direction}><Content_Memo keyword={this.state.keyword}/></TabContainer>
                    <TabContainer dir={theme.direction}><Content_Bookmark keyword={this.state.keyword}/></TabContainer>
                </SwipeableViews>
                 {/*<SearchBar
                     // value={this.state.search_val}
                     onChange={() => console.log('onChange')}
                     onRequestSearch={() => console.log('onRequestSearch')}
                     style={{
                         margin: '0 auto',
                         maxWidth: 800,
                         //background:'#e2315a',
                         background:'#3f54af',
                         //searchBarColor:'#2c323c',
                     }}
                     // 나중에 아래의 코드를 사용해야할듯
                     onChange={(keyword) => this.setState({ keyword })}
                     // onRequestSearch={() => doSomethingWith(this.state.value)}
                    />*/}
                 <input 
                    onChange={(keyword) => this.setState({ keyword })}
                    placeholder="검색하세요.."
                    className="search-input"
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
