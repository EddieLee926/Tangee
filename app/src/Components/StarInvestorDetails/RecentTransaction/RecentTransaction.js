
import getApi from '../../../Utils/Api/getApi';

const getDataLogic = async (data) => {

        return await getApi.post('/detail', data);
};
export default getDataLogic;