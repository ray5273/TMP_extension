import React, { Component } from 'react';
import Icon from '../../assets/Paint-icon.png';
import Painterro from 'painterro_tmp';
import Firebase from '../../Firebase'

function dataURItoBlob(dataURI)
{
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}


class Paint extends Component {
    constructor(props) {
        super(props);

    }


    showPainterro = () => {
        var image = document.getElementsByTagName('img');
        console.log("this img num :"+this.props.imageIndexFromParent);
        var storage = Firebase.storage();
        var storage_ref = storage.ref();

        //TODO:currentUser 인식 안되는 문제 - 현재는 우리 어플 로그인 인식이 안되어도 파일이 올려지도록,
        var auth = Firebase.auth().currentUser;
        console.log(auth);

        var ptro = Painterro({
            saveHandler : function(image,done){

                //TODO: User 인식 후 storage directory 변경해주기
                //TODO: storage directory 변경 후 metadata도 firestore에 저장 해주어야할듯
                var dataUrl = image.asDataURL();
                var blob = dataURItoBlob(dataUrl);
                var dataRef = storage_ref.child('data.png');
                dataRef.put(blob).then(function (snapshot) {
                    console.log("uploaded a file!");
                    done(true);
                });
            }
        });
        ptro.show(image[this.props.imageIndexFromParent].src);
    }
    render() {
        return (
            <div className="paint-container">
                <img alt="" src={Icon} className="Paint-icon" onClick={this.showPainterro}/>
            </div>
        );
    }
}



export default Paint;
