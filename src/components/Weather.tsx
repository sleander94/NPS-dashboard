import { useState, useEffect } from 'react';
import { ParkProp } from './ParkPage';
import moment from 'moment';

type WeatherInfo = {
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
};

const Weather = ({ park }: ParkProp) => {
  const [weather, setWeather] = useState<WeatherInfo>({
    current: {
      temp: 0,
      humidity: 0,
      uvi: 0,
      wind_speed: 0,
      sunrise: 0,
      weather: [{ description: 'loading desc.', icon: '' }],
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

  const toTitleCase = (description: string) => {
    const array = description.split(' ');
    return array
      .map((word) => {
        return word[0].toLocaleUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  return (
    <div
      id="weather"
      className="Weather overflow-hidden grid justify-items-center w-full lg:max-w-[640px] min-w-[320px] max-h-[400px] lg:min-h-[50%] border border-black rounded bg-white"
    >
      <h1 className="WeatherTitle justify-self-stretch h-[33px] text-center text-2xl font-bold bg-[#3A736C] text-white rounded-tr-[.19rem] rounded-tl-[.19rem] border-b border-black">
        Current Weather
      </h1>
      <div className="Current w-full max-w-[640px] p-2 pb-0 grid gap-6 items-center justify-items-center">
        <div className="CurrentTemp col-start-2 row-span-3 text-2xl xs:text-4xl xl:text-5xl whitespace-nowrap">
          {Math.round(weather.current.temp)} °F
        </div>
        {weather.current.weather[0].icon.length > 2 && (
          <img
            className="CurrentImg w-16 xs:w-24 xl:w-28 h-auto col-start-1 row-start-1"
            src={require(`../images/weather-icons/${weather.current.weather[0].icon}.png`)}
            alt=""
          ></img>
        )}
        <div className="CurrentDesc text-xs xs:text-base xl:text-lg xxl:text-xl row-start-2 whitespace-nowrap">
          {toTitleCase(weather.current.weather[0].description)}
        </div>
        <div className="CurrentMisc flex flex-col gap-2 col-start-3 row-span-2 text-xs xs:text-base xxl:text-xl">
          <div className="CurrentUVI ">UV Index: {weather.current.uvi}</div>
          <div className="CurrentHum">
            Humidity: {weather.current.humidity}%
          </div>
          <div className="CurrentWind ">
            Wind: {weather.current.wind_speed}mph
          </div>
        </div>
      </div>
      <h1 className="WeatherTitle pb-3 text-center text-xl font-bold">
        Forecast
      </h1>
      <div className="w-full pl-1 pr-1 flex gap-1 xs:gap-2 text-[9px] xs:text-xs lg:text-[10px] xl:text-xs justify-around items-center">
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
