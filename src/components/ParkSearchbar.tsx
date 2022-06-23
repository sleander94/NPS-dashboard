import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type SearchbarProps = {
  parksInfo: Array<any>;
};

const ParkPageSearchbar = ({ parksInfo }: SearchbarProps) => {
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
      suggs.classList.remove('hidden');
      suggs.classList.add('visible');
    }
  };

  const navigate = useNavigate();

  const trySearch = () => {
    parksInfo.forEach((park) => {
      if (searchCode === park.parkCode) {
        hideSearch();
        navigate(`/parks/${searchCode}`);
      }
    });
  };

  const hideSearch = () => {
    const suggs = document.getElementById('searchSuggs');
    if (suggs !== null) {
      suggs.classList.add('hidden');
      suggs.classList.remove('visible');
    }
  };

  const updateSearchAndHide = (name: string) => {
    setSearchVal(name);
    hideSearch();
  };

  return (
    <form className="Searchbar relative grid justify-items-center items-center">
      <div className="SearchBox w-full grid rounded border-black border">
        <input
          type="text"
          className="SearchInput w-full p-1 border-r border-black rounded rounded-tr-none rounded-br-none rounded-bl-[.19rem] rounded-tl-[.19rem] focus:outline-none"
          value={searchVal}
          placeholder="Search for another park"
          onChange={(e) => setSearchVal(e.target.value)}
          onClick={() => showSearch()}
        ></input>
        <button
          type="button"
          className="SearchButton w-full min-w-[60px] p-1 flex justify-center items-center col-start-2 col-end-3 border-l-0 rounded rounded-tl-none rounded-bl-none rounded-tr-[.19rem] rounded-br-[.19rem] bg-[#97c64b] hover:bg-[#7fa83e] text-center text-xl"
          onClick={() => trySearch()}
        >
          <div>Search</div>
        </button>
      </div>
      <div
        id="searchSuggs"
        className="SearchSuggestions absolute top-[38px] z-10 w-full max-h-[60vh] overflow-y-scroll rounded justify-self-center bg-white grid hidden"
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
                className="Suggestion border border-black border-t-0 p-1 hover:bg-[#97c64b]"
                to={`/parks/${park.parkCode}`}
                onClick={() => updateSearchAndHide(park.name)}
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

export default ParkPageSearchbar;
