import { useState, useEffect } from 'react';

export const FetchData = () => {
    //making them into one object to prevent rerender could also use reducer
    const [forecastObj, setForecastObj] = useState({ forecasts: [], loading: true });

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecastObj({ forecasts: data, loading: false });
      }

    useEffect(() => {
        populateWeatherData();
    }, [])

    //could optimize?
    const renderForecastsTable = (forecasts) =>
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
        </table>;

    let contents = forecastObj.loading
      ? <p><em>Loading...</em></p>
      : renderForecastsTable(forecastObj.forecasts);

    return (
      <div>
        <h1 id="tabelLabel" >Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    )
}
