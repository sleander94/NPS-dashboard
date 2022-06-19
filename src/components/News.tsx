import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type NewsParams = { parkCode: string };

const News = () => {
  let { parkCode } = useParams<NewsParams>();
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    const getNews = async () => {
      try {
        const response = await fetch(
          `https://developer.nps.gov/api/v1/newsreleases?parkCode=${parkCode}&api_key=GutNTqgBFaepYpX1aGjggwDBjLiKJk8PMDCUnXsf`
        );
        const data = await response.json();
        setNews(data.data);
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    };
    getNews();
  }, []);
  return (
    <div className="w-1/3 p-2 border border-black overflow-y-scroll h-3/6">
      <h1 className="text-center text-2xl font-bold">News</h1>
      {news.length > 0 &&
        news.map((story) => {
          return (
            <div className="p-1" key={news.indexOf(story)}>
              <p className="text-lg font-semibold">{story.title}</p>
              <p>{story.lastIndexedDate}</p>
              <p>{story.abstract}</p>
              <img src={story.image.url} alt={story.altText}></img>
              <a href={story.url}>Learn More</a>
            </div>
          );
        })}
    </div>
  );
};

export default News;
