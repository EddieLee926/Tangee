import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { publicRoutes } from '../../../Config/route';
import Home from '../../../Containers/Home';
const PublicRoute = () => {
    const RouteMap = publicRoutes.map(({ path: subpath, key, component }) => {
        return (
            <Route exact path={`${subpath}`} key={key}>
                {component}
            </Route>
        );
    });

    return (
        <Switch>
            {RouteMap}
            <Redirect to='/' />
        </Switch>
    );
};

export default PublicRoute;
