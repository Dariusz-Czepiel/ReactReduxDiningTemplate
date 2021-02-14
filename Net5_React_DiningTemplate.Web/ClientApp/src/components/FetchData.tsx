import { FC, useEffect, useState } from 'react';
import authService from './api-authorization/AuthorizeService'

//maybe I can cast date to js Date?
interface Forecast {
    date: string,
    temperatureC: number,
    temperatureF: number,
    summary: string
}

const renderForecastsTable = (forecasts: Array<Forecast>) => {
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
            <tr>
            <th>Date</th>
            <th>Temp. (C)</th>
            <th>Temp. (F)</th>
            <th>Summary</th>
            </tr>
        </thead>
        <tbody>
            {forecasts.map(forecast =>
            <tr key={forecast.date}>
                <td>{forecast.date}</td>
                <td>{forecast.temperatureC}</td>
                <td>{forecast.temperatureF}</td>
                <td>{forecast.summary}</td>
            </tr>
            )}
        </tbody>
        </table>
    );
}

export const FetchData: FC = () => {
    const [forecastsObj, setForecastsObj] = useState({ forecasts: [], loading: true });


    useEffect(() => {
        populateWeatherData();
    }, [])
    
  const populateWeatherData = async () => {
    const token = await authService.getAccessToken();
    const response = await fetch('weatherforecast', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
      console.log('test');
    const data = await response.json();
      console.log(data);
      setForecastsObj({ forecasts: data, loading: false });
  }

    let contents = forecastsObj.loading
        ? <p><em>Loading...</em></p>
        : renderForecastsTable(forecastsObj.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );

}
