import getApi from '../../../Utils/Api/getApi';
const getDataLogic = async (userid) => {
    const data = { userid: userid };
    return await getApi.post('/performance', data);
};
export default getDataLogic;
