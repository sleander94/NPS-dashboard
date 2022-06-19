import React, { useEffect, useState } from 'react';
import Searchbar from './components/Searchbar';

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
      <Searchbar parksInfo={parksInfo}></Searchbar>
    </div>
  );
};

export default App;
