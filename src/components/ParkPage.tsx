import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ParkPageSearchbar from './ParkSearchbar';
import ParkNav from './ParkNav';
import Weather from './Weather';
import GeneralInformation from './GeneralInformation';
import Alerts from './Alerts';
import News from './News';
import Camping from './Campgrounds';

type ParkPageParams = { parkCode: string };

type parksInfoProp = {
  parksInfo: Array<any>;
};

const ParkPage = ({ parksInfo }: parksInfoProp) => {
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
  }, [parkCode]);

  return (
    <div className="grid">
      <div className="justify-self-center w-full lg:w-2/3 max-w-[800px]">
        <ParkPageSearchbar parksInfo={parksInfo} />
      </div>
      <ParkNav park={park} />
      <div className="lg:h-[80vh] lg:grid lg:grid-cols-3 lg:justify-items-center w-full gap-2 flex flex-wrap justify-center bg-neutral-200/75 p-2">
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
