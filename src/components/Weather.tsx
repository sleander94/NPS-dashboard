import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const Weather = () => {
  type WeatherParams = { parkCode: string };
  let { parkCode } = useParams<WeatherParams>();

  const [weather, setWeather] = useState<{
    current: {
      temp: number;
      humidity: number;
      uvi: number;
      wind_speed: number;
      sunrise: number;
      weather: [{ description: string; icon: string }];
    };
    daily: [
      {
        dt: number;
        temp: { min: number; max: number };
        weather: [{ main: string; icon: string }];
      }
    ];
  }>({
    current: {
      temp: 0,
      humidity: 0,
      uvi: 0,
      wind_speed: 0,
      sunrise: 0,
      weather: [{ description: '', icon: '' }],
    },
    daily: [
      { dt: 0, temp: { min: 0, max: 0 }, weather: [{ main: '', icon: '' }] },
    ],
  });

  const [coords, setCoords] = useState<Array<string>>([]);

  useEffect(() => {
    const getParkCoords = async () => {
      try {
        const parkResponse = await fetch(
          `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const parkData = await parkResponse.json();
        const parkCoords = [
          parkData.data[0].latitude,
          parkData.data[0].longitude,
        ];
        setCoords(parkCoords);
      } catch (e) {
        console.error(e);
      }
    };
    getParkCoords();
  }, []);

  useEffect(() => {
    const getWeather = async (coords: Array<string>) => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=fc2664640b253835a31390753e5fc42f`
        );
        const data = await weatherResponse.json();
        setWeather(data);
        console.log(weather);
      } catch (e) {
        console.error(e);
      }
    };
    if (coords.length === 2) {
      getWeather(coords);
    }
  }, [coords]);

  return (
    <div className="w-full sm:w-2/3 h-3/6 p-2 border border-black rounded overflow-y-scroll">
      <h1 className="text-center text-xl font-bold">Weather</h1>
      <div className="grid">
        <h2 className="font-bold">Current</h2>
        <div>{weather.current.temp} °F</div>
        <div>{weather.current.weather[0].icon}</div>
        {weather.current.weather[0].icon.length > 2 && (
          <img
            src={require(`../images/weather-icons/${weather.current.weather[0].icon}.png`)}
            alt=""
          ></img>
        )}
        <div>{weather.current.weather[0].description}</div>
        <div>UV Index: {weather.current.uvi}</div>
        <div>Humidity: {weather.current.humidity}%</div>
        <div>Wind: {weather.current.wind_speed}mph</div>
      </div>
      <h2>Forecast</h2>
      <div>
        {weather.daily.slice(1).map((day) => {
          return (
            <div key={weather.daily.indexOf(day)}>
              <div>{moment.unix(day.dt).format('dddd')}</div>
              <div>{day.weather[0].icon}</div>
              <img
                src={require(`../images/weather-icons/${day.weather[0].icon}.png`)}
                alt=""
              ></img>
              <div>High: {day.temp.max}</div>
              <div>Low: {day.temp.min}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Weather;
