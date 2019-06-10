import React, {Component} from 'react';
import './CSS/PDF.css'
class GetFileName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename :this.props.url
        }
    };
    handleChange = (e) =>{
        console.log("on change!");

        this.setState({
            filename: e.target.value
        });
    }
    handleSubmit = () =>{
        console.log("get file submit");
        var pdf_popup = document.getElementById('pdf_popup');
            pdf_popup.style.display='none';
        const file_name = this.state.filename;
        console.log("submit filename:"+file_name);
        //"//pdfcrowd.com/url_to_pdf/?width=210mm&height=297mm"+`?pdf_name${file_name}`
        const href_link =`//pdfcrowd.com/url_to_pdf/?pdf_name=${file_name}`;
        window.location.href=href_link;
    }
    render() {
        return (
            <div className="pdf_popup">
                <h1>PDF</h1>
                <input id="PDF_title" placeholder="Enter PDF FileName" value={this.props.title} onChange={this.handleChange}/>
                <div>
                    <button onClick={this.handleSubmit}>Download PDF </button>
                </div>
            </div>
        );
    }
}

export default GetFileName;