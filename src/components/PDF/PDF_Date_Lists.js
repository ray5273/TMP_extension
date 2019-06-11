import React, {Component} from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import {BookmarkItem1} from "../Bookmarks/BookmarkItem1";
import PdfItem from "./PDF_item";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

class PdfDateLists extends Component {
    constructor(props) {
        super(props);
        this.state={
            open:false,
            pdfs:this.props.pdfs,
            dates:this.props.dates,
            date:''
        }
    }
    componentDidMount(): void {
        this.setState({
            date:this.props.listName
        })
    }

    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };

    //PDF 삭제 핸들링
    handleDelete = (file_name)=>{
        const date = this.state.date;
        console.log("date in dates lists:"+date);
        this.props.handleRemovePDF(date,file_name);
    };
    showPDFS = ()=>{
        console.log("in show pdfs pdfs:"+this.props.pdfs);
        return this.props.pdfs.map((item,index)=>{
            return <PdfItem
                name={item}
                date={this.props.listName}
                handleDelete={this.handleDelete}
                />
        })
    };

    render() {
        const listName= this.props.listName;
        const strArray = listName.split('_');
        const printed_Name = strArray[0]+"년 "+strArray[1]+"월 "+strArray[2]+"일";

        return (
            <div>
                <ListItem button onClick={this.handleClick} id='list' >
                    <ListItemIcon>
                        <BookmarksIcon />
                    </ListItemIcon>
                    <ListItemText insert primary={printed_Name} />
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout = "auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.showPDFS()}
                    </List>

                </Collapse>
            </div>
        );
    }
}

export default PdfDateLists;
{/*<List component="div" disablePadding >*/}
{/*    {this.props.bookmarkList.map( (bookmark) => (*/}
{/*        <BookmarkItem1*/}
{/*            bookmark = { bookmark }*/}
{/*            handleRemoveBookmark={this.handleRemoveBookmark}*/}
{/*            handleEditBookmark = {this.handleEditBookmark}/>*/}
{/*    ))}*/}
{/*</List>*/}