import { useState, useEffect } from 'react';
import moment from 'moment';

type parkProps = {
  park: {
    fullName?: string;
    states?: string;
    url?: string;
    latitude?: number;
    longitude?: number;
  };
};

const Weather = ({ park }: parkProps) => {
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

  const [coords, setCoords] = useState<Array<number>>([]);

  useEffect(() => {
    if (park.latitude && park.longitude) {
      setCoords([park.latitude, park.longitude]);
    }
  }, [park]);

  useEffect(() => {
    const getWeather = async (coords: Array<number>) => {
      try {
        const weatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${coords[0]}&lon=${coords[1]}&units=imperial&appid=fc2664640b253835a31390753e5fc42f`
        );
        const data = await weatherResponse.json();
        setWeather(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (coords.length === 2) {
      getWeather(coords);
    }
  }, [coords]);

  return (
    <div className="Weather w-full max-w-[520px] h-3/8 max-h-[375px] p-2 grid justify-items-center border border-black rounded">
      <h1 className="WeatherTitle text-center text-xl font-bold">
        Current Weather
      </h1>
      <div className="Current w-full grid items-center justify-items-center">
        <div className="CurrentTemp col-start-2 row-span-3 text-2xl xs:text-4xl">
          {Math.round(weather.current.temp)} °F
        </div>
        {weather.current.weather[0].icon.length > 2 && (
          <img
            className="CurrentImg w-16 xs:w-24 h-auto col-start-1 row-start-1"
            src={require(`../images/weather-icons/${weather.current.weather[0].icon}.png`)}
            alt=""
          ></img>
        )}
        <div className="CurrentDesc text-xs xs:text-base row-start-2">
          {weather.current.weather[0].description}
        </div>
        <div className="CurrentMisc flex flex-col gap-2 col-start-3 row-span-2 text-xs xs:text-base">
          <div className="CurrentUVI ">UV Index: {weather.current.uvi}</div>
          <div className="CurrentHum">
            Humidity: {weather.current.humidity}%
          </div>
          <div className="CurrentWind ">
            Wind: {weather.current.wind_speed}mph
          </div>
        </div>
      </div>
      <h2 className="font-bold">Forecast</h2>
      <div className="w-full flex gap-1 xs:gap-2 text-[9px] xs:text-xs justify-between items-center">
        {weather.daily.slice(1).map((day) => {
          return (
            <div
              className="flex flex-col items-center"
              key={weather.daily.indexOf(day)}
            >
              <div>{moment.unix(day.dt).format('dddd')}</div>
              <img
                className="w-5 xs:w-8 h-auto"
                src={require(`../images/weather-icons/${day.weather[0].icon}.png`)}
                alt=""
              ></img>
              <div>H: {Math.round(day.temp.max)}°</div>
              <div>L: {Math.round(day.temp.min)}°</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Weather;
