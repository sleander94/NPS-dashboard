import React, { useEffect, useState } from 'react';
import ParkPage from './components/ParkPage';

const App = () => {
  const [parksInfo, setParksInfo] = useState<any[]>([]);
  const [searchVal, setSearchVal] = useState('');

  const NPSKey = 'GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf';

  useEffect(() => {
    const getParksInfo = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?limit=999&api_key=${NPSKey}`
        );
        const data = await response.json();
        console.log(data);
        setParksInfo(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getParksInfo();
  }, []);

  return (
    <div className="App">
      <input
        type="text"
        className="border border-black m-4"
        onChange={(e) => setSearchVal(e.target.value)}
      ></input>
      <button className="border border-black m-4">Search</button>
      {/*   <ParkPage parkCode="arch"></ParkPage> */}

      {parksInfo
        .filter((park) => {
          if (searchVal === '') {
            return park;
          } else if (
            park.name
              .toLocaleLowerCase()
              .includes(searchVal.toLocaleLowerCase())
          ) {
            return park;
          }
        })
        .map((park) => {
          return <div key={parksInfo.indexOf(park)}>{park.name}</div>;
        })}
    </div>
  );
};

export default App;
