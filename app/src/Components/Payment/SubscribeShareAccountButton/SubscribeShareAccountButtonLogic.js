import getApi from '../../../Utils/Api/getApi';

const UpdateSubscribeStateLogic = async (data) => {
    return await getApi.post('/getData/subscribeStar', data);
};
const UpdateSubscribePostStateLogic = async (data) => {
    return await getApi.post('/getData/subscribeStarPost', data);
};

const UpdateSinglePostStateLogic = async (data) => {
    return await getApi.post('/getData/subscribeSinglePost', data);
};

// const GetSubscribeStateLogic = async (userid) => {
//     const data = { userid: userid }
//     return await getApi.post('/SubscribeState', data);
// };

export { UpdateSubscribeStateLogic, UpdateSubscribePostStateLogic, UpdateSinglePostStateLogic };