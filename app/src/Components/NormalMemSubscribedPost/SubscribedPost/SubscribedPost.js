

import getApi from '../../../Utils/Api/getApi';
const getDataLogic = async (userid) => {
        const data = { userid: userid }
        return await getApi.post('/sub_post', data);
};
export default getDataLogic;