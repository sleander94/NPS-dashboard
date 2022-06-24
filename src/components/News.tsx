import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

type ParkCode = { parkCode: string };

const News = () => {
  let { parkCode } = useParams<ParkCode>();
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/newsreleases?limit=10parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setNews(data.data);
      } catch (e) {
        console.error(e);
      }
    };
    getNews();
  }, [parkCode]);
  return (
    <div
      id="news"
      className="relative lg:col-start-3 lg:row-start-1 lg:min-h-[50%]  lg:overflow-y-scroll w-full lg:max-w-[640px] border border-black border-b-0 lg:border-b rounded bg-white rounded"
    >
      <h1 className="lg:sticky lg:top-0 text-center text-2xl font-bold bg-[#3A736C] text-white rounded-tr-[.19rem] rounded-tl-[.19rem] border-b border-black">
        News
      </h1>
      {news.length === 0 && (
        <p className="border-b border-black">There is no news to display.</p>
      )}
      {news.length > 0 &&
        news.map((story) => {
          return (
            <div
              className="lg:border-none p-1 border-b border-black"
              key={news.indexOf(story)}
            >
              <p className="text-lg font-semibold">{story.title}</p>
              <p className="italic text-sm">
                {moment(story.lastIndexedDate).format('MMM Do YY')}
              </p>
              <img
                className="block ml-auto mr-auto w-full"
                src={story.image.url}
                alt={story.image.altText}
              ></img>
              <p className="mb-1">{story.abstract}</p>
              <a
                className="rounded p-1 border-2 bg-[#3A736C] text-white"
                href={story.url}
                target="_blank"
              >
                Learn More
              </a>
              <div className="lg:border-b lg:border-gray-400 lg:pt-2"></div>
            </div>
          );
        })}
    </div>
  );
};

export default News;
