import React from 'react';
import KeyVisual from '../../Components/Home/KeyVisual/KeyVisual';
import KChartBlock from '../../Components/Home/KChartBlock/KChartBlock';
import SmartPhoneBlock from '../../Components/Home/SmartPhoneBlock/SmartPhoneBlock';
import StarInvestorBlock from '../../Components/Home/StarInvestorBlock/StarInvestorBlock';
import DecentralizedBlock from '../../Components/Home/DecentralizedBlock/DecentralizedBlock';
import ArticleBlock from '../../Components/Home/ArticleBlock/ArticleBlock';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './HomeStyle';
// const useStyles = makeStyles(styles);

const Home = () => {
    // const classes = useStyles();
    return (
        <>
            <KeyVisual />
            <KChartBlock />
            <SmartPhoneBlock />
            <StarInvestorBlock />
            <ArticleBlock />
            <DecentralizedBlock />
        </>
    );
};

export default Home;
