import getApi from '../../../Utils/Api/getApi';

const getRecommendLogic = async (data) => {
    return await getApi.post('/recommend_investor_tag', data);

};
export { getRecommendLogic };
