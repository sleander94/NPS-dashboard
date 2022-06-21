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
  }, []);
  return (
    <div
      id="news"
      className="w-full max-w-[520px] h-3/8 max-h-[375px] p-2 border border-black rounded overflow-y-scroll h-3/6"
    >
      <h1 className="text-center text-2xl font-bold">News</h1>
      {news.length === 0 && <p>There is no news to display.</p>}
      {news.length > 0 &&
        news.map((story) => {
          return (
            <div className="p-1" key={news.indexOf(story)}>
              <p className="text-lg font-semibold">{story.title}</p>
              <p className="italic">
                {moment(story.lastIndexedDate).format('MMM Do YY')}
              </p>
              <p>{story.abstract}</p>
              <a href={story.url}>Learn More</a>
            </div>
          );
        })}
    </div>
  );
};

export default News;
