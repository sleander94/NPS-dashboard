import { ParkProp } from './ParkPage';

const hideSearch = () => {
  const suggs = document.getElementById('searchSuggs');
  if (suggs !== null) {
    suggs.classList.add('hidden');
    suggs.classList.remove('visible');
  }
};

const ParkNav = ({ park }: ParkProp) => {
  return (
    <div
      className="ParkNav mt-3 w-full h-[84px] lg:h-[46px] text-center sticky top-0 bg-white border-b sm:border-b-0 border-black"
      onClick={() => hideSearch()}
    >
      <a
        href="#info"
        className=" block text-xl p-2 font-bold bg-[#97c64b] border-b border-t border-black"
      >
        {park.fullName}
      </a>
      <div className="LinkContainer w-full lg:hidden p-2 border-black border-b flex justify-between items-center bg-white">
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#news">News</a>
        <a href="#campgrounds">Campgrounds</a>
      </div>
    </div>
  );
};

export default ParkNav;
