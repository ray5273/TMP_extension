import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkBorder from "@material-ui/core/SvgIcon/SvgIcon";
import DeleteIcon from '@material-ui/icons/Delete';

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
//import {EditForm} from "../Bookmarks/EditForm";
import Firebase from '../../Firebase'
import 'firebase/storage'
import 'firebase/auth'
class PdfItem extends Component {
    constructor(props){
        super(props);
        this.state={
            name:"",
            date:""
        }
    }
    componentDidMount(){
        this.setState({
            name:this.props.name,
            date:this.props.date
        })
    }
    handleClick=()=>{
        const date = this.state.date;
        const name = this.state.name;
        const uid = Firebase.auth().currentUser.uid;
        const storage = Firebase.storage();
        const storageRef = storage.ref();
        const path = uid+'/PDF/'+date+'/'+name+'.pdf';
        storageRef.child(path).getDownloadURL().then(function(url){

            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
                console.log("download start!");
                const blob = xhr.response;
                var a = document.createElement('a');
                a.href = window.URL.createObjectURL(blob);
                a.download = name+'.pdf'; // set the file name
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click(); //this is probably the key - simulatating a click on a download link
            };
            xhr.open('GET', url);
            xhr.send();
        }).catch(function(error) {
            // Handle any errors
            console.log("download error!");
        });
    };

    handleDelete=(file_name)=>{
        this.props.handleDelete(file_name);
    };

    render() {
        const file_name =this.state.name+".pdf";
        return (
            <ListItem  key="" button onClick={this.handleClick}  >
                <div>
                    <ListItemIcon>
                        <BookmarkBorder/>
                    </ListItemIcon>
                    < ListItemText insert primary={file_name} secondary="Click to Download file!" />
                </div>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={(e) => {
                        e.stopPropagation();
                        this.handleDelete(file_name);
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default PdfItem;