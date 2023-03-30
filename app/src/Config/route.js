import React from 'react';
import Home from '../Containers/Home';
import Inventory from '../Containers/Inventory';
import InventoryReceipt from '../Containers/InventroyReceipt';
import Remark from '../Containers/InventroyReceipt/Remark';
import LogIn from '../Containers/LogIn';
import NormalMemberHome from '../Containers/NormalMemberHome';
import UpdateItem from '../Containers/NormalMemberHome/UpdateItem';
import NormalMemSubscribedPost from '../Containers/NormalMemSubscribedPost';
import NormalMemSubscribedStarInvest from '../Containers/NormalMemSubscribedStarInvest';
import NormalMemSubscribedComposition from '../Containers/NormalMemSubscribedComposition';
import Payment from '../Containers/Payment/Payment';
import PostPayment from '../Containers/Payment/PostPayment';
import SinglePostPayment from '../Containers/Payment/SinglePostPayment';
import PopularPost from '../Containers/PopularPost';
import PostPage from '../Containers/PostPage';
import Register from '../Containers/Register';
import Register2 from '../Containers/Register/Register2';
import RegisterChoose from '../Containers/Register/RegisterChoose';
import SearchStarInvestor from '../Containers/SearchStarInvestor';
import StarInvestorDetails from '../Containers/StarInvestorDetails';
import StarInvestorHome from '../Containers/StarInvestorHome';
import StarInvestorManagement from '../Containers/StarInvestorManagement';
import StarInvestorPost from '../Containers/StarInvestorPost';
import InsertPost from '../Containers/StarInvestorWritePost/InsertPost';
import StarInvestorWritePost from '../Containers/StarInvestorWritePost';
import StarInvestorComposition from '../Containers/StarInvestorComposition';
import StarInvestorInventory from '../Containers/StarInvestorInventory';
import StockDetail from '../Containers/StockDetail';
import EditStockDetail from '../Containers/EditStockDetail';

export const PAGE_KEYS = {
    HOME: 'HOME',
    INVENTORY: 'INVENTORY',
    INVENTORY_RECEIPT: 'INVENTORY_RECEIPT',
    REMARK: 'REMARK',
    LON_IN: 'LOG_IN',
    NORMAL_MEMBER_HOME: 'NORMAL_MEMBER_HOME',
    UPDATEITEM: 'UPDATEITEM',
    NORMAL_MEMBER_SUBSCRIBED_POST: 'NORMAL_MEMBER_SUBSCRIBED_POST',
    NORMAL_MEMBER_SUBSCRIBED_STARINVEST: 'NORMAL_MEMBER_SUBSCRIBED_STARINVEST',
    NORMAL_MEMBER_SUBSCRIBED_COMPOSITION: 'NORMAL_MEMBER_SUBSCRIBED_COMPOSITION',
    PAYMENT: 'PAYMENT',
    POSTPAYMENT: 'POSTPAYMENT',
    SINGLEPOSTPAYMENT: 'SINGLEPOSTPAYMENT',
    POPULAR_POST: 'POPULAR_POST',
    POST_PAGE: 'POST_PAGE',
    STOCK_DETAIL: 'STOCK_DETAIL',
    REGISTER: 'REGISTER',
    REGISTER2: 'REGISTER2',
    REGISTERCHOOSE: 'REGISTERCHOOSE',
    SEARCH_STAR_INVESTOR: 'SEARCH_STAR_INVESTOR',
    STAR_INVESTOR_COMPOSITION: 'STAR_INVESTOR_COMPOSITION',
    STAR_INVESTOR_INVENTORY: 'STAR_INVESTOR_INVENTORY',
    STAR_INVESTOR_ASSESSMENT: 'STAR_INVESTOR_ASSESSMENT',
    STAR_INVESTOR_DETAILS: 'STAR_INVESTOR_DETAILS',
    STAR_INVESTOR_HOME: 'STAR_INVESTOR_HOME',
    STAR_INVESTOR_MANAGEMENT: 'STAR_INVESTOR_MANAGEMENT',
    STAR_INVESTOR_POST: 'STAR_INVESTOR_POST',
    STAR_INVESTOR_WRITE_POST: 'STAR_INVESTOR_WRITE_POST',
    STAR_INVESTOR_INSERT_POST: 'STAR_INVESTOR_INSERT_POST',
    STAR_INVESTOR_WEITE_STOCK_DETAIL: 'STAR_INVESTOR_WEITE_STOCK_DETAIL',
};

export const PAGE_PATHS = {
    [PAGE_KEYS.HOME]: '/',
    [PAGE_KEYS.INVENTORY]: '/inventory',
    [PAGE_KEYS.INVENTORY_RECEIPT]: '/inventory/receipt',
    [PAGE_KEYS.REMARK]: '/remark',
    [PAGE_KEYS.LON_IN]: '/login',
    [PAGE_KEYS.NORMAL_MEMBER_HOME]: '/normal/home',
    [PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_POST]: '/inventory/subscribed-post',
    [PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_STARINVEST]:
        '/inventory/subscribed-star-investor',
    [PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_COMPOSITION]: '/inventory/subscribed-composition',
    [PAGE_KEYS.PAYMENT]: '/payment/:id',
    [PAGE_KEYS.POSTPAYMENT]: '/postpayment/:id',
    [PAGE_KEYS.SINGLEPOSTPAYMENT]: '/singlepostpayment/:postId',
    [PAGE_KEYS.UPDATEITEM]: '/update_item',
    [PAGE_KEYS.POPULAR_POST]: '/popular-post',
    [PAGE_KEYS.POST_PAGE]: '/post-page/:PostId',
    [PAGE_KEYS.STOCK_DETAIL]: '/inventory/stock_detail/:starID/:stock',
    [PAGE_KEYS.REGISTER]: '/register',
    [PAGE_KEYS.REGISTER2]: '/register2',
    [PAGE_KEYS.REGISTERCHOOSE]: '/registerchoose',
    [PAGE_KEYS.SEARCH_STAR_INVESTOR]: '/search-star-investor',
    [PAGE_KEYS.STAR_INVESTOR_ASSESSMENT]: 'star-investor-assessment',
    [PAGE_KEYS.STAR_INVESTOR_DETAILS]: '/star-investor-details/:id',
    [PAGE_KEYS.STAR_INVESTOR_HOME]: '/star/home',
    [PAGE_KEYS.STAR_INVESTOR_MANAGEMENT]: '/star/management',
    [PAGE_KEYS.STAR_INVESTOR_POST]: '/star/post',
    [PAGE_KEYS.STAR_INVESTOR_WRITE_POST]: '/star/write-post/:PostId',
    [PAGE_KEYS.STAR_INVESTOR_INSERT_POST]: '/star/insert-post',
    [PAGE_KEYS.STAR_INVESTOR_COMPOSITION]: '/star/composition',
    [PAGE_KEYS.STAR_INVESTOR_INVENTORY]: '/star/inventory',
    [PAGE_KEYS.STAR_INVESTOR_WEITE_STOCK_DETAIL]: '/star/write-stock-detail/:stock',
};

export const AUTH = {
    NOT_REQUIRED: 'NOT_REQUIRED',
    NORMAL_MEMBER: 'NORMAL_MEMBER',
    STAR_INVESTOR: 'STAR_INVESTOR',
    BOTH_ACCESSIBLE: 'BOTH_ACCESSIBLE',
};

export const ROUTE_NAME = {
    STAR: 'star',
    NORMAL: 'normal',
};

export const publicRoutes = [
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.HOME],
        key: PAGE_KEYS.HOME,
        auth: AUTH.NOT_REQUIRED,
        component: <Home />,
    },
    {
        title: '詳細說明',
        path: PAGE_PATHS[PAGE_KEYS.REMARK],
        key: PAGE_KEYS.REMARK,
        auth: AUTH.NOT_REQUIRED,
        component: <Remark />,
    },
    {
        title: '登入',
        path: PAGE_PATHS[PAGE_KEYS.LON_IN],
        key: PAGE_KEYS.LON_IN,
        auth: AUTH.NOT_REQUIRED,
        component: <LogIn />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.PAYMENT],
        key: PAGE_KEYS.PAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <Payment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POSTPAYMENT],
        key: PAGE_KEYS.POSTPAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <PostPayment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.SINGLEPOSTPAYMENT],
        key: PAGE_KEYS.SINGLEPOSTPAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <SinglePostPayment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POPULAR_POST],
        key: PAGE_KEYS.POPULAR_POST,
        auth: AUTH.NOT_REQUIRED,
        component: <PopularPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POST_PAGE],
        key: PAGE_KEYS.POST_PAGE,
        auth: AUTH.NOT_REQUIRED,
        component: <PostPage />,
    },
    {
        title: '註冊',
        path: PAGE_PATHS[PAGE_KEYS.REGISTER],
        key: PAGE_KEYS.REGISTER,
        auth: AUTH.NOT_REQUIRED,
        component: <Register />,
    },
    {
        title: '註冊2',
        path: PAGE_PATHS[PAGE_KEYS.REGISTER2],
        key: PAGE_KEYS.REGISTER2,
        auth: AUTH.NOT_REQUIRED,
        component: <Register2 />,
    },
    {
        title: '註冊選擇',
        path: PAGE_PATHS[PAGE_KEYS.REGISTERCHOOSE],
        key: PAGE_KEYS.REGISTERCHOOSE,
        auth: AUTH.NOT_REQUIRED,
        component: <RegisterChoose />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.SEARCH_STAR_INVESTOR],
        key: PAGE_KEYS.SEARCH_STAR_INVESTOR,
        auth: AUTH.NOT_REQUIRED,
        component: <SearchStarInvestor />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_DETAILS],
        key: PAGE_KEYS.STAR_INVESTOR_DETAILS,
        auth: AUTH.NOT_REQUIRED,
        component: <StarInvestorDetails />,
    },
];

export const bothRoutes = [
    {
        title: '庫存',
        path: PAGE_PATHS[PAGE_KEYS.INVENTORY],
        key: PAGE_KEYS.INVENTORY,
        auth: AUTH.BOTH_ACCESSIBLE,
        component: <Inventory />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STOCK_DETAIL],
        key: PAGE_KEYS.STOCK_DETAIL,
        auth: AUTH.NOT_REQUIRED,
        component: <StockDetail />,
    },
    {
        title: '明細',
        path: PAGE_PATHS[PAGE_KEYS.INVENTORY_RECEIPT],
        key: PAGE_KEYS.INVENTORY_RECEIPT,
        auth: AUTH.BOTH_ACCESSIBLE,
        component: <InventoryReceipt />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_COMPOSITION],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_COMPOSITION,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedComposition />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_POST],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_POST,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_STARINVEST],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_STARINVEST,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedStarInvest />,
    },
];

export const starRoutes = [
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_HOME],
        key: PAGE_KEYS.STAR_INVESTOR_HOME,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorHome />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_MANAGEMENT],
        key: PAGE_KEYS.STAR_INVESTOR_MANAGEMENT,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorManagement />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_POST],
        key: PAGE_KEYS.STAR_INVESTOR_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_WRITE_POST],
        key: PAGE_KEYS.STAR_INVESTOR_WRITE_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorWritePost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_INSERT_POST],
        key: PAGE_KEYS.STAR_INVESTOR_INSERT_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <InsertPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_COMPOSITION],
        key: PAGE_KEYS.STAR_INVESTOR_COMPOSITION,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorComposition />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_INVENTORY],
        key: PAGE_KEYS.STAR_INVESTOR_INVENTORY,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorInventory />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_WEITE_STOCK_DETAIL],
        key: PAGE_KEYS.STAR_INVESTOR_WEITE_STOCK_DETAIL,
        auth: AUTH.STAR_INVESTOR,
        component: <EditStockDetail />,
    },
];

export const normalRoutes = [
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_HOME],
        key: PAGE_KEYS.NORMAL_MEMBER_HOME,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemberHome />,
    },
];

export const routes = [
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.HOME],
        key: PAGE_KEYS.HOME,
        auth: AUTH.NOT_REQUIRED,
        component: <Home />,
    },
    {
        title: '庫存',
        path: PAGE_PATHS[PAGE_KEYS.INVENTORY],
        key: PAGE_KEYS.INVENTORY,
        auth: AUTH.BOTH_ACCESSIBLE,
        component: <Inventory />,
    },
    {
        title: '明細',
        path: PAGE_PATHS[PAGE_KEYS.INVENTORY_RECEIPT],
        key: PAGE_KEYS.INVENTORY_RECEIPT,
        auth: AUTH.BOTH_ACCESSIBLE,
        component: <InventoryReceipt />,
    },
    {
        title: '詳細說明',
        path: PAGE_PATHS[PAGE_KEYS.REMARK],
        key: PAGE_KEYS.REMARK,
        auth: AUTH.NOT_REQUIRED,
        component: <Remark />,
    },
    {
        title: '登入',
        path: PAGE_PATHS[PAGE_KEYS.LON_IN],
        key: PAGE_KEYS.LON_IN,
        auth: AUTH.NOT_REQUIRED,
        component: <LogIn />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_HOME],
        key: PAGE_KEYS.NORMAL_MEMBER_HOME,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemberHome />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.UPDATEITEM],
        key: PAGE_KEYS.UPDATEITEM,
        auth: AUTH.NORMAL_MEMBER,
        component: <UpdateItem />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_POST],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_POST,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_STARINVEST],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_STARINVEST,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedStarInvest />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_COMPOSITION],
        key: PAGE_KEYS.NORMAL_MEMBER_SUBSCRIBED_COMPOSITION,
        auth: AUTH.NORMAL_MEMBER,
        component: <NormalMemSubscribedComposition />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.PAYMENT],
        key: PAGE_KEYS.PAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <Payment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POSTPAYMENT],
        key: PAGE_KEYS.POSTPAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <PostPayment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.SINGLEPOSTPAYMENT],
        key: PAGE_KEYS.SINGLEPOSTPAYMENT,
        auth: AUTH.NOT_REQUIRED,
        component: <SinglePostPayment />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POPULAR_POST],
        key: PAGE_KEYS.POPULAR_POST,
        auth: AUTH.NOT_REQUIRED,
        component: <PopularPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.POST_PAGE],
        key: PAGE_KEYS.POST_PAGE,
        auth: AUTH.NOT_REQUIRED,
        component: <PostPage />,
    },

    {
        title: '註冊',
        path: PAGE_PATHS[PAGE_KEYS.REGISTER],
        key: PAGE_KEYS.REGISTER,
        auth: AUTH.NOT_REQUIRED,
        component: <Register />,
    },
    {
        title: '註冊2',
        path: PAGE_PATHS[PAGE_KEYS.REGISTER2],
        key: PAGE_KEYS.REGISTER2,
        auth: AUTH.NOT_REQUIRED,
        component: <Register2 />,
    },
    {
        title: '註冊選擇',
        path: PAGE_PATHS[PAGE_KEYS.REGISTERCHOOSE],
        key: PAGE_KEYS.REGISTERCHOOSE,
        auth: AUTH.NOT_REQUIRED,
        component: <RegisterChoose />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.SEARCH_STAR_INVESTOR],
        key: PAGE_KEYS.SEARCH_STAR_INVESTOR,
        auth: AUTH.NOT_REQUIRED,
        component: <SearchStarInvestor />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_DETAILS],
        key: PAGE_KEYS.STAR_INVESTOR_DETAILS,
        auth: AUTH.NOT_REQUIRED,
        component: <StarInvestorDetails />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_HOME],
        key: PAGE_KEYS.STAR_INVESTOR_HOME,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorHome />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_MANAGEMENT],
        key: PAGE_KEYS.STAR_INVESTOR_MANAGEMENT,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorManagement />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_POST],
        key: PAGE_KEYS.STAR_INVESTOR_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorPost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_WRITE_POST],
        key: PAGE_KEYS.STAR_INVESTOR_WRITE_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorWritePost />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_INSERT_POST],
        key: PAGE_KEYS.STAR_INVESTOR_INSERT_POST,
        auth: AUTH.STAR_INVESTOR,
        component: <InsertPost />,
    },

    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_INVENTORY],
        key: PAGE_KEYS.STAR_INVESTOR_INVENTORY,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorInventory />,
    },
    {
        title: 'Tangee',
        path: PAGE_PATHS[PAGE_KEYS.STAR_INVESTOR_COMPOSITION],
        key: PAGE_KEYS.STAR_INVESTOR_COMPOSITION,
        auth: AUTH.STAR_INVESTOR,
        component: <StarInvestorComposition />,
    },
];
