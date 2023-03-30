import getApi from '../../../Utils/Api/getApi';

const NickNameLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/home', data);
};
export default NickNameLogic;