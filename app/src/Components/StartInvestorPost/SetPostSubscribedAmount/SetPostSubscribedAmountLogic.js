import getApi from '../../../Utils/Api/getApi';

const SetPostSubscribedAmountLogic = async (data) => {
    return await getApi.post('/getData/modSubArtAmount', data);
};

const GetPostSubscribedAmountLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/sub_articleAmount', data);
};

const SetPostSingleAmountLogic = async (data) => {
    return await getApi.post('/getData/modSingleAmount', data);
};

const GetPostSingleAmountLogic = async (id) => {
    const data = { id: id }
    return await getApi.post('/single_articleAmount', data);
};


export { GetPostSubscribedAmountLogic, SetPostSubscribedAmountLogic, SetPostSingleAmountLogic, GetPostSingleAmountLogic };