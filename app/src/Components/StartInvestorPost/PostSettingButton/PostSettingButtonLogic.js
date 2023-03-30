import getApi from '../../../Utils/Api/getApi';

const UpdateSettingButtonLogic = async (data) => {
    return await getApi.post('/getData/modSubArtShare', data);
};

const GetPostSettingButtonLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/sharePost', data);
};

export { GetPostSettingButtonLogic, UpdateSettingButtonLogic };