import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import Typography from '@material-ui/core/Typography';
import InventoryComposition from '../../Components/NormalMemSubscribedComposition/InventoryComposition/InventoryComposition';
import InventoryDonutChart from '../../Components/Inventory/InventoryDonutChart/InventoryDonutChart.jsx';
import { userSelector } from '../../Reducer/User/UserSlice';
import { useSelector } from 'react-redux';
import getApi from '../../Utils/Api/getApi';
import { getImage } from '../../Config/images.js';
import styles from './StarInvestorCompositionStyle';

const useStyles = makeStyles(styles);

const StarInvestorComposition = () => {
    const { userid } = useSelector(userSelector);
    const [users, setUsers] = useState();
    const classes = useStyles();
    useEffect(() => {
        const getCost = async () => {
            const response = await getApi.post('/invest-cost', { userid: userid });
            setUsers(response.data);
        };
        getCost();
    }, []);

    const UsersDiv = ({ users }) => {
        if (users) {
            return (
                <div className={classes.blockWrapper}>
                    <div className={classes.colorBlock1}>
                        <div className={classes.icon}>
                            <img
                                src={getImage('star_management', 'icon', 'arrow_rise')}
                            />
                        </div>
                        <div className={classes.text}>
                            <Typography variant='h2' align='left'>
                                總獲利:{Number(users.profit).toFixed(2)}
                            </Typography>
                        </div>
                    </div>

                    <div className={classes.colorBlock2}>
                        <div className={classes.icon}>
                            <MonetizationOnRoundedIcon fontSize='large' />
                        </div>
                        <div className={classes.text}>
                            <Typography variant='h2' align='left'>
                                總成本:{users.cost}
                            </Typography>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };
    return (
        <>
            <div className={classes.summary}>
                <InventoryDonutChart width={400} height={300} id={userid} />
                <UsersDiv users={users} />
            </div>
            <InventoryComposition IfNormalPage={false} />
        </>
    );
};

export default StarInvestorComposition;
