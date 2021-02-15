import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { Button } from 'reactstrap';
import authService from '../components/api-authorization/AuthorizeService';
import { DatabaseTable } from '../generic/DatabaseTable';

export type Restaurant = {
    id: number,
    name: string,
    address: string
}

interface IRestaurantsData{
    restaurants: Restaurant[],
    loading: boolean
}

export const ManagementConsole: FC = () => {
    //download data about restaurant from controller
    const [restaurantsData, setRestaurantsData] = useState<IRestaurantsData>({ restaurants: [], loading: true });
    const [redirectString, setRedirectString] = useState("");

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

    const redirectToAddNew = () => setRedirectString("/addRestaurant");

    return (
        <div>
            <p>
                This is an Admin management console
            </p>
            <div style={{marginBottom: "10px"}}>
                <Button onClick={redirectToAddNew}>Add new restaurant</Button>
                {redirectString !== "" && <Redirect to={redirectString} />}
            </div>
            <DatabaseTable columns={['id', 'address', 'name']} data={restaurantsData.restaurants} />
      </div>
    );
}
