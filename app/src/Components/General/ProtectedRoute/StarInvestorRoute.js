import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../Reducer/User/UserSlice';
import { starRoutes } from '../../../Config/route';
import StarInvestorLayout from '../StarInvestorLayout/StarInvestorLayout';
import StarInvestorHome from '../../../Containers/StarInvestorHome';
const StarInvestorRoute = () => {
    const { isLogin, isStarInvestor } = useSelector(userSelector);

    const RouteMap = starRoutes.map(({ path: subpath, key, component }) => {
        return (
            <Route exact path={`${subpath}`} key={key}>
                {component}
            </Route>
        );
    });
    return isLogin ? (
        isStarInvestor ? (
            <StarInvestorLayout>
                <Switch>
                    {RouteMap}
                    <Redirect exact from='*' to='/star/home' />
                </Switch>
            </StarInvestorLayout>
        ) : (
            <Redirect to='/login' />
        )
    ) : (
        <Redirect to='/login' />
    );
};

export default StarInvestorRoute;
