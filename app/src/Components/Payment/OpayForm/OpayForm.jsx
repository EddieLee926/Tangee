import React from 'react';

const crypto = require('crypto');

const merchantID = "2000132"  //店家編號
const hashKey = "5294y06JbISpM5x9"
const hashIV = "v77hoKGq4kWxNNIS"

//當下時間產生器
const onTimeValue = function () {
    var date = new Date();
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    var hh = date.getHours();
    var mi = date.getMinutes();
    var ss = date.getSeconds();

    return [date.getFullYear(), "/" +
        (mm > 9 ? '' : '0') + mm, "/" +
        (dd > 9 ? '' : '0') + dd, " " +
        (hh > 9 ? '' : '0') + hh, ":" +
        (mi > 9 ? '' : '0') + mi, ":" +
        (ss > 9 ? '' : '0') + ss
    ].join('');
};

//亂數產生器
const randomValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//訂單編號產生器(編號不能重複)
const MerchantTradeNo = randomValue(10, 99) + "1234567890234567" + randomValue(10, 99)

const generateCheckMacValue = (data, hashKey, hashIV) => {
    const keys = Object.keys(data).sort();
    let checkValue = '';
    for (const key of keys) { checkValue += `${key}=${data[key]}&` }

    checkValue = `HashKey=${hashKey}&${checkValue}HashIV=${hashIV}`; // There is already an & in the end of checkValue
    checkValue = encodeURIComponent(checkValue).toLowerCase();
    checkValue = checkValue.replace(/%20/g, '+')
        .replace(/%2d/g, '-')
        .replace(/%5f/g, '_')
        .replace(/%2e/g, '.')
        .replace(/%21/g, '!')
        .replace(/%2a/g, '*')
        .replace(/%28/g, '(')
        .replace(/%29/g, ')');

    checkValue = crypto.createHash('sha256').update(checkValue).digest('hex');
    checkValue = checkValue.toUpperCase();
    return checkValue;
}

const OpayForm = ({paymentInfo,id}) =>{
    const data = {
        TradeDesc: "訂閱費用",
        PaymentType: "aio",
        MerchantTradeDate: onTimeValue(),
        MerchantTradeNo: MerchantTradeNo,
        MerchantID: merchantID,
        ReturnURL: "https://developers.opay.tw/AioMock/MerchantReturnUrl",
        ClientBackURL: `http://localhost:3000/star-investor-details/${id}`,
        ItemName: `${paymentInfo.nick_name}明星投資者訂閱費`,
        TotalAmount: paymentInfo.sub_price,
        ChoosePayment: "Credit",
        EncryptType: 1,
        StoreID: "", //空白的參數要留，不然checkMacValue會出錯
        CreditInstallment: "",
        InstallmentAmount: "",
        Redeem: "",
    }

    return(
        <form id="formCreditCard" method="post" accept-charset="UTF-8" style={{display: "none"}}
            action="https://payment-stage.opay.tw/Cashier/AioCheckOut/V5">
            MerchantID 商店代號:
            <input type="text" name="MerchantID" value={data.MerchantID} readonly />
            MerchantTradeNo 商店交易編號:
            <input type="text" name="MerchantTradeNo" value={data.MerchantTradeNo} readonly />
            MerchantTradeDate 商店交易時間:
            <input type="text" name="MerchantTradeDate" value={data.MerchantTradeDate} readonly />
            PaymentType 交易類型:
            <input type="text" name="PaymentType" value={data.PaymentType} readonly />
            TotalAmount 交易金額:
            <input type="text" name="TotalAmount" value={data.TotalAmount} readonly />
            TradeDesc 交易描述:
            <input type="text" name="TradeDesc" value={data.TradeDesc} readonly />
            ItemName 商品名稱:
            <input type="text" name="ItemName" value={data.ItemName} readonly />
            ReturnURL 付款完成通知回傳網址:
            <input type="text" name="ReturnURL" value={data.ReturnURL} readonly />
            ChoosePayment 預設付款方式:
            <input type="text" name="ChoosePayment" value={data.ChoosePayment} readonly />
            會員商店代碼:
            <input type="text" name="StoreID" value={data.StoreID} readonly />
            ClientBackURL Client端返回廠商網址:
            <input type="text" name="ClientBackURL" value={data.ClientBackURL} readonly />
            CreditInstallment 刷卡分期期數:
            <input type="text" name="CreditInstallment" value={data.CreditInstallment} readonly />
            InstallmentAmount 使用刷卡分期的付款金額:
            <input type="text" name="InstallmentAmount" value={data.InstallmentAmount} readonly />
            Redeem 信用卡是否使用紅利折抵:
            <input type="text" name="Redeem" value={data.Redeem} readonly />
            EncryptType 簽章類型:
            <input type="text" name="EncryptType" value={data.EncryptType} readonly />
            CheckMacValue 檢查碼:
            <input type="text" name="CheckMacValue" value={generateCheckMacValue(data, hashKey, hashIV)} readonly />
            <input type="submit" value="送出訂單" />
        </form>
    )
}

export default OpayForm;