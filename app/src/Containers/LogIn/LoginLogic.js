import getApi from '../../Utils/Api/getApi';

const LoginLogic = e => {

    const data = {
        account: e.target.account.value,
        password: e.target.password.value
    };

    const getResponse = async () => {
        try {
            const response = await getApi.post('/login', data)
            if (typeof response.data == "string") {
                alert(response.data);
                //重載一次頁面清空欄位(不一定要)
                window.location.replace("/login");
            } else {
                //這邊要設置取到的值給redux(但如果這樣做就要設置redux多久清空一次)
                window.location.replace("/normal-member-home");
            }
        } catch (error) {
            console.log(error);
            alert(error);
        }


    };
    getResponse();


}
export default LoginLogic;