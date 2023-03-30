import getApi from '../../../Utils/Api/getApi';

const UpdateSubscribeStateLogic = async (data) => {
    return await getApi.post('/getData/cancelSubscribeState', data);
};
const UpdateSubscribePostStateLogic = async (data) => {
    return await getApi.post('/getData/cancelSubscribePostState', data);
};

const UpdateSubscribeSinglePostStateLogic = async (data) => {
    return await getApi.post('/getData/cancelSubscribeSinglePostState', data);
};

// const GetSubscribeStateLogic = async (userid) => {
//     const data = { userid: userid }
//     return await getApi.post('/SubscribeState', data);
// };

export { UpdateSubscribeStateLogic, UpdateSubscribePostStateLogic, UpdateSubscribeSinglePostStateLogic };