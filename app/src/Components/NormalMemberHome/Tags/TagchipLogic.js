
import getApi from '../../../Utils/Api/getApi';
const getDataLogic = async (tag) => {
        const data = { tag: tag }
        return await getApi.post('/tag_name', data);

};
export default getDataLogic;