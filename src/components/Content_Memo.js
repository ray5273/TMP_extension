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
          memos:[{
              id: 3,
            name:"asgdasdf",
            content: "sdsa",

          }],
          searchedMemos:[],
          uid:firebase.auth().currentUser.uid,
          data:[],
          currentPage: 1,
          datasPerPage: 6,
          limit: 7,
          top:0
      };

    }
    goLowest = () => {
        this.setState({
            currentPage: 1
        });
    }

    goHighest = (e) => {
        const highest = Number(Math.ceil(this.state.data.length / this.state.datasPerPage));
        this.setState({
            currentPage: highest
        });
    }
    handleClick(event) {
        this.setState({
            currentPage: Number(event.target.text),
        });
    }
    handlePrevClick = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            })
        }
    }

    handleNextClick = () => {
        if (this.state.currentPage < Math.ceil(this.state.data.length / this.state.datasPerPage)) { 
            this.setState({
                currentPage: this.state.currentPage + 1
            })
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.keyword !== newProps.keyword) {
          this.setState({ searchedMemos: this.state.data.filter(
            x => x.content.indexOf(this.props.keyword) > -1
          ) })
        }
        //this.showMemos();
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
    showNowMemos=()=>{
        //TODO: 현재URL
    }
    showAllMemos=()=>{
        
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
                            
                            temp = temp.replace(/(\s*)/g,"");
                            const decodedUrl = decodeURIComponent(memo.data().url);
                            
                            data.push({content: memo.data().content, url:decodedUrl, title: memo.data().title});
                       
                            //test=test.concat(memo.data().content);
                        })
                    })
            })
        })
        setTimeout(()=> {
            this.setState({
                data:data
            })
        }, 500)
        
    }

    /* 
    testFunc=()=>{
        console.log("testffff data",data);
        this.setState({
            data: data
        })
        //console.log("testffff test",test);
    }
    */
   
    render() {

        const { datasPerPage } = this.state;
            console.log("RENDERREDENRDERENDERNERDNERN", this.state.reports);
            
            
            const datas = this.state.data.slice((this.state.currentPage-1)*datasPerPage+1, this.state.currentPage*datasPerPage).map(
                ({url, title, content}) => (
                <Item
                    id={url}
                    name={title}
                    content={content}
                   
                    handleRemove={this.handleRemove}
                />
                )
            );

            const s=this.state.data.filter(
                x => x.url.indexOf(this.props.keyword) > -1
              ).slice((this.state.currentPage-1)*datasPerPage+1, this.state.currentPage*datasPerPage).map(
                ({url, title, content}) => (
                <Item
                    id={url}
                    name={title}
                    content={content}
                   
                    handleRemove={this.handleRemove}
                />
                )
            );

            const highest = Math.ceil(this.state.data.length / datasPerPage);
            const pageNumbers = [];
            for (let i = 1; i <= highest; i++) {
                pageNumbers.push(i);
            }

            const renderPageNumbers = pageNumbers.map(number => {
                return (
                    <a
                        key={number}
                        onClick={(e) => this.handleClick(e, number)}
                        className={Number(this.state.currentPage) === number ? "on_pager" : null}
                        style={(this.state.currentPage - 2 <= number && number <= this.state.currentPage + 2)
                            ||
                            ((this.state.currentPage < 3 && number < 6)
                                ||
                                (this.state.currentPage > highest - 3 && number > highest - 5)
                            )
                            ? null : styles.nonee
                        }
                    >
                        {number} &nbsp;
                    </a>
                );
            });


        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <div>     
                <button onClick={this.showAllMemos}>메모불러오기</button>        
                 <br />
                    
                    <br/>
                    <div>

{/* 
                    {this.state.data.length ?
                    datas
                    :
                    <div className="memo-none">
                        <p>메모 목록이 없습니다.</p>
                     </div>
                    }
*/}
                            
                    {this.state.data.length ?
                        
                        (this.props.keyword === "" ?
                        datas : 
                        
                        (this.state.data.filter(
                            x => x.url.indexOf(this.props.keyword) > -1
                        ).length ? s : <div className="memo-none">
                        <p>검색 결과가 없습니다.</p>
                     </div>))
                        :
                        <div className="memo-none">
                        <p>메모 목록이 없습니다.</p>
                     </div>
                    }  
                       
                </div>
                {this.state.data.length ?
                <div className="pagination">
                <div className="prev">
                    <a onClick={this.goLowest} className="prev02"> &lt;&lt; </a> &nbsp;
                    <a onClick={this.handlePrevClick} className="prev01"> &lt; </a>
                </div>
                {/*  pageination 선택 클래스 - on_pager */}

                {renderPageNumbers}
                <div className="next">
                    <a onClick={this.handleNextClick} className="next02"> &gt;</a> &nbsp;
                    <a onClick={this.goHighest} className="next01"> &gt;&gt; </a>
                </div>
            </div>
            : null
            }
                        
                </div>
            </main>
        );
    }
}

Memos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Memos);