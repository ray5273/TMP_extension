import React, {Component} from 'react';
import pdf_icon from "../../assets/menuBar/pdf.png";
import jspdf from 'jspdf';

class Pdf extends Component {

    addPDF = () =>{
        var pdf_popup = document.getElementById('pdf_popup');

        if(pdf_popup.style.display=='none'){
            pdf_popup.style.display='block';
        }else{
            pdf_popup.style.display='none';
        }
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