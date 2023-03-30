import getApi from '../../Utils/Api/getApi';

const getDataLogic = async () => {
    return await getApi.get('/all_investor');
};
const getRecommendLogic = async (tag) => {
    console.log(tag, "00")
    return await getApi.post('/recommend_investor', tag);
};
export { getDataLogic, getRecommendLogic };
