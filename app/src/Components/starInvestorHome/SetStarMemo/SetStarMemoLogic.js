import getApi from '../../../Utils/Api/getApi';

const SetStarMemoLogic = async (data) => {
    return await getApi.post('/getData/modStarMemo', data);
};

const GetStarMemoLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/memo', data);
};

export { SetStarMemoLogic, GetStarMemoLogic };