import React, {Component} from 'react';
import Bookmark_Category from "./Bookmarks/Bookmark_Category";
import PDF_Dates_lists from "./PDF/PDF_Date_Lists"
import firebase from "../Firebase"
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/auth'

class ContentPdf extends Component {
    // numdates=1;
    dates=[];
    date_lists =[];
    pdf_lists = [];
    constructor(props) {
        super(props);
        this.state = {
            addBookmark: false,
            openRemoveCategory: false,
            date_lists:[],
            pdf_lists:[]
        }

    };
    componentWillMount(){
        var uid = firebase.auth().currentUser.uid;
        console.log("uid : "+uid);
        var firestore = firebase.firestore();
        let cur_date_pdfs=[];
        firestore.collection("User").doc(uid).collection("PDF").get().then(snapshot=>{
            snapshot.forEach( doc =>{
                console.log("dates: "+doc.id);
                let PDFS = doc.data().PDFS;
                console.log("PDFS"+PDFS);
                let arr = [];
                arr.push(doc.id);
                for(let i =0;i<PDFS.length;i++){
                    arr.push(PDFS[i]);
                }
                cur_date_pdfs.push(arr);
            })
            //data parsing
            let datelists=[];
            let pdflists = [];
            for(let i =0;i<cur_date_pdfs.length;i++){
                let pdfs = [];
                for( let j =0;j<cur_date_pdfs[i].length;j++){
                    if(j==0)
                        datelists.push(cur_date_pdfs[i][j]);
                    else
                        pdfs.push(cur_date_pdfs[i][j]);
                }
                pdflists.push(pdfs);
            }
            this.setState({
                date_lists :datelists,
                pdf_lists:pdflists
            })
        });
    }

    //여기서 날짜들을 다 불러와서 추가해주기
    //componentDidMount에다가 해야할듯
    handleCreateFolder = () => {
        //
        // this.setState( {
        //     categories: this.state.categories.concat(new Category(this.categoryId++, '추가된 카테고리' + (this.categoryId-1), []))
        // });

    };


    showCategories() {
        return this.state.dates.map((item) => {
            // console.log("from showCategories : " + item.categoryName);
            return <Bookmark_Category
                categoryName={item.categoryName}
                bookmarkList={item.bookmarkList}
                openRemoveCategory = {this.state.openRemoveCategory}
                handleRemoveCategory = {this.handleRemoveCategory}
                handleRemove={this.handleRemove}
                handleChange={this.handleChange}/>
        })
    }

    showLists(){
        return this.state.date_lists.map((item,index)=>{

            return <PDF_Dates_lists
                    listName={item}
                    pdfs={this.state.pdf_lists[index]}
                    />
        })
    }
    showObj=()=>{
        console.log("datelists:"+this.date_lists);

        console.log("pdfslist:"+this.pdf_lists[0]);

        console.log("pdfslist:"+this.pdf_lists[1]);
    };

    render() {
        return (
            <div >
                <div>
                    {this.showLists()}
                </div>
                {/*<div>*/}
                {/*    <BookmarkButton onClick={this.handleCreateFolder}>폴더 생성</BookmarkButton>*/}
                {/*    <BookmarkButton onClick={() => {*/}
                {/*        this.setState({openRemoveCategory: !this.state.openRemoveCategory});*/}
                {/*    }}>폴더 삭제</BookmarkButton>*/}
                {/*    <BookmarkButton onClick={this.handleAddBookmark}>북마크 추가</BookmarkButton>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    { this.state.addBookmark ? <Bookmark_Add_Form handleSubmit={this.handleSubmit} categories={this.state.categories} />  : "" }*/}
                {/*</div>*/}
                {/*<br/>*/}
                {/*<div>*/}
                {/*    { this.showCategories() }*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default ContentPdf;