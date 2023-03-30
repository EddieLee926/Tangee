import getApi from '../../../Utils/Api/getApi';

const NotifyStockDataLogic = async (data) => {
    return await getApi.post('/getData/checkNotification', data);
};
export default NotifyStockDataLogic;