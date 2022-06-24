import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type ParksInfo = {
  parksInfo: Array<any>;
};

export const hideSearch = () => {
  const suggs = document.getElementById('searchSuggs');
  if (suggs !== null) {
    suggs.classList.add('hidden');
    suggs.classList.remove('visible');
  }
};

const Searchbar = ({ parksInfo }: ParksInfo) => {
  const [searchVal, setSearchVal] = useState('');
  const [searchCode, setSearchCode] = useState('');

  useEffect(() => {
    parksInfo.forEach((park) => {
      if (park.name.toLocaleLowerCase() === searchVal.toLocaleLowerCase()) {
        setSearchCode(park.parkCode);
      }
    });
  }, [searchVal]);

  const showSearch = () => {
    const suggs = document.getElementById('searchSuggs');
    if (suggs !== null) {
      suggs.classList.add('visible');
      suggs.classList.remove('hidden');
    }
  };

  const navigate = useNavigate();

  const trySearch = () => {
    parksInfo.forEach((park) => {
      if (searchCode === park.parkCode) {
        navigate(`/parks/${searchCode}`);
      }
    });
  };

  return (
    <form
      className="Searchbar grid justify-items-center items-center"
      onClick={() => showSearch()}
    >
      <div className="SearchBox w-full h-[4.5rem] grid p-3 rounded bg-neutral-200/40">
        <input
          type="text"
          className="SearchInput w-full p-1 border-r-0 rounded rounded-br-none rounded-tr-none focus:outline-none"
          value={searchVal}
          placeholder="Enter a park name"
          onChange={(e) => setSearchVal(e.target.value)}
          onClick={() => showSearch()}
        ></input>
        <button
          type="button"
          className="SearchButton w-full min-w-[60px] p-1 flex justify-center items-center col-start-2 col-end-3 border-l-0 rounded rounded-bl-none rounded-tl-none bg-[#3A736C] text-white hover:bg-[#6BBDC6] hover:text-black text-center text-xl"
          onClick={() => trySearch()}
        >
          <div>Search</div>
        </button>
      </div>
      <div
        id="searchSuggs"
        className="SearchSuggestions w-full max-h-[60vh] overflow-y-scroll rounded justify-self-center bg-white grid"
      >
        {parksInfo
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
              <Link
                className="Suggestion border border-black border-t-0 p-1 hover:bg-[#3A736C] hover:text-white"
                to={`/parks/${park.parkCode}`}
                key={parksInfo.indexOf(park)}
              >
                {park.name}
              </Link>
            );
          })}
      </div>
    </form>
  );
};

export default Searchbar;
