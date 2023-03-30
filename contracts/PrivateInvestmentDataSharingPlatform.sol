pragma solidity >=0.8.0;
pragma abicoder v2;

//定義合約
contract PrivateInvestmentDataSharingPlatform {
    address regulatoryAuthority;
		
		//是一種儲存數據的方法(類似dictionary的key-value找尋方法)
		//以下列的例子來說就是根據brokerId(證券商代號)(第一個string)、securitiesAccount(證券帳號)(第二個string)去找到brokerIdAddress(以太坊帳戶)(address))
    mapping(string => mapping(string => address)) brokerIdSecuritiesAccountAddress;

		//定義事件的格式，為了讓前端可以呼叫使用
    event shareSecuritiesAccountInvestmentInventoryUploaded(
        int256 _user_id,
        string _brokerId,
        string _securitiesAccount,
        string _stock,
        string _propertyKey,
        string _propertyValue,
        string _trade_mode,
        string _trade_price,
        string _update_Date,
        string _stock_name
    );

		//定義constructor 
    constructor() public {
        //取的當前調用者的address
		regulatoryAuthority = msg.sender;
    }
		//註冊以太坊帳戶
		//傳入參數:brokerId(證券商代號)、securitiesAccount(證券帳號)、brokerIdAddress(以太坊帳戶)
		//require:需再次確認當前調用者的address是否為當初在constructor裡的address，若不是則返回錯誤訊息
		//若是則將brokerId(證券商代號)裡的securitiesAccount(證券帳號)跟brokerIdAddress(以太坊帳戶)的地址進行綁定
    //須由監管機構調用函式//我個人認為是由該所屬券商進行調用
	function registerBrokerIdSecuritiesAccountAddress(
        //memory:臨時的變量，用完就移除的(類似於區域變數)
		string memory _brokerId,
        string memory _securitiesAccount,
        address _brokerIdAddress
    ) public {
        require(
            msg.sender == regulatoryAuthority,
            "You are not a regulator,[registerBrokerIdAddress] Error."
        );
        brokerIdSecuritiesAccountAddress[_brokerId][
            _securitiesAccount
        ] = address(_brokerIdAddress);
    }

		//上傳證券帳號股票庫存
		//傳入參數:brokerId(分享者券商代號)、securitiesAccount(分享者證券帳號)、stockId(股票代號)、numberOfShares(數量(單位:股))
		//require:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址)，若不是則返回錯誤訊息
		//若是則觸發執行事件(shareSecuritiesAccountInvestmentInventoryUploaded)，將brokerId(分享者券商代號)、securitiesAccount(分享者證券帳號)、
		//stockId(股票代號)、numberOfShares(股票庫存數量)進行上傳
		//此函式須由分享者的券商來調用//我個人認為是由欲分享者的以太坊帳戶
	 function uploadShareSecuritiesAccountInvestmentInventory(
        int256 _user_id,
        string memory _brokerId,
        string memory _securitiesAccount,
        string memory _stock,
        string memory _propertyKey,
        string memory _propertyValue,
        string memory _trade_mode,
        string memory _trade_price,
        string memory _update_Date,
        string memory _stock_name
    ) public {
        // require(
        //     brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
        //         msg.sender,
        //     "You are not the broker of the securities account,[uploadShareSecuritiesAccountInvestmentInventory] Error."
        // );

        emit shareSecuritiesAccountInvestmentInventoryUploaded(
            _user_id,
            _brokerId,
            _securitiesAccount,
            _stock,
            _propertyKey,
            _propertyValue,
            _trade_mode,
            _trade_price,
            _update_Date,
            _stock_name
        );
    }
}