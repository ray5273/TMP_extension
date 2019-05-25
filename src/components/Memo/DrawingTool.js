import React, {Component} from 'react';
import Painterro from 'painterro_tmp'

class DrawingTool extends Component {
    addDrawingMemo = () => {
        //TODO: Painterro 저장 option 추가및 test
        //여러번 누르면 여러개 나오네
        //이미지를 올리는 기능 존재
       var ptro = Painterro({
           saveHandler : function(image,done){
               var formData = new FormData();
               formData.append('image',image.asBlob());

               var xhr = new XMLHttpRequest();
               xhr.open('POST','http://127.0.0.1:5000/save-as-binary/',true);
              // xhr.open('GET','https://naver.com',true);
               xhr.onload = xhr.onerror = function(){
                    done(true);
               };
               xhr.send(formData);
           }
       });
        ptro.show();

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