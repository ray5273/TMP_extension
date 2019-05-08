import React, { Component } from 'react';

class Bookmark_Add_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: document.location.href,
            summary:'',
            tag:''
        }
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState({
            title: '',
            url: document.location.href,
            summary:'',
            tag:''
        });

    };

    render() {
        const labelStyle = {
            backgroundColor: '#EEE',
            borderRadius: '5px'
        };

        return (
            <div>
                <form className = "BookmarkItem" onSubmit={this.handleSubmit}>
                    <p>
                        <label  style = {labelStyle}> Title </label><br/>
                        <input name="title" value = {this.state.title} size = "20"  onChange={this.handleChange} />
                    </p>
                    <p>
                        <label style = {labelStyle}>Url</label><br/>
                        <input name="url" value={this.state.url} size="20"  onChange={this.handleChange}/>
                    </p>
                    <p>
                        <label  style = {labelStyle}>Summary</label><br/>
                        <input  name="summary" value={this.state.summary} size="20" onChange={this.handleChange}/>
                    </p>
                    <p>
                        <label  style = {labelStyle}>Tags</label><br/>
                        <input name="tag" value={this.state.tag} size="20"  onChange={this.handleChange}/>
                    </p>
                    <p>
                        <button type="submit">저장</button>
                    </p>
                </form>
            </div>

        );
    };
}
export default Bookmark_Add_Form;