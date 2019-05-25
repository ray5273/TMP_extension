import React, {Component} from 'react';
import Painterro from 'painterro_tmp'

class DrawingTool extends Component {
    addDrawingMemo = () => {
        //TODO: Painterro 저장 option 추가및 test
        //여러번 누르면 여러개 나오네
       Painterro().show();

    };

    render() {
        return (
            <div className="menus" onClick={this.addDrawingMemo}>
                <p>그림 메모 추가</p>
            </div>
        );
    }
}

export default DrawingTool;