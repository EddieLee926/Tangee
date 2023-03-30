import React from 'react';
import Typography from '@material-ui/core/Typography';
import SubscriberList from '../../Components/StarInvestorManagement/SubscriberList/SubscriberList.jsx';
import Revenu from '../../Components/StarInvestorManagement/Revenue/Revenu.jsx';
import SubscriberComposition from '../../Components/StarInvestorManagement/SubscriberComposition/SubscriberComposition.jsx';
import MonthlySubsNumberDataLineChart from '../../Components/StarInvestorManagement/MonthlySubsNumberDataLineChart/MonthlySubsNumberDataLineChart.jsx';
import MonthlySubsRevenueDataBarChart from '../../Components/StarInvestorManagement/MonthlySubsRevenueDataBarChart/MonthlySubsRevenueDataBarChart.jsx';
import TagPieChart from '../../Components/StarInvestorManagement/TagPieChart/TagPieChart.jsx';
import PaperBlock from '../../Components/General/PaperBlock/PaperBlock';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import style from './StarInvestorManagementStyle';

const useStyles = makeStyles(style);

const StarInvestorManagement = () => {
    const { id } = useParams();
    const classes = useStyles();
    return (
        <React.Fragment>
            <Typography variant='h1'>我的收益</Typography>
            <Revenu />
            <div className={classes.graphWrapper}>
                <PaperBlock className={classes.barGraph}>
                    <Typography variant='h2' align='center'>
                        庫存訂閱收益
                    </Typography>
                    <Typography
                        variant='body1'
                        align='center'
                        className={classes.timeText}
                    >
                        May 2021 - Dec 2021
                    </Typography>
                    <MonthlySubsRevenueDataBarChart id={id} />
                </PaperBlock>
                <PaperBlock className={classes.lineGraph}>
                    <Typography variant='h2' align='center'>
                        文章訂閱收益
                    </Typography>
                    <Typography
                        variant='body1'
                        align='center'
                        className={classes.timeText}
                    >
                        May 2021 - Dec 2021
                    </Typography>
                    <MonthlySubsNumberDataLineChart id={id} />
                </PaperBlock>
            </div>
            <PaperBlock className={classes.tagChartSection}>
                <div className={classes.tagChart}>
                    <TagPieChart id={id} />
                </div>
                <div className={classes.tagComposition}>
                    <SubscriberComposition />
                </div>
            </PaperBlock>
            <SubscriberList />
        </React.Fragment>
    );
};

export default StarInvestorManagement;
