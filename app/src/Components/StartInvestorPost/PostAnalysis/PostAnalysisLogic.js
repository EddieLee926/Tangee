import getApi from '../../../Utils/Api/getApi';
const PostAnalysisLogic = async (userid) => {
    const data = { userid: userid }
    return await getApi.post('/post_sta', data);

};
export default PostAnalysisLogic;