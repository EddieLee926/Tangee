import getApi from '../../../Utils/Api/getApi';

const SetSubscribedAmountLogic = async (data) => {
    return await getApi.post('/getData/modSubAmount', data);
};

const GetSubscribedAmountLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/sub_price', data);
};

export { GetSubscribedAmountLogic, SetSubscribedAmountLogic };