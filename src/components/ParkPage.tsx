import React, { useEffect, useState } from 'react';
import Alerts from './Alerts';

type ParkPageProps = { parkCode: string };

const ParkPage = ({ parkCode }: ParkPageProps) => {
  return (
    <div>
      <Alerts parkCode={parkCode} />
    </div>
  );
};

export default ParkPage;
