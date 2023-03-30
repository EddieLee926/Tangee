//標明版本
pragma solidity >=0.8.0;
pragma abicoder v2;

//定義合約
contract PublicInvestmentDataSharingPlatform {
    //定義結構(類似於定義一個類別clasee,讓之後好調用)
    struct ShareSecuritiesAccountProperty {
        bool sharedStatus; //分享狀態
        string month; //從哪一個年月上傳投資績效(格式:yyyyMM)
        uint256 subscribeAmount; //訂閱金額(新台幣)
    }
    address regulatoryAuthority;

    //根據brokerId(證券商代號)(第一個string)、securitiesAccount(證券帳號)(第二個string)去找到brokerIdAddress(以太坊帳戶)(address)
    mapping(string => mapping(string => address)) brokerIdSecuritiesAccountAddress;
    //根據brokerId(證券商代號)(第一個string)、securitiesAccount(證券帳號)(第二個string)去找到ShareSecuritiesAccountProperty(然後調用裡面的變數)
    mapping(string => mapping(string => ShareSecuritiesAccountProperty)) shareAccount;
    //根據明星投資者(證券帳號)、使用者(證券帳號)去看是否訂閱
    mapping(string => mapping(string => bool)) subscribeStarInvestor;

    //定義[分享證券帳號]函式所會觸發的事件
    event securitiesAccountShared(
        string brokerId,
        string securitiesAccount,
        string month,
        bool sharedStatus,
        uint256 time
    );

    //定義[取消分享證券帳號]函式所會觸發的事件
    event securitiesAccountCanceled(
        string brokerId,
        string securitiesAccount,
        bool sharedStatus,
        uint256 time
    );

    //定義[更新分享證券訂閱金額]函式所會觸發的事件
    event securitiesAccountSubscribeAmountUpdated(
        string brokerId,
        string securitiesAccount,
        uint256 subscribeAmount
    );

    //定義[訂閱證券帳號]函式所會觸發的事件
    event shareSecuritiesAccountSubscribed(
        string subscribeBrokerId,
        string subscriberSecuritiesAccount,
        string shareBrokerId,
        string shareSecuritiesAccount,
        string startDate,
        string dueDate,
        uint256 totalSubscribeAmount
    );
    //定義[取消訂閱證券帳號]函式所會觸發的事件
    event cancelShareSecuritiesAccountSubscribed(
        string subscribeBrokerId,
        string subscriberSecuritiesAccount,
        string shareBrokerId,
        string shareSecuritiesAccount,
        string startDate
    );
    //定義[上傳證券帳號投資績效統計數據]函式所會觸發的事件
    event shareSecuritiesAccountInvestmentPerformanceUploaded(
        string brokerId,
        string securitiesAccount,
        string date,
        string monthROI,
        string averageHoldingTime,
        string averageProfit,
        string averageLoss,
        string winPercentage
    );
    //定義[上傳證券帳號股票庫存]函式所會觸發的事件
    event shareSecuritiesAccountInvestmentInventoryUploaded(
        string brokerId,
        string securitiesAccount,
        string stockId,
        int256 numberOfShares
    );

    //定義constructor
    constructor() public {
        //取的當前調用者的address
        regulatoryAuthority = msg.sender;
    }

    function getAccountProperty(
        string memory _brokerId,
        string memory _securitiesAccount
    ) public view returns (ShareSecuritiesAccountProperty memory _property) {
        return shareAccount[_brokerId][_securitiesAccount];
    }

    //註冊以太坊帳戶
    //傳入參數:brokerId(證券商代號)、securitiesAccount(證券帳號)、brokerIdAddress(以太坊帳戶)
    //require:需再次確認當前調用者的address是否為當初在constructor裡的address,若不是則返回錯誤訊息
    //若是則將brokerId(證券商代號)裡的securitiesAccount(證券帳號)跟brokerIdAddress(以太坊帳戶)的地址進行綁定
    //交由監管機構設定  broker ethereum address
    function registerBrokerIdSecuritiesAccountAddress(
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

    //分享證券帳號
    //傳入參數:brokerId(分享者證券商代號)、securitiesAccount(分享者證券帳號)、month(從哪一個年月上傳投資績效(格式:yyyyMM))、subscribeAmount(訂閱金額)
    //require1:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址),若不是則返回錯誤訊息
    //require2:需確認當前調用者(欲分享帳號)的分享狀態是否為false,若不是則返回錯誤訊息
    //若是則1.將此欲分享證券帳號的分享狀態設定為True、2.設定欲分享證券帳號是從哪一年月開始上傳 3.設定欲分享證券帳號的訂閱金額
    //並觸發事件securitiesAccountShared
    //須由欲分享證券帳號的證券商進行調用
    function shareSecuritiesAccount(
        string memory _brokerId,
        string memory _securitiesAccount,
        string memory _month
    ) public {
        require(
            brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
                msg.sender,
            "You are not the broker of the securities account,[shareSecuritiesAccount] Error."
        );
        require(
            shareAccount[_brokerId][_securitiesAccount].sharedStatus == false,
            "shared status of securities account must be false,[shareSecuritiesAccount] Error."
        );

        shareAccount[_brokerId][_securitiesAccount].sharedStatus = true;
        shareAccount[_brokerId][_securitiesAccount].month = _month;

        emit securitiesAccountShared(
            _brokerId,
            _securitiesAccount,
            _month,
            true, //分享狀態
            block.timestamp //時間戳
        );
    }

    //取消分享證券帳號
    //傳入參數:brokerId(分享者證券商代號)、securitiesAccount(分享者證券帳號)
    //require1:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址),若不是則返回錯誤訊息
    //require2:需確認當前調用者(欲分享帳號)的分享狀態是否為True,若不是則返回錯誤訊息
    //若是則1.將此欲分享證券帳號的分享狀態設定為False、2.設定欲分享證券帳號的訂閱金額為0
    //並觸發事件securitiesAccountCanceled
    //須由欲取消分享證券帳號的證券商進行調用
    function cancelShareSecuritiesAccount(
        string memory _brokerId,
        string memory _securitiesAccount
    ) public {
        require(
            brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
                msg.sender,
            "You are not the broker of the securities account,[cancelShareSecuritiesAccount] Error."
        );
        require(
            shareAccount[_brokerId][_securitiesAccount].sharedStatus == true,
            "shared status of securities account must be true,[cancelShareSecuritiesAccount] Error."
        );

        shareAccount[_brokerId][_securitiesAccount].sharedStatus = false;
        shareAccount[_brokerId][_securitiesAccount].subscribeAmount = 0;

        emit securitiesAccountCanceled(
            _brokerId,
            _securitiesAccount,
            false,
            block.timestamp
        );
    }

    //更新分享證券訂閱金額
    //傳入參數:brokerId(分享者證券商代號)、securitiesAccount(分享者證券帳號)、subscribeAmount(訂閱金額)
    //require1:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址),若不是則返回錯誤訊息
    //require2:需確認當前調用者(欲分享帳號)的分享狀態是否為True,若不是則返回錯誤訊息
    //若是則1.更新欲分享證券帳號的訂閱金額
    //並觸發事件securitiesAccountSubscribeAmountUpdated
    //須由欲分享證券帳號的證券商進行調用
    function updateShareSecuritiesAccountSubscribeAmount(
        string memory _brokerId,
        string memory _securitiesAccount,
        uint256 _subscribeAmount
    ) public {
        require(
            brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
                msg.sender,
            "You are not the broker of the securities account,[updateShareSecuritiesAccountSubscribeAmount] Error."
        );
        require(
            shareAccount[_brokerId][_securitiesAccount].sharedStatus == true,
            "shared status of securities account must be true,[updateShareSecuritiesAccountSubscribeAmount] Error."
        );

        shareAccount[_brokerId][_securitiesAccount]
            .subscribeAmount = _subscribeAmount;

        emit securitiesAccountSubscribeAmountUpdated(
            _brokerId,
            _securitiesAccount,
            _subscribeAmount
        );
    }

    //訂閱證券帳號
    //傳入參數:subscribeBrokerId(訂閱者證券商代號)、subscriberSecuritiesAccount(訂閱者證券商代號)、shareBrokerId(分享者證券商代號)、shareSecuritiesAccount(分享者證券代號)
    //、startDate(訂閱起始日期(格式:yyyyMMdd))、dueDate(訂閱結束日期(格式:yyyyMMdd))、totalSubscribeAmount(總訂閱金額)
    //require:需確認欲訂閱之分享者之分享狀態是否為Trur,若不是則跳出錯誤訊息
    //若是則觸發執行事件shareSecuritiesAccountSubscribed
    //須由訂閱者所在的券商的以太坊帳戶進行調用
    function subscribeShareSecuritiesAccount(
        string memory _subscribeBrokerId,
        string memory _subscriberSecuritiesAccount,
        string memory _shareBrokerId,
        string memory _shareSecuritiesAccount,
        string memory _startDate,
        string memory _dueDate,
        uint256 _totalSubscribeAmount
    ) public {
        require(
            shareAccount[_shareBrokerId][_shareSecuritiesAccount]
                .sharedStatus == true,
            "shared status of securities account must be true,[subscribeShareSecuritiesAccount] Error."
        );

        subscribeStarInvestor[_subscriberSecuritiesAccount][
            _shareSecuritiesAccount
        ] = true;

        emit shareSecuritiesAccountSubscribed(
            _subscribeBrokerId,
            _subscriberSecuritiesAccount,
            _shareBrokerId,
            _shareSecuritiesAccount,
            _startDate,
            _dueDate,
            _totalSubscribeAmount
        );
    }

    //取消訂閱證券帳號
    //傳入參數:subscribeBrokerId(訂閱者證券商代號)、subscriberIdHash(訂閱者身分證)、shareBrokerId(分享者證券商代號)、shareSecuritiesAccount(分享者證券代號)
    //、startDate(訂閱起始日期(格式:yyyyMMdd))、dueDate(訂閱結束日期(格式:yyyyMMdd))、totalSubscribeAmount(總訂閱金額)
    //require:需確認欲訂閱之分享者之分享狀態是否為Trur,若不是則跳出錯誤訊息
    //若是則觸發執行事件shareSecuritiesAccountSubscribed
    //須由訂閱者所在的券商的以太坊帳戶進行調用
    function cancelSubscribeShareSecuritiesAccount(
        string memory _subscribeBrokerId,
        string memory _subscriberSecuritiesAccount,
        string memory _shareBrokerId,
        string memory _shareSecuritiesAccount,
        string memory _startDate
    ) public {
        require(
            subscribeStarInvestor[_subscriberSecuritiesAccount][
                _shareSecuritiesAccount
            ] == true,
            "Error : You didn't subscribe before"
        );

        subscribeStarInvestor[_subscriberSecuritiesAccount][
            _shareSecuritiesAccount
        ] = false;

        emit cancelShareSecuritiesAccountSubscribed(
            _subscribeBrokerId,
            _subscriberSecuritiesAccount,
            _shareBrokerId,
            _shareSecuritiesAccount,
            _startDate
        );
    }

    //上傳證券帳號投資績效統計數據
    //傳入參數:brokerId(分享者證券商代號)、securitiesAccount(分享者證券帳號)、date(日期(格式:yyyyMM))、monthROI(每月績效報酬率(單位:%))
    //averageHoldingTime(平均每筆交易持有時間(單位:天))、averageProfit(平均獲利金額(新台幣))、averageLoss(平均虧損金額(新台幣))、winPercentage(勝率(單位:%))
    //require1:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址),若不是則返回錯誤訊息
    //require2:需確認當前調用者(欲分享帳號)的分享狀態是否為True,若不是則返回錯誤訊息
    //若是則觸發事件shareSecuritiesAccountInvestmentPerformanceUploade
    //須由欲分享證券帳號的證券商進行調用
    function uploadShareSecuritiesAccountInvestmentPerformance(
        string memory _brokerId,
        string memory _securitiesAccount,
        string memory date,
        string memory _monthROI,
        string memory _averageHoldingTime,
        string memory _averageProfit,
        string memory _averageLoss,
        string memory _winPercentage
    ) public {
        require(
            brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
                msg.sender,
            "You are not the broker of the securities account,[uploadShareSecuritiesAccountInvestmentPerformance] Error."
        );
        require(
            shareAccount[_brokerId][_securitiesAccount].sharedStatus == true,
            "shared status of securities account must be true,[uploadShareSecuritiesAccountInvestmentPerformance] Error."
        );

        emit shareSecuritiesAccountInvestmentPerformanceUploaded(
            _brokerId,
            _securitiesAccount,
            date,
            _monthROI,
            _averageHoldingTime,
            _averageProfit,
            _averageLoss,
            _winPercentage
        );
    }

    //上傳證券帳號股票庫存
    //傳入參數:brokerId(分享者券商代號)、securitiesAccount(分享者證券帳號)、stockId(股票代號)、numberOfShares(數量(單位:股))
    //require1:需再次確認當前調用者的address是否為註冊過的帳號的address(透過證券商下的證券帳號的以太坊帳戶地址),若不是則返回錯誤訊息
    //require2:需確認當前調用者(欲分享帳號)的分享狀態是否為True,若不是則返回錯誤訊息
    //若是則觸發執行事件(shareSecuritiesAccountInvestmentInventoryUploaded)
    //此函式須由分享者的券商來調用
    // function uploadShareSecuritiesAccountInvestmentInventory(
    //     string memory _brokerId,
    //     string memory _securitiesAccount,
    //     string memory _stockId,
    //     int256 _numberOfShares
    // ) public {
    //     require(
    //         brokerIdSecuritiesAccountAddress[_brokerId][_securitiesAccount] ==
    //             msg.sender,
    //         "You are not the broker of the securities account,[uploadShareSecuritiesAccountInvestmentInventory] Error."
    //     );
    //     require(
    //         shareAccount[_brokerId][_securitiesAccount].sharedStatus == true,
    //         "shared status of securities account must be true,[uploadShareSecuritiesAccountInvestmentInventory] Error."
    //     );

    //     emit shareSecuritiesAccountInvestmentInventoryUploaded(
    //         _brokerId,
    //         _securitiesAccount,
    //         _stockId,
    //         _numberOfShares
    //     );
    // }
}
