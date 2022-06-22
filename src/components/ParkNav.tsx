import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

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

const ParkNav = ({ park }: parkProps) => {
  return (
    <div className="ParkNav mt-3 w-full h-[84px] text-center sticky top-0 bg-white border-b border-black">
      <a
        href="#info"
        className=" block text-xl p-2 font-bold bg-[#97c64b] border-b border-t border-black"
      >
        {park.fullName}
      </a>
      <div className="LinkContainer w-full p-2 pb-0 flex justify-between items-center bg-white">
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#news">News</a>
        <a href="#campgrounds">Campgrounds</a>
      </div>
    </div>
  );
};

export default ParkNav;
