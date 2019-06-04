/*global chrome*/
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';

class Bookmark_Add_Form extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categoryName: props.categories[0].categoryName,
            title: '',
            url:  '',
            summary:'',
            tag:'',
            html: '',
        };

    };

    componentDidMount(): void {
        chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
            var tabUrl = tabs[0].url;
            console.log("tabUrl :" + tabUrl);
            this.setState({
                url: tabUrl
            });
        }.bind(this));
    }

    shouldComponentUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): boolean {
        const isUrl = this.state.url !== nextState.url;
        const isTitle = this.state.title !== nextState.title;
        const isSummary = this.state.summary !== nextState.summary;
        const isTag = this.state.tag !== nextState.tag;
        if(isUrl) {
            const request = require('request');
            request(nextState.url, function (err, res, html) {
                if (!err) {
                    this.setState({
                        html: html
                    })
                }

            }.bind(this));
        }
        return isUrl || isTitle || isSummary || isTag || true;
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("from Submit (create) : HTML : \n"+this.state.html);
        this.props.handleSubmit(this.state);
        this.setState({
            title: '',
            url: '',
            summary:'',
            tag:'',
            html: ''
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
                    <input id="title" value = {this.state.title} size = "20"  onChange={this.handleChange} />
                </p>
                <p>
                    <label style = {labelStyle}>Url</label><br/>
                    <input id="url" value={this.state.url} size="20"  onChange={this.handleChange}/>
                </p>
                <p>
                    <label  style = {labelStyle}>Summary</label><br/>
                    <input  id="summary" value={this.state.summary} size="20" onChange={this.handleChange}/>
                </p>
                <p>
                    <label  style = {labelStyle}>Tags</label><br/>
                    <input id="tag" value={this.state.tag} size="20"  onChange={this.handleChange}/>
                </p>
                <p>
                    <button type="submit">저장</button>
                </p>
            </form>
        );
    };
}
export default Bookmark_Add_Form;