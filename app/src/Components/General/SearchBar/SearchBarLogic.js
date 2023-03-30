import getApi from '../../../Utils/Api/getApi';
const getDataLogic = async (data) => {
    return await getApi.post('/article/get-search', data);
};
const getSearch = async (data) => {
    return await getApi.post('/search_investor', data);
};
export { getDataLogic, getSearch };
