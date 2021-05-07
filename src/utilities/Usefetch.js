import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(type) {
  const [state, setstate] = useState([]);

  useEffect(() => {
    axios
      .get(`https://hacker-news.firebaseio.com/v0/${type}.json?print=pretty`)
      .then((resp) => {
        setstate(resp.data);
      })
      .catch((err) => console.log(err));
    return () => {
      setstate([]);
    };
  }, [type]);

  return [state, Math.floor(state.length / 10)];
}
