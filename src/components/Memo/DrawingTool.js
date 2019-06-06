import React, {Component} from 'react';
import Painterro from 'painterro_tmp'
import Firebase from '../../Firebase'
import 'firebase/firestore'
//data file to blob file
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
class DrawingTool extends Component {
    addDrawingMemo = () => {

        //이미지를 올리는 기능 존재
        //
        var storage = Firebase.storage();
        var storage_ref = storage.ref();
        //TODO:currentUser 인식 안되는 문제 - 현재는 우리 어플 로그인 인식이 안되어도 파일이 올려지도록,
        var auth = Firebase.auth().currentUser;
        console.log(auth);
        // const projectID = 'jsp-tmp';
        // const key = 'AIzaSyB_d7o3MIvbgpLik2LPy7Mze_sQ2Or4NgE';
        // const doc = 'players/8SB90IpAbzCmIH7N5tkG';
        // const url = `https://firestore.googleapis.com/v1beta1/projects/${projectID}/databases/(default)/documents/${doc}?key=${key}`;
        //
        // // Use fetch to request the API information
        // fetch(url)
        //     .then(response => response.json())
        //     .then(json => console.log(json));
        var database = Firebase.firestore();
        database.collection("cdkfdkfds").doc("LAskdakdjsd").set({
            name: "Los Angelesddd",
            state: "CAasdsd",
            country: "USAs"
        }).then(function() {
            console.log("Document successfully written!");
        }).catch(function(error) {
            console.error("Error writing document: ", error);
        });
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