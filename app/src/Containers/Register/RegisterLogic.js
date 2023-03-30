import getApi from '../../Utils/Api/getApi';
//差別在model中status的值
const getDataLogic = async (data) => {
        console.log(data, "trtrtr")
        return await getApi.post('/register-account', data);

};
const getDataLogic2 = async (data) => {
        console.log(data, "trtrtr")
        return await getApi.post('/register-star', data);

};

export { getDataLogic, getDataLogic2 };