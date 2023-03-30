import getApi from '../../../Utils/Api/getApi';


const getSubscribedStarPost = async (data) => {

    return await getApi.post('/subscribed_Star_Post', data);
};
export { getSubscribedStarPost };