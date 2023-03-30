import getApi from '../../../Utils/Api/getApi';
const PostStatisticsLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/post_ana', data);

};
export default PostStatisticsLogic;