import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarBorder from "@material-ui/core/SvgIcon/SvgIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditForm } from './EditForm';


export class BookmarkItem1 extends  Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false
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

    render() {
        const { bookmark } = this.props;
        return (
            <ListItem  key={bookmark.title} button onClick={() => {window.parent.location.href = bookmark.url }} >
                {// 북마크의 편집 버튼을 눌렀을 때, 편집을 할 수 있는 창을 생성.
                    !this.state.isEdit?
                        <div>
                            < ListItemText insert primary={bookmark.title} secondary={bookmark.summary} />
                            <ListItemSecondaryAction>
                                <IconButton aria-label="Edit" onClick={(e) => {
                                    e.stopPropagation();
                                    this.handleEditBookmark();
                                }}>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton aria-label="Delete" onClick={(e) => {
                                    e.stopPropagation();
                                    this.handleRemoveBookmark(bookmark);
                                }}>
                                    <DeleteIcon/>
                                </IconButton>
                            </ListItemSecondaryAction>
                        </div>
                        :
                        <EditForm handleSubmit={this.handleSubmit} bookmark={ bookmark }/>
                }
            </ListItem>
        );
    }
}