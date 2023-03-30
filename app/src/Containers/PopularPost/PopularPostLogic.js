import getApi from '../../Utils/Api/getApi';
import React from 'react';
const getDataLogic = async () => {
        return await getApi.get('/pop_post');
};
const getRecommend = async (tag) => {
        const data = { tag: tag }
        return await getApi.post('/recommend_post', data);
};

const getFullSubs = async () => {

        return await getApi.post('/Most_Subscribe');
};
export { getDataLogic, getRecommend, getFullSubs };