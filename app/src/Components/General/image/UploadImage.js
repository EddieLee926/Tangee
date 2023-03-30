//上傳圖片若資料庫已有則更新圖片(大頭貼為主，編輯器中的圖片還不太確定)
import getApi from '../../../Utils/Api/getApi';
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from '../../../Reducer/User/UserSlice';
import Typography from '@material-ui/core/Typography';


class UploadImage extends React.Component {
    state = {
        img: ""
    };
    onChange = e => {
        const file = e.target.files.item(0); // 取得選中檔案們的一個檔案
        const fileReader = new FileReader(); // FileReader為瀏覽器內建類別，用途為讀取瀏覽器選中的檔案
        fileReader.addEventListener("load", this.fileLoad);
        fileReader.readAsDataURL(file); // 讀取完檔案後，變成URL
    };
    fileLoad = e => {
        this.setState({
            img: e.target.result // 讀取到DataURL後，儲存在result裡面，指定為img
        });
    };

    submit = async () => {
        //const userID = useSelector(state => state.accounts.userID);
        console.log("上傳中，請稍等一下!")

        const data = {
            img: this.state.img,
            relatedID: this.props.id,//使用者的ID or postid
            type: this.props.type //1預設為大頭貼(會依據功能頁面去給值) 2是文章圖片
        };
        //console.log(data.img);
        try {
            const response = await getApi.post('/getData/uploadImg', data)
            alert(response.data);
        } catch (error) {
            console.log(error);
            //alert(error);
        }

    };
    render() {
        return (
            <div className="App">

                {/* <h4>圖片預覽與檔案上傳
                </h4> */}

                <input type="file" onChange={this.onChange} />
                <img width="20%" src={this.state.img} />
                <button onClick={this.submit}>上傳</button>
            </div>
        );
    }
}
export default UploadImage;


