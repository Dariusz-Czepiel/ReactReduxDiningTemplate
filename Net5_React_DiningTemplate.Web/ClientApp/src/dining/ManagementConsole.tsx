import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Redirect, RedirectProps } from 'react-router';
import { Button } from 'reactstrap';
import authService from '../components/api-authorization/AuthorizeService';
import { DatabaseTable } from '../generic/DatabaseTable';

export type Restaurant = {
    id: number,
    name: string,
    address: string
}

interface IRedirectProps{
    pathname: string,
    state?: Object
}

interface IRestaurantsData{
    restaurants: Restaurant[],
    loading: boolean
}

export const ManagementConsole: FC = () => {
    //download data about restaurant from controller
    const [restaurantsData, setRestaurantsData] = useState<IRestaurantsData>({ restaurants: [], loading: true });
    const [redirectData, setRedirectData] = useState<IRedirectProps>({ pathname: '', state: {}});

    useEffect(() => {
        populateWeatherData();
    }, [])
    
    const populateWeatherData = async () => {
        const token = await authService.getAccessToken();
        const response = await fetch('api/RestaurantManagement/GetRestaurants', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setRestaurantsData({ restaurants: data, loading: false });
        console.log(data);
    }

    const deleteRestaurantAction = async (id: number) => {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/RestaurantManagement/DeleteRestaurant?id=${id}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` },
            method: 'DELETE'
        });
        if(response.ok)
            await populateWeatherData();
    }

    const redirectToAddNew = () => setRedirectData({ pathname: '/addRestaurant', state: { redirectUrl: window.location.pathname } });
    const redirectToEdit = (data: Restaurant) => () => setRedirectData({ pathname: '/editRestaurant', state: { data, redirectUrl: window.location.pathname } });
    const deleteRestaurant = (id: number) => () => {
        if(window.confirm('Do you want to delete restaurant?'))
            deleteRestaurantAction(id);
    }

    //delete gives a prompt and if yes deletes the record

    const databaseActions = (data: Restaurant) =>
        <>
            <span onClick={redirectToEdit(data)}>edit </span>
            <span onClick={deleteRestaurant(data.id)}>delete</span>
        </>;

    return (
        <div>
            <p>
                This is an Admin management console
            </p>
            <div style={{marginBottom: "10px"}}>
                <Button onClick={redirectToAddNew}>Add new restaurant</Button>
                {redirectData.pathname !== "" && <Redirect to={redirectData} />}
            </div>
            <DatabaseTable columns={['id', 'name', 'address']} data={restaurantsData.restaurants} actions={databaseActions} />
      </div>
    );
}
