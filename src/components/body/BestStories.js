import axios from "axios";
import timeago from "../../utilities";
import React, { useState, useEffect } from "react";
var totalItems = 0;
const BestStories = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [storyItem, setStoryItem] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await axios.get(
        "https://hacker-news.firebaseio.com/v0/beststories.json?print=pretty"
      );
      totalItems = response.data.length;
      Promise.all(
        response.data.slice((page - 1) * limit, page * limit).map((story) => {
          return axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
          );
        })
      ).then((values) => {
        let newStories = values.map((value) => value.data);
        setStoryItem((storyItem) => [...storyItem, ...newStories]);
      });
    })();
  }, [page]);

  return storyItem.length > 0 ? (
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
                    href={story.url}
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
        {page < totalItems / limit && storyItem.length > 0 && (
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
  ) : (
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
  );
};

export default BestStories;
