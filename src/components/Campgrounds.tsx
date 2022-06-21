import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type CampingParams = { parkCode: string };

const Camping = ({}) => {
  let { parkCode } = useParams<CampingParams>();
  const [campingInfo, setCampingInfo] = useState<any[]>([]);

  useEffect(() => {
    const getCampingInfo = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setCampingInfo(data.data);
        console.log(campingInfo);
      } catch (e) {
        console.error(e);
      }
    };
    getCampingInfo();
  }, []);
  return (
    <div className="Camping w-full  max-w-[520px] h-3/8 max-h-[375px] border border-black rounded overflow-y-scroll">
      <h1 className="text-center text-2xl font-bold bg-lime-600 text-white">
        Campgrounds
      </h1>
      {campingInfo.length === 0 && <p>There are no campgrounds to display.</p>}
      {campingInfo.length > 0 &&
        campingInfo.map((campground) => {
          return (
            <div className="p-1" key={campingInfo.indexOf(campground)}>
              <p className="text-lg font-semibold">{campground.name}</p>
              <p className="">{campground.description}</p>
              <p className="italic">{campground.directionsOverview}</p>
              <a href={campground.reservationUrl} target="_blank" className="">
                Reservation Information
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default Camping;
