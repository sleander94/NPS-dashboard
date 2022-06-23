import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

type AlertsParams = { parkCode: string };

const Alerts = ({}) => {
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
  }, [parkCode]);
  return (
    <div
      id="alerts"
      className="Alerts w-full col-start-1 lg:h-full lg:overflow-y-scroll lg:max-w-[640px] border border-black border-b-0 lg:border-b rounded bg-white"
    >
      <h1 className="text-center text-2xl font-bold bg-[#97c64b] rounded-tr-[.19rem] rounded-tl-[.19rem] border-b border-black">
        Alerts
      </h1>
      {alerts.length === 0 && (
        <p className="border-b border-black">There are no alerts to display.</p>
      )}
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div
              className="lg:border-none p-1 border-b border-black"
              key={alerts.indexOf(alert)}
            >
              <p className="text-lg font-semibold">{alert.title}</p>
              <p className="italic text-sm">
                {moment(alert.lastIndexedDate).format('MMM Do YY')}
              </p>
              <p>{alert.description}</p>
              <div className="lg:border-b lg:border-gray-400 lg:pt-2"></div>
            </div>
          );
        })}
    </div>
  );
};

export default Alerts;
