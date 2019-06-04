import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
}));

/*
    북마크 내용을 편집할 form.
 */
export class EditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.bookmark.title,
            summary: props.bookmark.summary,
            tag: props.bookmark.tag,
            url: props.bookmark.url,
            html: props.bookmark.html
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        // 부모에게 전달 하는 함수
        this.props.handleSubmit(this.state);

    };

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    };

    render() {
      const classes = useStyles;

      const { bookmark } = this.props;
      return (
          <form id='bookmarkEdit' className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off" onClick={(e) => e.stopPropagation()}>
              <fieldset>
                  <legend>북마크 편집</legend>
                  <TextField
                      required
                      id="title"
                      label="Bookmark Name"
                      defaultValue={ bookmark.title }
                      className={ classes.textField }
                      onChange={this.handleChange}
                  /><br/>
                  <TextField
                      id="summary"
                      label="Bookmark Summary"
                      defaultValue={ bookmark.summary }
                      className={ classes.textField }
                      onChange={this.handleChange}

                  /><br/>
                  <TextField
                      id="tag"
                      label="Tag"
                      defaultValue={ bookmark.tag }
                      className={ classes.textField }
                      onChange={this.handleChange}
                  />
                  <IconButton type="submit"> <EditIcon/> </IconButton>
              </fieldset>

          </form>
      );
    }

}
