import React, { useEffect, useState } from 'react';
import { getImage } from '../../Config/images.js';
import getApi from '../../Utils/Api/getApi';
import MonetizationOnRoundedIcon from '@material-ui/icons/MonetizationOnRounded';
import Typography from '@material-ui/core/Typography';
import styles from './NormalMemSubscribedCompositionStyle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);
const CompositionTable = ({ id }) => {
    const [users, setUsers] = useState();
    const classes = useStyles();

    useEffect(() => {
        console.log(id, 'id');
        const user_data = {
            userid: id,
        };

        const getCost = async () => {
            const response = await getApi.post('/invest-cost', { userid: id });
            // console.log(response.data, 'pppplllll');
            setUsers(response.data);
        };
        getCost();
    }, [id]);
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
                <UsersDiv users={users} />
            </div>
        </>
    );
};

export default CompositionTable;
