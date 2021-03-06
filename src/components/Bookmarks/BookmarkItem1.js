import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Launch from "@material-ui/icons/Launch";
import BookmarkBorder from '@material-ui/icons/BookmarkBorder';
import EditIcon from '@material-ui/icons/Edit';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteIcon from '@material-ui/icons/Delete';
import {EditForm} from './EditForm';


export class BookmarkItem1 extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            isExpanded: false,
        };
    };

    // 북마크 삭제 핸들링.
    handleRemoveBookmark = (bookmark) => {
        console.log("remove from BookmarkItem1 : " + bookmark.title);
        this.props.handleRemoveBookmark(bookmark);
    };

    // 북마크 편집 창 visible 핸들링.
    handleEditBookmark = () => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
    };

    // 북마크 수정된 내용
    handleSubmit = (data) => {
        this.setState({
            isEdit: !this.state.isEdit,
        });
        this.props.handleEditBookmark(data);
    };
    handleOpenHTML = (html) => {
        var win = window.open('');
        console.log("from handleOpenHTML : \n" + html);
        win.document.body.innerHTML = html;
    };

    render() {
        const {bookmark} = this.props;
        return (
            <ListItem key={bookmark.title} button onClick={() => window.open(bookmark.url)}>
                {// 북마크의 편집 버튼을 눌렀을 때, 편집을 할 수 있는 창을 생성.
                    !this.state.isEdit ?
                        <div>
                            <ListItemIcon>
                                <BookmarkBorder/>
                            </ListItemIcon>
                            < ListItemText insert primary={bookmark.title} secondary={bookmark.summary}/>
                            <ListItemSecondaryAction>
                                {this.state.isExpanded ?
                                    <IconButton aria-label="Edit" onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({isExpanded: !this.state.isExpanded});
                                        this.handleEditBookmark();
                                    }}>
                                        <EditIcon/>
                                    </IconButton> : ""
                                }
                                {this.state.isExpanded ?
                                    <IconButton aria-label="OpenWebpage" onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("before handleOpenHTML : \n" + bookmark.html);
                                        this.setState({isExpanded: !this.state.isExpanded});
                                        this.handleOpenHTML(bookmark.html);
                                    }}>
                                        <Launch/>
                                    </IconButton>
                                    : ""
                                }
                                {this.state.isExpanded ?
                                    <IconButton aria-label="Delete" onClick={(e) => {
                                        e.stopPropagation();
                                        this.setState({isExpanded: !this.state.isExpanded});
                                        this.handleRemoveBookmark(bookmark);
                                    }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                    :
                                    ""
                                }
                                <IconButton aria-label="Open" onClick={(e) => {
                                    e.stopPropagation();
                                    this.setState({isExpanded: !this.state.isExpanded});
                                }}>
                                    <MoreHorizIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </div>
                        :
                        < EditForm handleSubmit={this.handleSubmit} bookmark={bookmark}/>
                }
            </ListItem>
        );
    }
}