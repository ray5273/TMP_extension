import React, { Component } from 'react';
import Icon from '../../assets/Paint-icon.png';
import Painterro from 'painterro_tmp';
import Firebase from '../../Firebase'
import 'firebase/firestore'

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

        var database = Firebase.firestore();
        var uid = this.props.uid;
        var url = this.props.url;

        //firestore 에 memo갯수를 저장해두어야할듯
        var database = Firebase.firestore();

        // 주소 URL이 path를 의미하는 / 를 포함하기때문에 인코딩 디코딩 과정 추가
        url = encodeURIComponent(url);
        console.log("in drawing tool : uid : "+this.props.uid +" encoded url : "+url);
        console.log("decoded url : "+ decodeURIComponent(url));

        //여기서 url에 대한 image memo count가 존재하는지먼저 파악 없을시 새로 만들어줌.
        database.collection("User").doc(uid).collection("Url").doc(url).get().then(function(doc){
            if(!doc.exists) {
                database.collection("User").doc(uid).collection("Url").doc(url).set({
                    imageCount: 0
                }).then(function () {
                    console.log("Memo Count firestore successfully added");
                }).catch(function (error) {
                    console.error("Error writing document: ", error);
                });
            }
            // querySnapshot.forEach(function(doc) {
            //     if (doc.exists) {
            //         console.log(doc.id, “=>“, doc.data());
            //     } else {
            //         database.collection(“User”).doc(uid).collection(“Url”).doc(url).collection(“MemoImage”).set({
            //             imageCount: 0
            //         }).then(function () {
            //             console.log(“Memo Count firestore successfully added”);
            //         }).catch(function (error) {
            //             console.error(“Error writing document: “, error);
            //         });
            //     }
            // });
        });
        // //여기서 url에 대한 image memo count가 존재하는지먼저 파악 없을시 새로 만들어줌.
        // database.collection("User").doc(uid).collection(url).doc("MemoImage").get().then(function(doc){
        //     if(doc.exists){
        //         console.log(doc.id,"=>",doc.data());
        //     }else{
        //         database.collection("User").doc(uid).collection(url).doc("MemoImage").set({
        //             imageCount: 0
        //         }).then(function() {
        //             console.log("Memo Count firestore successfully added");
        //         }).catch(function(error) {
        //             console.error("Error writing document: ", error);
        //         });
        //     }
        // });
        var ptro = Painterro({
            saveHandler : function(image,done){
                var dataUrl = image.asDataURL();
                var blob = dataURItoBlob(dataUrl);

                //각각의 url에서 image는 1번부터 시작 ex) image1.png ...
                database.collection("User").doc(uid).collection("Url").doc(url).get().then(function(doc){
                    //존재 할 시
                    console.log("value : " + doc.data().imageCount);
                    var image_data_num = doc.data().imageCount + 1;
                    database.collection("User").doc(uid).collection("Url").doc(url).collection(`ImageMetadata${image_data_num}`).doc("pos").set({
                        x: 0,
                        y: 0
                    });
                    database.collection("User").doc(uid).collection("Url").doc(url).set({
                        imageCount: image_data_num,
                    }).then(function () {
                        console.log("Document successfully written!");
                        var imagePath = uid + '/' + url + '/' + 'image' + image_data_num + '.png';
                        var dataRef = storage_ref.child(imagePath);
                        dataRef.put(blob).then(function (snapshot) {
                            console.log("uploaded a file!");
                            done(true);
                        });
                    }).catch(function (error) {
                        console.error("Error writing document: ", error);
                    });
                });
                // //metadata에 x,y좌표 초기화 : (0,0)
                // //각각의 url에서 image는 1번부터 시작 ex) image1.png ...
                // database.collection("User").doc(uid).collection(url).doc("MemoImage").get().then(function(doc){
                //     console.log("value : "+doc.data().imageCount);
                //     var image_data_num = doc.data().imageCount+1;
                //     database.collection("User").doc(uid).collection(url).doc(`ImageMetadata${image_data_num}`).set({
                //         x:0,
                //         y:0
                //     });
                //     database.collection("User").doc(uid).collection(url).doc("MemoImage").set({
                //         imageCount: image_data_num,
                //     }).then(function() {
                //         console.log("Document successfully written!");
                //         var imagePath = uid +'/'+url+'/'+'image'+image_data_num+'.png';
                //         var dataRef = storage_ref.child(imagePath);
                //         dataRef.put(blob).then(function (snapshot) {
                //             console.log("uploaded a file!");
                //             done(true);
                //         // });

                //
                //     }).catch(function(error) {
                //         console.error("Error writing document: ", error);
                //     });
                // });
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
