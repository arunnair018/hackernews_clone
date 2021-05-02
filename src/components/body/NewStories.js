import axios from "axios";
import timeago from "../../utilities";
import React, { useState, useEffect } from "react";

const NewStories = () => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [stories, setStories] = useState([]);
  const [storyItem, setStoryItem] = useState([]);

  const fetchStories = () => {
    axios
      .get("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty")
      .then((resp) => {
        setStories(resp.data);
        fetchStoryItems(resp.data);
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to get stories.");
      });
  };

  const fetchStoryItems = (stories) => {
    let promises = [];
    stories.slice((page - 1) * limit, page * limit).forEach((story) => {
      promises.push(
        axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
        )
      );
    });
    Promise.all(promises).then((stories) => {
      stories = stories.map((value) => value.data);
      setStoryItem([...storyItem, ...stories]);
    });
  };

  useEffect(() => {
    fetchStories();
    return () => {};
  }, []);

  console.log(storyItem[0]);

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
                  <a href={story.url} className="nostyle" target="_blank">
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
        {page < stories.length / limit && storyItem.length > 0 && (
          <center>
            <button
              type="button"
              className="btn btn-primary btn-rounded"
              onClick={() => {
                setPage(page + 1);
                fetchStoryItems(stories);
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

export default NewStories;
