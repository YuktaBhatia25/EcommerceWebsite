import { useState, useEffect } from 'react';

export const useFetch = (initialUrl, callback=null) => {
  const [url, setUrl] = useState(initialUrl || null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      if(!url) return;  
      
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          setError('Failed to fetch data');
          setData(null);
        } else {
          const result = await response.json();
          setData(result);
          if(callback) {
            callback(result);
          }
          setError(null);
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(error.message);
          setData(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);
  
  return { data, error, isLoading, setUrl };
};
