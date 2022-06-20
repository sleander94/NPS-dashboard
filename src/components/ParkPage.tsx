import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Weather from './Weather';
import Alerts from './Alerts';
import News from './News';

type ParkPageParams = { parkCode: string };

const ParkPage = () => {
  let { parkCode } = useParams<ParkPageParams>();
  const [park, setPark] = useState<{
    fullName: string;
    states: string;
    url: string;
  }>({ fullName: '', states: '', url: '' });

  useEffect(() => {
    const getPark = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setPark(data.data[0]);
      } catch (e) {
        console.error(e);
      }
    };
    getPark();
  }, []);

  return (
    <div className="flex h-screen">
      <h2>{park.fullName}</h2>
      <a href={park.url} target="_blank">
        Go to NPS site
      </a>
      <Weather />
      <Alerts />
      <News />
    </div>
  );
};

export default ParkPage;
