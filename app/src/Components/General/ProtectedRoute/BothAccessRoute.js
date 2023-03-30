import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { bothRoutes } from '../../../Config/route';

const BothAccessRoute = () => {
    const { isLogin } = useSelector(userSelector);

    const RouteMap = bothRoutes.map(({ path: subpath, key, component }) => {
        return (
            <Route exact path={`${subpath}`} key={key}>
                {component}
            </Route>
        );
    });

    return isLogin ? (
        <Switch>
            {RouteMap}
            <Redirect exact from='*' to='/' />
        </Switch>
    ) : (
        <Redirect to='/login' />
    );
};

export default BothAccessRoute;
