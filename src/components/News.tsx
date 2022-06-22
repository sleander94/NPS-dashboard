import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';

type NewsParams = { parkCode: string };

const News = () => {
  let { parkCode } = useParams<NewsParams>();
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
      className="w-full max-w-[520px] border border-black border-b-0 rounded bg-white rounded"
    >
      <h1 className="text-center text-2xl font-bold bg-[#97c64b] rounded-tr-[.19rem] rounded-tl-[.19rem] border-b border-black">
        News
      </h1>
      {news.length === 0 && (
        <p className="border-b border-black">There is no news to display.</p>
      )}
      {news.length > 0 &&
        news.map((story) => {
          return (
            <div
              className="p-1 border-b border-black"
              key={news.indexOf(story)}
            >
              <p className="text-lg font-semibold">{story.title}</p>
              <p className="italic text-sm">
                {moment(story.lastIndexedDate).format('MMM Do YY')}
              </p>
              <img src={story.image.url} alt={story.image.altText}></img>
              <p>{story.abstract}</p>
              <a
                className="rounded pl-1 pr-1 border-2 border-[#97c64b] font-semibold"
                href={story.url}
              >
                Learn More
              </a>
            </div>
          );
        })}
    </div>
  );
};

export default News;
