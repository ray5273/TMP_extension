/*global chrome*/
import React, { Component } from 'react';

class Bookmark_Add_Form extends Component {

    constructor(props) {
        super(props);
        var getUrl = '';

        this.state = {
            categoryName: props.categories[0].categoryName,
            title: '',
            url:  '',
            summary:'',
            tag:''
        };
        console.log("getUrl :" + getUrl);
    };

    componentDidMount(): void {
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
            var tabUrl = tabs[0].url;
            console.log("tabUrl :" + tabUrl);
            this.setState({
                url: tabUrl
            })
        }.bind(this));
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.handleSubmit(this.state);
        this.setState({
            title: '',
            url: '',
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
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label style = {labelStyle}> category</label><br/>
                        <select id='categoryName' name="categoryName" onChange={this.handleChange}>
                            {this.props.categories.map((category) => {
                                return <option key={category.categoryName} value= {category.categoryName}> {category.categoryName} </option>
                            })}
                        </select>
                    </p>
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

        );
    };
}
export default Bookmark_Add_Form;