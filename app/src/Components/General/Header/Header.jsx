import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleLogIn, toogleStarInvestor } from '../../../Reducer/User/UserSlice';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/ToolBar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';
import ButtonBase from '@material-ui/core/ButtonBase';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import styles from './HeaderStyle';
import HeaderContent from './HeaderContent';
import NotifyStockData from '../NotifyStockData/NotifyStockData';
import { getImage } from '../../../Config/images';
import { routes } from '../../../Config/route';

const useStyles = makeStyles(styles);
const selectIsLogIn = (state) => state.user.isLogin;
const selectIsStarInvestor = (state) => state.user.isStarInvestor;

const Header = () => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    const isLogIn = useSelector(selectIsLogIn);
    const isStarInvestor = useSelector(selectIsStarInvestor);

    const handleDrawertoggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleLogInChange = (event) => {
        dispatch(toggleLogIn());
    };

    const handleStarInvestorChange = (event) => {
        dispatch(toogleStarInvestor());
    };

    return (
        <React.Fragment>
            <AppBar className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <div className={classes.box}>
                        {/* <IconButton
                            edge='start'
                            className={classes.menuButton}
                            color='inherit'
                            aria-label='menu'
                            onClick={handleDrawertoggle}
                        >
                            <MenuIcon />
                        </IconButton> */}
                        <ButtonBase disableRipple component={Link} to='/'>
                            <img
                                src={getImage('general', 'logo', 'type1')}
                                className={classes.headerLogo}
                            />
                        </ButtonBase>
                    </div>
                    <Hidden xsDown>
                        <HeaderContent isLogIn={isLogIn} />
                    </Hidden>
                </Toolbar>
                <Drawer
                    anchor='left'
                    variant='temporary'
                    open={drawerOpen}
                    onClose={handleDrawertoggle}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isLogIn}
                                    onChange={handleLogInChange}
                                    aria-label='login switch'
                                />
                            }
                            label={isLogIn ? 'Logout' : 'Login'}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={isStarInvestor}
                                    onChange={handleStarInvestorChange}
                                    aria-label='login switch'
                                />
                            }
                            label={isStarInvestor ? '明星投資者' : '一般使用者'}
                        />
                    </FormGroup>
                    <div
                        role='presentation'
                        onClick={handleDrawertoggle}
                        onKeyDown={handleDrawertoggle}
                    >
                        <List>
                            {routes.map((route, index) => (
                                <ListItem
                                    component={Link}
                                    button
                                    key={route.key}
                                    to={route.path}
                                >
                                    <ListItemText primary={route.key} />
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Drawer>
            </AppBar>
            <div className={classes.headerPadding}></div>
            <NotifyStockData />
        </React.Fragment>
    );
};

export default Header;
