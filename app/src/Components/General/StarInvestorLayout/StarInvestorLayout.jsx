import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import EqualizerRoundedIcon from '@material-ui/icons/EqualizerRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import FolderSpecialRoundedIcon from '@material-ui/icons/FolderSpecialRounded';
import styles from './StarInvestorLayoutStyle';

const useStyle = makeStyles(styles);

const menuListItems = [
    {
        label: '首頁',
        icon: <HomeRoundedIcon />,
        link: '/star/home',
    },
    {
        label: '我的收益',
        icon: <EqualizerRoundedIcon />,
        link: '/star/management',
    },
    {
        label: '我的文章',
        icon: <DescriptionRoundedIcon />,
        link: '/star/post',
    },
    {
        label: '我的庫存',
        icon: <StoreRoundedIcon />,
        link: '/star/inventory',
    },
    {
        label: '我的投資組合',
        icon: <FolderSpecialRoundedIcon />,
        link: '/star/composition',
    },
];

const StarInvestorLayout = ({ children }) => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    const toggleDrawer = () => {
        setOpen((prevState) => !prevState);
    };

    return (
        <div className={classes.root}>
            <Drawer
                variant='permanent'
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                    paperAnchorLeft: classes.paperAnchorLeft,
                }}
            >
                <div className={classes.toolbar}></div>
                <div className={classes.stardrawer}>
                    <div className={classes.userinfo}></div>
                    <List>
                        {menuListItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                component={Link}
                                to={item.link}
                                selected={pathname === item.link}
                                classes={{
                                    root: classes.root,
                                    selected: classes.selected,
                                }}
                            >
                                <ListItemIcon
                                    className={clsx({
                                        [classes.selectedIcon]: pathname === item.link,
                                    })}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    className={clsx({
                                        [classes.selectedText]: pathname === item.link,
                                    })}
                                >
                                    {item.label}
                                </ListItemText>
                            </ListItem>
                        ))}
                        <ListItem button onClick={toggleDrawer}>
                            <ListItemIcon>
                                <NavigateNextIcon
                                    className={clsx(classes.arrow, {
                                        [classes.arrowRotate]: open,
                                    })}
                                />
                            </ListItemIcon>
                            <ListItemText primary='收起' />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <div className={classes.content}>{children}</div>
        </div>
    );
};

export default StarInvestorLayout;
