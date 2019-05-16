import React, { Component } from 'react';

class Bookmark_Add_Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: props.categories[0].categoryName,
            title: '',
            url: document.location.href,
            summary:'',
            tag:''
        }
    };

    handleChange = (e) => {
        console.log("change : : " + e.target.name +' : '+ e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log("after change: : " + this.state.categoryName);
};

    handleSubmit = (e) => {
        e.preventDefault();
        console.log('form: ' + this.state.categoryName);

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
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label style = {labelStyle}> category</label><br/>
                        <select id='aa' name="categoryName" onChange={this.handleChange}>
                            {this.props.categories.map((category) => (
                                <option key={category.categoryName} value= {category.categoryName}> {category.categoryName} </option>
                            ))}
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