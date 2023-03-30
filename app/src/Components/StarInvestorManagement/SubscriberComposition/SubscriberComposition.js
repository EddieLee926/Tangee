
import getApi from '../../../Utils/Api/getApi';
import React from 'react';
const getDataLogic = async (userid) => {
        const data = { userid: userid }
        return await getApi.post('/subs', data);
};
export default getDataLogic;