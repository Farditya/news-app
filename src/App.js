import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '4e71c5e1ea8f49e48b35a5844cfe674b',
          },
        });
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Latest News</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {news.map((article, index)=>(
          <div key={index} className='bg-white p-4 rounded-lg shadow-lg'>
            <img src={article.urlToImage} alt={article.title} className='w-full h-48 object-cover rounded-t-lg'/>
            <h2 className='text-xl font-semibold mt-2'>{article.title}</h2>
            <p className='text-sm text-gray-600'>{article.description}</p>
            <a href={article.url} target='__blank' className='text-blue-500 mt-2 inline-block'>Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
