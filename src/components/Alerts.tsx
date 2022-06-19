import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type AlertsParams = { parkCode: string };

const Alerts = () => {
  let { parkCode } = useParams<AlertsParams>();
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setAlerts(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getAlerts();
  }, []);
  return (
    <div className="w-1/3 h-3/6 p-2 border border-black overflow-y-scroll">
      <h1 className="text-center text-2xl font-bold">Alerts</h1>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div className="p-1" key={alerts.indexOf(alert)}>
              <p className="text-lg font-semibold">{alert.title}</p>
              <p>{alert.lastIndexedDate}</p>
              <p>{alert.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Alerts;
