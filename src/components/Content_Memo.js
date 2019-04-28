import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Item from './Item';
import SearchBar from 'material-ui-search-bar';

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

class Memos extends Component {
    id=1;
    constructor(props) {
      super(props);
      this.state = {
        memos:[],
        searchedMemos:[]
      }
    }
    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.keyword !== newProps.keyword) {
          this.setState({ searchedMemos: this.state.memos.filter(
            x => x.name.indexOf(this.props.keyword) > -1
          ) })
        }
      }

      handleChange = (e) => {
          this.setState({
              [e.target.name] : e.target.value,
          })
      }
  
      handleRemove= (id) => {
          /* 파이어베이스에 보낼 코드 */
  
          const {memos} = this.state;
          this.setState({
            memos: memos.filter(memo=> memo.id !== id)
          });
        }
    
      handleSubmit = (e) => {
        e.preventDefault();
        /* 파이어베이스에 보낼 코드 */
  
        const {name, content, tag, memos} = this.state;
        if (name !=='') {
          this.setState({
            memos: memos.concat({
              id: this.id++,
              name, content, tag
            }),
            name: '',
            content: '',
            tag: '',
          });
        } else {
          alert("공백으로 만들 수 없습니다.");
        }  
      }


    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <div>             
                    <form >
                        <input
                            name="name"
                            value={this.state.name}
                            placeholder="메모 제목"
                            onChange={this.handleChange}
                            
                        />
                        <input
                            name="content"
                            value={this.state.content}
                            placeholder="메모 내용"
                            onChange={this.handleChange}
                            
                        />
                        <input
                            name="tag"
                            placeholder="태그"
                            value={this.state.tag}
                            onChange={this.handleChange}
                        />
                        <button type="submit" onClick={this.handleSubmit}>등록하기</button>
                    </form>
                    <br/>
                    <div>
                    {this.props.keyword == "" ? this.state.memos.map(
                        ({id, name, content, tag }) => (
                        <Item
                            id={id}
                            name={name}
                            content={content}
                            tag={tag}
                            handleRemove={this.handleRemove}
                        />
                    )) :
                    this.state.searchedMemos.map(
                        ({id, name, content, tag }) => (
                        <Item
                            id={id}
                            name={name}
                            content={content}
                            tag={tag}
                            handleRemove={this.handleRemove}
                        />
                    ))
                    }         
                    </div>

                </div>
            </main>
        );
    }
}

Memos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Memos);