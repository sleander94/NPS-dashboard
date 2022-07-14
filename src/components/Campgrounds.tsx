import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type ParkCode = { parkCode: string };

const Camping = () => {
  let { parkCode } = useParams<ParkCode>();
  const [campingInfo, setCampingInfo] = useState<any[]>([]);

  useEffect(() => {
    const getCampingInfo = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/campgrounds?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setCampingInfo(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getCampingInfo();
  }, [parkCode]);
  return (
    <section
      id="campgrounds"
      className="Camping lg:max-w-[900px] w-full border border-black border-b-0 rounded bg-white"
    >
      <h1 className="text-center text-2xl font-bold bg-[#3A736C] text-white rounded-tr-[.19rem] rounded-tl-[.19rem] border-b border-black">
        Campgrounds
      </h1>
      {campingInfo.length === 0 && (
        <p className="border-b border-black">
          There are no campgrounds to display.
        </p>
      )}
      {campingInfo.length > 0 &&
        campingInfo.map((campground) => {
          return (
            <div
              className="p-1 border-b border-black"
              key={campingInfo.indexOf(campground)}
            >
              <h2 className="text-lg font-semibold">{campground.name}</h2>
              {campground.images.length > 0 && (
                <img
                  className="block ml-auto mr-auto w-full"
                  src={campground.images[0].url}
                  alt={campground.images[0].altText}
                ></img>
              )}
              <p className="pb-2">{campground.description}</p>
              <h3 className="font-semibold">Directions</h3>
              <p className="mb-1">{campground.directionsOverview}</p>
              {campground.reservationUrl && (
                <a
                  className="rounded p-1 bg-[#3A736C] text-white"
                  href={campground.reservationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reservation Information
                </a>
              )}
              {!campground.reservationUrl && (
                <a
                  className="rounded p-1 bg-[#3A736C] text-white"
                  href={campground.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Reservation Information
                </a>
              )}
            </div>
          );
        })}
    </section>
  );
};

export default Camping;
