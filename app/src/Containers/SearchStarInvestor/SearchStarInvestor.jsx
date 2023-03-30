import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './SearchStarInvestorStyle';
// const useStyles = makeStyles(styles);
import Typography from '@material-ui/core/Typography';
import PopularStarInvestor from '../../Components/SearchStarInvestor/PopularStarInvestor/PopularStarInvestor.jsx';
import RecommendStarInvestor from '../../Components/SearchStarInvestor/RecommendStarInvestor/RecommendStarInvestor.jsx';
import SearchBar from '../../Components/General/SearchBar/SearchBar.jsx';
import NotifyStockData from '../../Components/General/NotifyStockData/NotifyStockData.js';

const SearchStarInvestor = () => {
    // const classes = useStyles();
    return (
        <>
            <SearchBar />
            <Typography variant='h1' align='center'>
                熱門明星投資者
            </Typography>
            <PopularStarInvestor />
            <Typography variant='h1' align='center'>
                專屬推薦明星投資者
            </Typography>
            <RecommendStarInvestor />
            <NotifyStockData />
        </>
    );
};

export default SearchStarInvestor;
