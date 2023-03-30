import React from 'react';
import Typography from '@material-ui/core/Typography';
import PaperBlock from '../PaperBlock/PaperBlock';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CheckIcon from '@material-ui/icons/Check';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import styles from './StarInvestorBlockStyle';

const useStyle = makeStyles(styles);

const StarInvestorBlock = ({ user }) => {
    const classes = useStyle();
    const path = '/star-investor-details/' + user.user_id;
    const imageURL = {
        '--background-image': `url('${user.url}')`,
    };
    return (
        <PaperBlock className={classes.root}>
            <IconButton className={classes.infoButton}>
                <MoreVertIcon />
            </IconButton>
            <ButtonBase
                disableRipple
                component={Link}
                to={path}
                className={classes.buttonBlock}
            >
                <div className={classes.image} style={imageURL}>
                    <div className={classes.checkIcon}>
                        <CheckIcon style={{ color: 'white' }} />
                    </div>
                </div>
                <Typography variant='h3' align='center'>
                    {user.nick_name}
                </Typography>
                <div className={classes.details}>
                    <div className={classes.details_item}>
                        <Typography variant='body1' align='center'>
                            近一月
                            <br />
                            報酬率:
                        </Typography>
                        <Typography variant='h3' align='center'>
                            {user.month}%
                        </Typography>
                    </div>
                    <div className={classes.details_item}>
                        <Typography variant='body1' align='center'>
                            單筆最大獲利獲利:
                        </Typography>
                        <Typography variant='h3' align='center'>
                            {user.profit}%
                        </Typography>
                    </div>
                    <div className={classes.details_item}>
                        <Typography variant='body1' align='center'>
                            每周交易
                            <br />
                            次數:
                        </Typography>
                        <Typography variant='h3' align='center'>
                            {user.times}次
                        </Typography>
                    </div>
                </div>
                <div className={classes.tags}>
                    {user.tag.map((tag_item, index) => (
                        <Chip key={index} label={tag_item} />
                    ))}
                </div>
            </ButtonBase>
        </PaperBlock>
    );
};

export default StarInvestorBlock;
