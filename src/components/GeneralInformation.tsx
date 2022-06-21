import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type parkProps = {
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

const GeneralInformation = ({ park }: parkProps) => {
  return (
    <div className="GeneralInfo w-full  max-w-[520px] h-3/8 max-h-[375px] border border-black rounded overflow-y-scroll">
      <h1 className="text-center text-2xl font-bold bg-lime-600 text-white">
        General Information
      </h1>
      {park.images && <img src={park.images[0].url}></img>}
      <p>{park.description}</p>
      <p>{park.weatherInfo}</p>
      <a href={park.url}>NPS Website</a>
      <a href={park.directionsUrl}>Directions</a>
    </div>
  );
};

export default GeneralInformation;
