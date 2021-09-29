import axios from 'axios';
import { useState, useCallback } from 'react';

const useHttp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const sendRequest = useCallback(async (url) => {
    try {
      const response = await axios.get(url);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  }, []);

  return { loading, sendRequest, error };
};

export default useHttp;
