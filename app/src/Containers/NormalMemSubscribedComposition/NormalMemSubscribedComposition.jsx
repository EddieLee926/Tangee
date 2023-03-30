import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SelectBox from '../../Components/NormalMemSubscribedComposition/SelectBox/SelectBox';
// import InventorySummary from '../../Components/NormalMemSubscribedComposition/InventorySummary/InventorySummary';
import InventoryComposition from '../../Components/NormalMemSubscribedComposition/InventoryComposition/InventoryComposition';
import InventoryDonutChart from '../../Components/Inventory/InventoryDonutChart/InventoryDonutChart.jsx';
import styles from './NormalMemSubscribedCompositionStyle';
import CompositionTable from './CompositionTable.jsx';
const useStyles = makeStyles(styles);

const NormalMemSubscribedComposition = () => {
    const classes = useStyles();
    const [starId, setStartId] = useState('');
    const handleSelectedStarInvestor = (event) => {
        setStartId(event.target.value);
    };
    return (
        <div className={classes.root}>
            <SelectBox
                selectedStarInvestor={starId}
                handleSelectedStarInvestor={handleSelectedStarInvestor}
                ifAllSelectd={false}
            />
            <div className={classes.information}>
                {starId && <InventoryDonutChart width={500} height={300} id={starId} />}
                {starId && <CompositionTable id={starId} />}
            </div>

            <InventoryComposition selectedStarInvestor={starId} IfNormalPage={true} />
        </div>
    );
};

export default NormalMemSubscribedComposition;
