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
    <div className="ParkNav p-1 w-full">
      <a href="#info" className="text-xl font-bold">
        {park.fullName}
      </a>
      <div className="LinkContainer">
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#news">News</a>
        <a href="#campgrounds">Campgrounds</a>
      </div>
    </div>
  );
};

export default ParkNav;
