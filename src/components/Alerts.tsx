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
        console.log(alerts);
      } catch (e) {
        console.error(e);
      }
    };
    getAlerts();
  }, []);
  return (
    <div className="Alerts w-full  max-w-[520px] h-3/8 max-h-[375px] p-2 border border-black overflow-y-scroll">
      <h1 className="text-center text-2xl font-bold">Alerts</h1>
      {alerts.length === 0 && <p>There are no alerts to display.</p>}
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <div className="p-1" key={alerts.indexOf(alert)}>
              <p className="text-lg font-semibold">{alert.title}</p>
              <p className="italic">
                {moment(alert.lastIndexedDate).format('MMM Do YY')}
              </p>
              <p>{alert.description}</p>
            </div>
          );
        })}
    </div>
  );
};

export default Alerts;
