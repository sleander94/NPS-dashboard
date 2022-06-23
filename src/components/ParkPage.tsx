import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

  const hideSearch = () => {
    const suggs = document.getElementById('searchSuggs');
    if (suggs !== null) {
      suggs.classList.add('hidden');
      suggs.classList.remove('visible');
    }
  };

  return (
    <div className="grid">
      <div className="justify-self-center w-full lg:w-2/3 max-w-[800px]">
        <ParkPageSearchbar parksInfo={parksInfo} />
      </div>
      <ParkNav park={park} />
      <div
        className="lg:max-h-[calc(100vh-12px)] lg:grid lg:grid-cols-3 lg:justify-items-center w-full gap-2 flex flex-wrap justify-center bg-neutral-200/75 p-2"
        onClick={() => hideSearch()}
      >
        <GeneralInformation park={park} />
        <div className="lg:col-start-1 lg:row-start-1 flex flex-col gap-2 w-full lg:max-h-[calc(100vh-56px)]">
          <Weather park={park} />
          <Alerts />
        </div>
        <div className="lg:col-start-3 lg:row-start-1 flex flex-col gap-2 w-full lg:max-h-[calc(100vh-56px)]">
          <News />
          <Camping />
        </div>
      </div>
    </div>
  );
};

export default ParkPage;
