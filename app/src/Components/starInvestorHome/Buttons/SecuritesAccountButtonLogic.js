import getApi from '../../../Utils/Api/getApi';

const UpdateShareAccountStateLogic = async (data) => {
    return await getApi.post('/getData/modShareAccount', data);
};

const GetShareAccountStateLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/shareAccountState', data);
};

export { GetShareAccountStateLogic, UpdateShareAccountStateLogic };