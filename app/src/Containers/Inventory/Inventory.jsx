import React, { useEffect, useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import styles from './InventoryStyle';
// const useStyles = makeStyles(styles);
import getApi from '../../Utils/Api/getApi';
import InventoryDonutChart from '../../Components/Inventory/InventoryDonutChart/InventoryDonutChart.jsx';

const Inventory = () => {
    // const classes = useStyles();
    const [data, setData] = useState('Hello');
    useEffect(() => {
        // const getResponse = async () => {
        //     const response = await getApi.get('/my-inventory');
        //     console.log(response.data);
        //     const msg = response.data;
        //     setData(msg);
        // };
        // getResponse();
    }, []);

    if (!data) {
        return <div>Loading</div>;
    } else {
        return (
            <div>
                inventory
                {/* {data.map(el => (
                    <div>{el.num}{el.brokerId}</div>
                ))} */}
                <InventoryDonutChart width={500} height={300} />
            </div>
        );
    }
};

export default Inventory;
