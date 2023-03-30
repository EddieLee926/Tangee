import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from './InventorySummaryStyle';
import getApi from '../../../Utils/Api/getApi';

const useStyles = makeStyles(styles);

const InventorySummary = ({ selectedStarInvestor }) => {
    const classes = useStyles();
    const [RealizePerformer, setRealizePerformer] = useState();
    useEffect(() => {
        const getRealizePerformer = async () => {
            const response = await getApi.post('/inventory-RealizePerformer',
                { securitiesAccount: selectedStarInvestor }
            )
            response.data.length == 0 ? setRealizePerformer('') : setRealizePerformer(response.data)
        }
        getRealizePerformer()



    }, [selectedStarInvestor])




    const [UnrealizePerformer, setUnrealizePerformer] = useState();
    useEffect(() => {
        const getUnrealizePerformer = async () => {
            const response = await getApi.post('/inventory-UnrealizePerformer',
                { securitiesAccount: selectedStarInvestor }
            )
            response.data.length == 0 ? setUnrealizePerformer('') : setUnrealizePerformer(response.data)
        }
        getUnrealizePerformer()



    }, [selectedStarInvestor])


    return (
        <div></div>
    )
}



export default InventorySummary;
