import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Article from '../../Components/StarInvestorDetails/Article/Article.jsx';
import RecentTransaction from '../../Components/StarInvestorDetails/RecentTransaction/RecentTransaction.jsx';
import Performance from '../../Components/StarInvestorDetails/Performance/Performance.jsx';
import Typography from '@material-ui/core/Typography';
import ProfitBarChart from '../../Components/StarInvestorDetails/ProfitChart/ProfitBarChart.jsx';
import ProfitlineChart from '../../Components/StarInvestorDetails/ProfitChart/ProfitlineChart.jsx';
import KeyVisual from '../../Components/StarInvestorDetails/KeyVisual/KeyVisual';
import AboutMe from '../../Components/StarInvestorDetails/AboutMe/AboutMe';
import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import styles from './StarInvestorDetailsStyle';

const useStyles = makeStyles(styles);

const StarInvestorDetails = () => {
    const classes = useStyles();
    let { id } = useParams();

    return (
        <>
            <KeyVisual id={id} />
            <AboutMe userid={id} />
            <Performance userid={id} />
            <div className={classes.graphWrapper}>
                <PaperBlock className={classes.lineGraph}>
                    <Typography variant='h2' align='center'>
                        權益曲線
                    </Typography>
                    <Typography
                        variant='body1'
                        align='center'
                        className={classes.timeText}
                    >
                        May 2021 - Dec 2021
                    </Typography>
                    <ProfitlineChart id={id} />
                </PaperBlock>
                <PaperBlock className={classes.barGraph}>
                    <Typography variant='h2' align='center'>
                        每月損益
                    </Typography>
                    <Typography
                        variant='body1'
                        align='center'
                        className={classes.timeText}
                    >
                        May 2021 - Dec 2021
                    </Typography>
                    <ProfitBarChart id={id} />
                </PaperBlock>
            </div>
            <RecentTransaction id={id} />
            <Typography variant='h2'>近期文章</Typography>
            <Article id={id} />
        </>
    );
};

export default StarInvestorDetails;
