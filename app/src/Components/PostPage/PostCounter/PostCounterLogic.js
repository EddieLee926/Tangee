
import getApi from '../../../Utils/Api/getApi';
import React from 'react';
const getDataLogic = async (postId) => {
        const data = { postId: postId }
        return await getApi.post('/getData/post_view', data);

};
export default getDataLogic;