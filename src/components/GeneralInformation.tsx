import { ParkProp } from './ParkPage';

const GeneralInformation = ({ park }: ParkProp) => {
  return (
    <div className="GeneralInfo lg:max-w-[640px] lg:h-full overflow-y-scroll w-full col-start-2 border border-black rounded bg-white">
      {park.images && (
        <img
          className="block ml-auto mr-auto w-full lg:max-h-[50%] lg:w-auto lg:max-w-full rounded-tr-[.19rem] rounded-tl-[.19rem]"
          src={park.images[0].url}
          alt={park.images[0].altText}
        ></img>
      )}
      <p className="p-1">{park.description}</p>
      <div className="p-2 pb-4 flex justify-around items-center">
        <a
          className="rounded pl-1 pr-1 border-2 border-[#97c64b] font-semibold"
          href={park.url}
          target="_blank"
        >
          NPS Website
        </a>
        <a
          className="rounded pl-1 pr-1 border-2 border-[#97c64b] font-semibold"
          href={park.directionsUrl}
          target="_blank"
        >
          Directions
        </a>
      </div>
      <h2 className="text-center font-bold">Typical Conditions</h2>
      <p className="p-2">{park.weatherInfo}</p>
    </div>
  );
};

export default GeneralInformation;
