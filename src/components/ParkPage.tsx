import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParkNav from './ParkNav';
import Weather from './Weather';
import GeneralInformation from './GeneralInformation';
import Alerts from './Alerts';
import News from './News';
import Camping from './Campgrounds';

type ParkPageParams = { parkCode: string };

const ParkPage = () => {
  let { parkCode } = useParams<ParkPageParams>();
  const [park, setPark] = useState<{
    fullName?: string;
    states?: string;
    url?: string;
  }>({});

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
    <div className="">
      <ParkNav park={park} />
      <div className="w-full gap-2 flex flex-wrap justify-center bg-neutral-200/75 p-2">
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
