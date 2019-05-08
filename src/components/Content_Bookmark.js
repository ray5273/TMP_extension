import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import bookmarkItem from './Bookmarks/BookmarkItem';
import SearchBar from 'material-ui-search-bar';
import bookmark_Add_Form from "./Bookmarks/Bookmark_Item_Form";

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Bookmarks extends Component {
    id=1;
    constructor(props) {
        super(props);
        this.state = {
            bookmarks:[],
            searched:[]
        }
    };

    componentDidUpdate(oldProps) {
        const newProps = this.props;
        if(oldProps.keyword !== newProps.keyword) {
            this.setState({ searched: this.state.bookmarks.filter(
                    x => x.title.indexOf(this.props.keyword) > -1
                ) })
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value,
        })
    };

    handleRemove= (id) => {
        /* 파이어베이스에 보낼 코드 */

        const {bookmarks} = this.state;
        this.setState({
            bookmarks: bookmarks.filter(bookmark=> bookmark.id !== id)
        });
    };

    handleSubmit = (data) => {
        /* 파이어베이스에 보낼 코드 */

        const {bookmarks} = this.state;

        if (data.title !=='') {
            this.setState({
                bookmarks: bookmarks.concat({
                    id: this.id++,
                    title : data.title,
                    url : data.url,
                    summary : data.summary,
                    tag : data.tag
                }),
            });
        } else {
            alert("공백으로 만들 수 없습니다.");
        }
    };


    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <div>
                    <bookmark_Add_Form
                        id={this.id}
                        title = {this.title}
                        url = {this.url}
                        summary = {this.summary}
                        tag = {this.tag}
                        handleSubmit={this.handleSubmit}
                    />
                </div>
                <br/>
                <div>
                    {this.state.bookmarks.map(
                        ({id, title, url, summary, tag }) => (
                            <bookmarkItem
                                id={id}
                                title={title}
                                url={url}
                                summary={summary}
                                tag ={tag}
                                handleRemove={this.handleRemove}
                            />
                        ))
                    }
                </div>
            </main>
        );
    };
}

Bookmarks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Bookmarks);