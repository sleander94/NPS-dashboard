import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Alerts from './Alerts';
import News from './News';

type ParkPageParams = { parkCode: string };

const ParkPage = () => {
  let { parkCode } = useParams<ParkPageParams>();
  return (
    <div className="flex h-screen">
      <Alerts />
      <News />
    </div>
  );
};

export default ParkPage;
