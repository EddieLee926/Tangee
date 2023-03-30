import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { normalRoutes } from '../../../Config/route';

const NormalMemRoute = () => {
    const { isLogin, isStarInvestor } = useSelector(userSelector);

    const RouteMap = normalRoutes.map(({ path: subpath, key, component }) => {
        return (
            <Route exact path={`${subpath}`} key={key}>
                {component}
            </Route>
        );
    });

    return isLogin ? (
        isStarInvestor ? (
            <Redirect to='/login' />
        ) : (
            <Switch>
                {RouteMap}
                <Redirect exact from='*' to='/normal/home' />
            </Switch>
        )
    ) : (
        <Redirect to='/login' />
    );
};

export default NormalMemRoute;
