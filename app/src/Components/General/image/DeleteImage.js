//刪除圖片(不知道什麼時候會用到，先寫~~~，可能是文章編輯器中的圖片...?)
import getApi from '../../../Utils/Api/getApi';
import React from "react";
import ReactDOM from "react-dom";

const DeleteImage = () => {
    var imgURL = "";
    //到時候會用State替換
    const data = {
        relatedID: 2,//使用者的ID
        type: 1 //1預設為大頭貼(會依據功能頁面去給值)
    };
    console.log(data);
    const deletePicture = async () => {
        try {
            const response = await getApi.post('/getData/deleteImg', data)
            alert(response.data);
        } catch (error) {
            console.log(error);
            //alert(error);
        }
    }
    //deletePicture();

    return (
        <React.Fragment>
            <div >
                <button onClick={deletePicture}>刪除</button>
            </div>
        </React.Fragment>

    );
}
export default DeleteImage;

