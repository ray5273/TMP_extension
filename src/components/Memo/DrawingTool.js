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
        var uid = this.props.uid;
        var url = this.props.url;

        //firestore 에 memo갯수를 저장해두어야할듯
        var database = Firebase.firestore();

        // 주소 URL이 path를 의미하는 / 를 포함하기때문에 인코딩 디코딩 과정 추가
        url = encodeURIComponent(url);
        console.log("in drawing tool : uid : "+this.props.uid +" encoded url : "+url);
        console.log("decoded url : "+ decodeURIComponent(url));


        //여기서 url에 대한 image memo count가 존재하는지먼저 파악 없을시 새로 만들어줌.
        database.collection("User").doc(uid).collection(url).doc("MemoImage").get().then(function(doc){
            if(doc.exists){
                console.log(doc.id,"=>",doc.data());
            }else{
                database.collection("User").doc(uid).collection(url).doc("MemoImage").set({
                    imageCount: 0
                }).then(function() {
                    console.log("Memo Count firestore successfully added");
                }).catch(function(error) {
                    console.error("Error writing document: ", error);
                });
            }
        });

        // url에 image 를 추가하고 해당 url의 memocount를 늘려줌
        var ptro = Painterro({
            saveHandler : function(image,done){
                //TODO: User 인식 후 storage directory 변경해주기
                //TODO: storage directory 변경 후 metadata도 firestore에 저장 해주어야할듯
                var dataUrl = image.asDataURL();
                var blob = dataURItoBlob(dataUrl);

                //metadata에 x,y좌표 초기화 : (0,0)
                //각각의 url에서 image는 1번부터 시작 ex) image1.png ...
                database.collection("User").doc(uid).collection(url).doc("MemoImage").get().then(function(doc){
                        console.log("value : "+doc.data().imageCount);
                        var image_data_num = doc.data().imageCount+1;
                        database.collection("User").doc(uid).collection(url).doc("MemoImage").set({
                            imageCount: image_data_num
                        }).then(function() {
                            console.log("Document successfully written!");
                            var imagePath = uid +'/'+url+'/'+'image'+image_data_num+'.png';
                            var dataRef = storage_ref.child(imagePath);
                            var posMetadata = {
                                customMetadata: {
                                    'x':0,
                                    'y':0
                                }
                            };
                            dataRef.put(blob).then(function (snapshot) {
                                console.log("uploaded a file!");
                                done(true);
                                dataRef.updateMetadata(posMetadata).then(function(metadata){
                                    console.log("meta data pos : 0,0");
                                }).catch(function(error){
                                });
                            });


                        }).catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
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