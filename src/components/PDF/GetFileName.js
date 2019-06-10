/*global chrome*/

import React, {Component} from 'react';
import './CSS/PDF.css'
import Firebase from '../../Firebase';
import 'firebase/storage'
class GetFileName extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filename :"default"
        }
    };
    handleCheckBox = ()=>{
        const cur_bool = this.state.file_to_storage;
        //얘네로 확인하면 되고

    }
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

        let file_name = this.state.filename;
        if(file_name=="")
            file_name = "default";
        console.log("submit filename:"+file_name);
        //"//pdfcrowd.com/url_to_pdf/?width=210mm&height=297mm"+`?pdf_name${file_name}`
        const href_link =`//pdfcrowd.com/url_to_pdf/?pdf_name=${file_name}`;
        window.location.href=href_link;
        const uid = this.props.uid;

        const result = document.getElementById("checkStorage");
        const check_result = result.checked;
        if(check_result) {
            var storage = Firebase.storage();
            var storage_ref = storage.ref();
            var xhr = new XMLHttpRequest();

            xhr.open("GET", href_link);
            xhr.responseType = 'blob';
            xhr.onload = function (e) {
                if (this.status == 200) {
                    console.log("file good!");
                    var imagePath = uid+'/PDF/'+file_name+'.pdf';
                    var dataRef = storage_ref.child(imagePath);
                    var blob = this.response;
                    dataRef.put(blob).then(function (snapshot) {
                        console.log("uploaded a file!");
                    });
                }
            };
            xhr.onerror = function (e) {
                alert("Error " + e.target.status + " occurred while receiving the document.");
            };
            xhr.send();

        }
        // console.log(result)
        // console.log("download items:"+DownloadItem)

    }
    render() {
        return (
            <div className="pdf_popup">
                <h1>PDF</h1>
                <input id="PDF_title" placeholder="Enter PDF FileName" value={this.props.title} onChange={this.handleChange}/>
                <div className="pdf_checkbox">
                    <input type="checkbox" id="checkStorage" onClick={this.handleCheckBox}/>
                    <label htmlFor="checkStorage">Upload to DB</label>
                </div>
                <div>
                    <button onClick={this.handleSubmit}>Download PDF </button>
                </div>

            </div>
        );
    }
}

export default GetFileName;