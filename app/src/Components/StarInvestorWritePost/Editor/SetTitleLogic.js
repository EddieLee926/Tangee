import getApi from '../../../Utils/Api/getApi';

const SetPostTitle = async (data) => {
        return await getApi.post('/article/update-title', data);
};


export { SetPostTitle };