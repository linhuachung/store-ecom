import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Redirect, Route, Switch, useLocation } from 'react-router-dom'
import Storage from '../../utils/storage'
import { RouteComponent, RoutePath } from './routesConstant'
/** Layout */
/** component */
import Loading from '../../components/loading'
import { constant } from '../../utils/constant';

/** page */



const PrivateRoute = ({ condition, redirect, ...props }) => {
    condition = condition()
    if (condition) return <Route {...props} />
    return <Redirect to={redirect}/>
}

const AuthRoute = ({ condition, redirect, ...props }) => {
    condition = condition()
    if (condition) return <Route {...props} />
    return <Redirect to={redirect}/>
}
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function RoutesComponent() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    const renderPrivateRoutes = () => (
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route exact path={RoutePath.HomePage} component={RouteComponent.HomePage}/>
                <Route exact path={RoutePath.SearchPage} component={RouteComponent.SearchPage}/>
                <Route exact path={RoutePath.DetailPage} component={RouteComponent.DetailPage}/>
                <Route exact path={RoutePath.CartPage} component={RouteComponent.CartPage}/>
                <Route path={RoutePath.NotFound} component={RouteComponent.NotFound}/>
            </Switch>
        </Suspense>
    )

    const renderAuthRoutes = () => (
        <Suspense fallback={<Loading/>}>
            <Switch>
                <Route exact path={RoutePath.AuthPath.Login} component={RouteComponent.Login}/>
                <Route exact path={RoutePath.AuthPath.Register} component={RouteComponent.Register}/>
                <Route path={RoutePath.NotFound} component={RouteComponent.NotFound}/>
            </Switch>
        </Suspense>
    )

    return (
        <BrowserRouter>
            <ScrollToTop/>
            <Suspense fallback={<Loading/>}>
                <Switch>
                    <AuthRoute
                        condition={() => !Storage.has(constant.ACCESS_TOKEN)}
                        redirect={RoutePath.HomePage}
                        path={RoutePath.AuthPath.Auth}
                        component={renderAuthRoutes}
                    />
                    <PrivateRoute
                        condition={() => Storage.has(constant.ACCESS_TOKEN)}
                        redirect={RoutePath.AuthPath.Login}
                        path={RoutePath.HomePage}
                        component={renderPrivateRoutes}
                    />
                    <Redirect to={RoutePath.NotFound}/>
                </Switch>
            </Suspense>
        </BrowserRouter>
    )
}

export default RoutesComponent
