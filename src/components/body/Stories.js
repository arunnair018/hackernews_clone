import axios from "axios";
import timeago from "../../utilities/Timeago";
import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../utilities/Usefetch";
const Stories = ({ type }) => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [storyItem, setStoryItem] = useState([]);
  const [storyIndex, totalCount] = useFetch(type);
  const prevType = useRef("");

  useEffect(() => {
    setLoading(true);
    Promise.all(
      storyIndex.slice((page - 1) * limit, page * limit).map((story) => {
        return axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
        );
      })
    ).then((values) => {
      let newStories = values.map((value) => value.data);
      setStoryItem((storyItem) => [...storyItem, ...newStories]);
      setLoading(false);
    });
    return () => {
      if (prevType.current !== type) {
        setPage(1);
        setStoryItem([]);
      }
      prevType.current = type;
    };
  }, [page, storyIndex, type]);

  return (
    <>
      <div className="container mb-5">
        <ol className="list-group list-group-numbered mt-5 mb-5">
          {storyItem.map((story) => {
            return (
              <li
                key={Math.random()}
                className="list-group-item d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <a
                    href={story.url || "#"}
                    className="nostyle"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="fw-bold">{story.title}</div>
                  </a>
                  <div>
                    by {story.by} <b>&middot;</b> {story.descendants} comments
                  </div>
                </div>
                <span className="badge bg-primary rounded-pill">
                  {timeago(story.time)}
                </span>
              </li>
            );
          })}
        </ol>
        {loading && (
          <center>
            <div className="loadingio-spinner-bars-ou4wi5t900s">
              <div className="ldio-hy4ytz1hdz">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </center>
        )}
        {page < totalCount / limit && storyItem.length > 0 && (
          <center>
            <button
              type="button"
              className="btn btn-primary btn-rounded"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              Load More
            </button>
          </center>
        )}
      </div>
    </>
  );
};

export default Stories;
