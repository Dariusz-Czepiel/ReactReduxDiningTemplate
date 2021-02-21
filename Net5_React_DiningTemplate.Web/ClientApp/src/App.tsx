import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { ManagementConsole } from './dining/ManagementConsole'
import { AddRestaurant } from './dining/AddRestaurant'
import { UpdateRestaurant } from './dining/UpdateRestaurant';

import './custom.css'

export default function App() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        <AuthorizeRoute path='/managementConsole' component={ManagementConsole} role='Admin' />
        <AuthorizeRoute path='/addRestaurant' component={AddRestaurant} role='Admin' />
        <AuthorizeRoute path='/editRestaurant' component={UpdateRestaurant} role='Admin' />
      </Layout>
    );
}
