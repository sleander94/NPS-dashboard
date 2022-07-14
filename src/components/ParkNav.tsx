import { ParkProp } from './ParkPage';
import { hideSearch } from './Searchbar';

const ParkNav = ({ park }: ParkProp) => {
  let sections = document.querySelectorAll('section');
  let menu = document.querySelectorAll('.ParkNav a');
  window.onscroll = () => {
    sections.forEach((section) => {
      let top = window.scrollY;
      let offset = section.offsetTop - 91;
      let height = section.offsetHeight;
      let id = section.getAttribute('id');
      if (top >= offset && top < offset + height) {
        menu.forEach((link) => {
         link.classList.remove('active');
         if(!document.querySelector('.ParkNav a[href*=' + id + ']')!.classList.contains('info')) { 
          document
            .querySelector('.ParkNav a[href*=' + id + ']')!
            .classList.add('active');
         }
        });
      }
    });
  };
  return (
    <div
      className="ParkNav z-10 mt-3 w-full h-[84px] lg:h-[46px] text-center sticky top-0 bg-white border-b sm:border-b-0 border-black"
      onClick={() => hideSearch()}
    >
      <a
        href="#info"
        className="info block text-xl p-2 font-bold bg-[#3A736C] text-white border-b border-t border-black"
      >
        {park.fullName}
      </a>
      <div className="LinkContainer w-full p-2 border-black border-b flex justify-between lg:justify-around items-center bg-white">
        <a href="#weather">Weather</a>
        <a href="#alerts">Alerts</a>
        <a href="#news">News</a>
        <a href="#campgrounds">Campgrounds</a>
      </div>
    </div>
  );
};

export default ParkNav;
