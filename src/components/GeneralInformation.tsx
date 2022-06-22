type parkProps = {
  park: {
    fullName?: string;
    states?: string;
    url?: string;
    directionsUrl?: string;
    latitude?: number;
    longitude?: number;
    description?: string;
    weatherInfo?: string;
    images?: [{ url: string; altText: string }];
  };
};

const GeneralInformation = ({ park }: parkProps) => {
  return (
    <div className="GeneralInfo w-full  max-w-[520px] border border-black rounded bg-white">
      {park.images && (
        <img
          className="rounded-tr-[.19rem] rounded-tl-[.19rem]"
          src={park.images[0].url}
          alt={park.images[0].altText}
        ></img>
      )}
      <p className="p-1">{park.description}</p>
      <div className="p-2 pb-4 flex justify-around">
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
