import React, {Component} from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Item from './Item';
import firebase from '../Firebase';
import 'firebase/firestore';

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
          searchedMemos:[],
          uid:firebase.auth().currentUser.uid,
          data:[]
      };

    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.keyword !== newProps.keyword) {
          this.setState({ searchedMemos: this.state.memos.filter(
            x => x.name.indexOf(this.props.keyword) > -1
          ) })
        }

        this.showMemos();
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
      }

    showMemos=()=>{
        
        const db=firebase.firestore();
        let data=[];
        db.collection("User").doc(this.state.uid).collection("Url").get()
        .then(docs => {
            docs.forEach(doc => {
                db.collection("User").doc(this.state.uid).collection("Url").doc(doc.id).collection("Memos").get()
                    .then(memos => {
                        console.log(memos);
                        memos.forEach(memo => {
                            let temp = memo.data().content;
                            console.log(temp);
                            temp = temp.replace(/(\s*)/g,"");
                            const decodedUrl = decodeURIComponent(memo.data().url);
                            console.log(memo.data().content);
                            data.push({content: memo.data().content, url:decodedUrl, title: memo.data().title})

                        })
                    })
            })
        }).then(()=>console.log("datadatadta",data));
        
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <div>             
                  
                   
                    <br/>
                    <div>
                    {this.props.keyword === "" ? this.state.memos.map(
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