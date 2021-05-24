import axios from "axios";
import timeago from "../../utilities/Timeago";
import React, { useState, useEffect } from "react";
import useFetch from "../../utilities/Usefetch";
import Pagination from "./Pagination";
import LoadingIcon from "./LoadingIcon";
import { Redirect } from "react-router";
import { storyTypes } from "../../utilities/Constants";
const Stories = ({ type }) => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [storyItem, setStoryItem] = useState([]);
  const [storyIndex, totalPages] = useFetch(type);

  useEffect(() => {
    setLoading(true);
    setStoryItem([]);
    setPage(1);
  }, [type]);

  useEffect(() => {
    Promise.all(
      storyIndex.slice((page - 1) * limit, page * limit).map((story) => {
        return axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${story}.json?print=pretty`
        );
      })
    ).then((values) => {
      let newStories = values.map((value) => value.data);
      setStoryItem(newStories);
      setLoading(false);
    });
    return () => {
      setLoading(true);
      setStoryItem([]);
    };
  }, [storyIndex, page]);

  console.log(storyItem);
  if (!Object.values(storyTypes).includes(type)) {
    return <Redirect to="/" />;
  }
  return (
    <>
      <div className="container mb-5">
        {loading && storyItem.length === 0 && (
          <center>
            <LoadingIcon />
          </center>
        )}
        <ol className="list-group list-group-numbered mt-5 mb-5">
          {storyItem.length > 0 &&
            storyItem.map((story) => {
              if (story)
                return (
                  <li
                    key={story.id}
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
                        by {story.by} <b>&middot;</b> {story.descendants}{" "}
                        comments
                      </div>
                    </div>
                    <span className="badge bg-primary rounded-pill">
                      {timeago(story.time)}
                    </span>
                  </li>
                );
              return "";
            })}
        </ol>

        {storyItem.length > 0 && (
          <Pagination totalPages={totalPages} page={page} setPage={setPage} />
        )}
      </div>
    </>
  );
};

export default Stories;
