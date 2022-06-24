import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hideSearch } from './Searchbar';

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const clearSearchAndHide = (name: string) => {
    setSearchVal('');
    hideSearch();
  };

  return (
    <form className="Searchbar w-full lg:w-2/3 max-w-[800px] relative grid justify-items-center items-center">
      <div className="SearchBox w-full grid rounded border-black border">
        <input
          type="text"
          className="SearchInput w-full p-1 border-r border-black rounded rounded-tr-none rounded-br-none rounded-bl-[.19rem] rounded-tl-[.19rem] focus:outline-none"
          value={searchVal}
          placeholder="Find another park"
          onChange={(e) => setSearchVal(e.target.value)}
          onClick={() => showSearch()}
        ></input>
        <button
          type="button"
          className="SearchButton w-full min-w-[60px] p-1 flex justify-center items-center col-start-2 col-end-3 border-l-0 rounded rounded-tl-none rounded-bl-none rounded-tr-[.19rem] rounded-br-[.19rem] bg-[#3A736C] text-white hover:bg-[#6BBDC6] hover:text-black text-center text-xl"
          onClick={() => trySearch()}
        >
          <div>Search</div>
        </button>
      </div>
      <div
        id="searchSuggs"
        className="SearchSuggestions absolute top-[38px] z-20 w-full max-h-[60vh] overflow-y-scroll rounded justify-self-center bg-white grid hidden"
      >
        {parksInfo
          .filter((park) => {
            if (
              park.name
                .toLocaleLowerCase()
                .includes(searchVal.toLocaleLowerCase())
            ) {
              return park;
            } else {
              return false;
            }
          })
          .map((park) => {
            return (
              <Link
                className="Suggestion border border-black border-t-0 p-1 hover:text-white hover:bg-[#3A736C]"
                to={`/parks/${park.parkCode}`}
                onClick={() => clearSearchAndHide(park.name)}
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
