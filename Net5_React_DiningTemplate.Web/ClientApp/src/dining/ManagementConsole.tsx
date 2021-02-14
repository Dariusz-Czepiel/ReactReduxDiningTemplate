import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import authService from '../components/api-authorization/AuthorizeService';
import { DatabaseTable } from '../generic/DatabaseTable';

type Restaurant = {
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

    return (
        <div>
            <p>
                This is an Admin management console
            </p>
            <div>
                Should be table here
                <DatabaseTable columns={['id', 'address', 'name']} data={restaurantsData.restaurants} />
            </div>
      </div>
    );
}
