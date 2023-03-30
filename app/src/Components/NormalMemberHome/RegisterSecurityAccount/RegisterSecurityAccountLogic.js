import getApi from '../../../Utils/Api/getApi';

const RegisterSecurityAccountLogic = async (data) => {
    return await getApi.post('/getData/register-SecurityAccount', data);
};



export { RegisterSecurityAccountLogic };