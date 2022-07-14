import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hideSearch } from './Searchbar';
import ParkPageSearchbar from './ParkSearchbar';
import ParkNav from './ParkNav';
import Weather from './Weather';
import GeneralInformation from './GeneralInformation';
import Alerts from './Alerts';
import News from './News';
import Camping from './Campgrounds';

type ParkInfo = { parkCode: string };

type ParksInfo = {
  parksInfo: Array<any>;
};

type Park = {
  fullName?: string;
  states?: string;
  url?: string;
  directionsUrl?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  weatherInfo?: string;
  images?: [{ url: string; altText: string }];
};

export type ParkProp = {
  park: {
    fullName?: string;
    states?: string;
    url?: string;
    directionsUrl?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    weatherInfo?: string;
    images?: [{ url: string; altText: string }];
  };
};

const ParkPage = ({ parksInfo }: ParksInfo) => {
  let { parkCode } = useParams<ParkInfo>();
  const [park, setPark] = useState<Park>({});

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
  }, [parkCode]);

  return (
    <div className="grid">
      <div className="pl-1 pr-1 lg:p-0 flex w-full justify-center">
        <div className="lg:w-1/3" onClick={() => hideSearch()}></div>
        <ParkPageSearchbar parksInfo={parksInfo} />
        <div className="lg:w-1/3" onClick={() => hideSearch()}></div>
      </div>
      <ParkNav park={park} />
      <div
        className="w-full max-w-[100vw] gap-2 flex flex-col justify-center items-center bg-neutral-200/75 p-2"
        onClick={() => hideSearch()}
      >
        <GeneralInformation park={park} />
          <Weather park={park} />
          <Alerts />
          <News />
          <Camping />
        
      </div>
    </div>
  );
};

export default ParkPage;
