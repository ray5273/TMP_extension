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
          uid:firebase.auth().currentUser.uid,
          data:[],
          currentPage: 1,
          datasPerPage: 5,
          top:0,
          map:''
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
    componentWillMount(){
        this.showAllMemos();
    }


    componentDidUpdate(oldProps) {
   
        //this.showAllMemos();
      }

      handleChange = (e) => {
          this.setState({
              [e.target.name] : e.target.value,
          })
      }
  
      handleRemove= (fid, url) => {
        console.log("UUUURRRRLLLLL:",url);
          const encodedUrl = encodeURIComponent(url);
          
          const ask = window.confirm("정말 삭제하시겠습니까?");

          if(ask) {
            var db = firebase.firestore();
            console.log("eeeeencodedUUUURRRRLLLLL:",encodedUrl);
            db.collection("User").doc(this.state.uid).collection("Url").doc(encodedUrl).collection("Memos").doc(fid).delete();
        }

          const {data} = this.state;
          this.setState({
            data: data.filter(d=> d.fid !== fid)
          });
        }
    
      handleSubmit = (e) => {
      }
    showNowMemos=()=>{
        //TODO: 현재URL
    }
    showAllMemos=()=>{
        
        const db=firebase.firestore();


        //list 가 바뀌는경우: 사이트가 추가되는경우,  삭제되는경우? 있나
        //사이트 개수 만큼 배열이 필요?

        let sites = [];
        let mapping = new Map();

        //사이트 개수가 추가되는경우 tracking
        db.collection("User").doc(this.state.uid).collection("Url").doc("list").onSnapshot(doc=>{
                console.log("doc data"+doc.data().list.length);
                console.log("doc data ddd");
                sites = doc.data().list;
                var component = this;
                for(let i=0;i<sites.length;i++) {
                    //메모 갯수가 추가되는경우
                    db.collection("User").doc(this.state.uid).collection("Url").doc(sites[i]).collection("Memos").onSnapshot(function(snapshot){
                        snapshot.docChanges().forEach( function(change){
                            if(change.type==="added" || change.type==="modified"){
                                let temp = change.doc.data().content;
                                temp = temp.replace(/(\s*)/g,"");
                                const decodedUrl = decodeURIComponent(change.doc.data().url);

                                let map_content = {
                                    content:change.doc.data().content,
                                    url:decodedUrl,
                                    title:change.doc.data().title,
                                    fid:change.doc.id
                                };
                                mapping.set(change.doc.id,map_content);
                                component.setState ({map: mapping});
                            }else{
                                mapping.delete(change.doc.id);
                                component.setState ({map: mapping});
                            }
                        });
                        let data = Array.from(component.state.map.values());
                        console.log("data values"+data);
                        component.setState({
                            data :data
                        });
                    })
                }
        });


    };

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
            
            
            const datas = this.state.data.slice((this.state.currentPage-1)*datasPerPage, this.state.currentPage*datasPerPage).map(
                ({url, title, content, fid}) => (
                <Item
                    url={url}
                    name={title}
                    content={content}
                    fid={fid}
                    handleRemove={this.handleRemove}
                />
                )
            );

            const searched=this.state.data.filter(
                x => x.content.indexOf(this.props.keyword) > -1
              ).slice((this.state.currentPage-1)*datasPerPage+1, this.state.currentPage*datasPerPage).map(
                ({url, title, content, fid}) => (
                <Item
                    url={url}
                    name={title}
                    content={content}
                    fid={fid}
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
                        ).length ? searched : <div className="memo-none">
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