import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from '../../Components/General/Header';
import Footer from '../../Components/General/Footer';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import styles from './MainStyle';
import NormalMemRoute from '../../Components/General/ProtectedRoute/NormalMemRoute';
import StarInvestorRoute from '../../Components/General/ProtectedRoute/StarInvestorRoute';
import BothAccessRoute from '../../Components/General/ProtectedRoute/BothAccessRoute';
import PublicRoute from '../../Components/General/PublicRoute/PublicRoute';

const useStyles = makeStyles(styles);

const Main = () => {
    const classes = useStyles();

    return (
        <div className={classes.globalFont}>
            <Header />
            <Container className={classes.root}>
                <Switch>
                    <Route path='/star'>
                        <StarInvestorRoute />
                    </Route>
                    <Route path='/normal'>
                        <NormalMemRoute />
                    </Route>
                    <Route path='/inventory'>
                        <BothAccessRoute />
                    </Route>
                    <Route path='/'>
                        <PublicRoute />
                    </Route>
                </Switch>
            </Container>
            <Footer />
        </div>
    );
};

export default Main;
