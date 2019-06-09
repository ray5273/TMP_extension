import React, {Component} from 'react';
import pdf_icon from "../../assets/menuBar/pdf.png";
import jspdf from 'jspdf';

class Pdf extends Component {

    addPDF = () =>{
            console.log("pdf add!");
    };

    render() {
        return (
            <div className="menus" onClick={this.addPDF}>
                <img src={pdf_icon} alt="" />
            </div>
        );
    }
}

export default Pdf;