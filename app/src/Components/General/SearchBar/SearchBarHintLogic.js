import getApi from '../../../Utils/Api/getApi';

const getHintLogic = async () => {
    return await getApi.post('/search_tag_hints');
};

export default { getHintLogic };