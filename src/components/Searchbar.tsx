import React, { useState, useEffect } from 'react';

type SearchbarProps = { parksInfo: Array<any> };

const Searchbar = ({ parksInfo }: SearchbarProps) => {
  const [searchVal, setSearchVal] = useState('');
  const [showParks, setShowParks] = useState(false);

  const search = (val: string) => {};

  const autofillSearch = (park: { name: string }) => {
    setShowParks(false);
    setSearchVal(park.name);
  };

  return (
    <div>
      <input
        id="searchInput"
        type="text"
        className="border border-black m-4"
        value={searchVal}
        onChange={(e) => setSearchVal(e.target.value)}
        onFocus={() => setShowParks(true)}
      ></input>
      <button
        className="border border-black m-4"
        onClick={() => search(searchVal)}
      >
        Search
      </button>
      {showParks &&
        parksInfo
          .filter((park) => {
            if (searchVal === '') {
              return;
            } else if (
              park.name
                .toLocaleLowerCase()
                .includes(searchVal.toLocaleLowerCase())
            ) {
              return park;
            }
          })
          .map((park) => {
            return (
              <div
                key={parksInfo.indexOf(park)}
                onClick={() => autofillSearch(park)}
              >
                {park.name}
              </div>
            );
          })}
    </div>
  );
};

export default Searchbar;
