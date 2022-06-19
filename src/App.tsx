import React, { useEffect, useState } from 'react';

const App = () => {
  const [parksInfo, setParksInfo] = useState<any[]>([]);

  const NPSKey = 'GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf';

  useEffect(() => {
    const getParksInfo = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/parks?limit=999&api_key=${NPSKey}`
        );
        const data = await response.json();
        setParksInfo(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getParksInfo();
  }, []);

  return (
    <div className="App">
      {/* {parksInfo.length > 0 && (
        <div className="p-4 text-xl">
          {parksInfo.map((park) => {
            return (
              <div key={parksInfo.indexOf(park)}>
                {parksInfo.indexOf(park)}. Name: {park.name} Code:{' '}
                {park.parkCode}
              </div>
            );
          })} 
        </div> 
      )} */}
    </div>
  );
};

export default App;
