
import React, { useEffect, useState } from 'react'

import NewsItem from './NewsItem';

const NewsBoard = ({category}) => {

    const [articles,setArticles] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
        const url = `/api/top-headlines?category=${category}`;

        fetch(url)
            .then(async response => {
                const contentType = response.headers.get('content-type');
                const body = contentType && contentType.includes('application/json')
                    ? await response.json()
                    : await response.text();

                if (!response.ok) {
                    const apiMessage = body && body.message ? body.message : body;
                    const message = response.status === 426
                        ? `Server returned 426 Upgrade Required. This app needs a backend proxy for NewsAPI. ${apiMessage || ''}`
                        : `HTTP error ${response.status}: ${apiMessage || response.statusText}`;
                    throw new Error(message);
                }

                return body;
            })
            .then(data => {
                if (data.status === 'ok' && data.articles) {
                    setArticles(data.articles);
                } else {
                    const message = data.message || 'No articles found.';
                    throw new Error(message);
                }
            })
            .catch(error => {
                console.error('Error fetching news:', error);
                setError(error.message);
                setArticles([]);
            });
    },[category])
  return (
    <div style={{background:"linear-gradient(black)" }}> 
      <h2 className='text-center' style={{color:"white"}}>Latest <span className='badge bg-danger'>News</span></h2>
      {error && (
        <div className='alert alert-warning text-center' role='alert' style={{color: 'white', backgroundColor: '#8a1f1f'}}>
          {error}
        </div>
      )}
      {articles.map((news,index)=>{
        return <NewsItem key={index} title={news.title} description={news.description} src={news.urlToImage} url={news.url}/>
      })}
    </div>
  )
}

export default NewsBoard
