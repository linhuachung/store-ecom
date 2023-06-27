import React, { lazy } from 'react';
import Search from '../../pages/search';
import Detail from '../../pages/detail';
import Cart from '../../pages/cart';

const Login = lazy(() => import('../../pages/account/login'))
const Register = lazy(() => import('../../pages/account/register'))
const Home = lazy(() => import('../../pages/home'))
const NotFound = lazy(() => import('../../pages/not-found'))
const renderLazyComponent = (LazyComponent: any) => (props: any) => <LazyComponent {...props} />
export const RoutePath = {
    AuthPath: {
        Auth: '/auth',
        Login: '/auth/login',
        Register: '/auth/register',
    },
    HomePage: '/',
    SearchPage: '/search/:paramSearch',
    DetailPage: '/detail/:productId',
    CartPage: '/cart',
    NotFound: '*'
}

export const RouteComponent = {
    HomePage: renderLazyComponent(Home),
    SearchPage: renderLazyComponent(Search),
    DetailPage: renderLazyComponent(Detail),
    CartPage: renderLazyComponent(Cart),
    Login: renderLazyComponent(Login),
    Register: renderLazyComponent(Register),
    NotFound: renderLazyComponent(NotFound)
}
