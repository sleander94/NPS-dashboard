import React, { useEffect, useState } from 'react';

type AlertsProps = { parkCode: string };

const Alerts = ({ parkCode }: AlertsProps) => {
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/alerts?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setAlerts(data.data);
        console.log('getting alerts');
      } catch (e) {
        console.error(e);
      }
    };
    getAlerts();
  }, []);
  return (
    <div>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div key={alerts.indexOf(alert)}>
              <div>{alert.title}</div>
              <div>{alert.description}</div>
            </div>
          );
        })}
    </div>
  );
};

export default Alerts;
