import axios from "axios";
import timeago from "../../utilities/Timeago";
import React, { useState, useEffect, useRef } from "react";
import useFetch from "../../utilities/Usefetch";
import getPagination from "../../utilities/GetPagination";
const Stories = ({ type }) => {
  const limit = 10;
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [storyItem, setStoryItem] = useState([]);
  const [storyIndex, totalPages] = useFetch(type);
  const prevType = useRef(type);

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
    return async () => {
      setLoading(true);
      setStoryItem([]);
      if (prevType.current !== type) {
        console.log("cleanUp on type change");
        setPage(1);
      }
      console.log("cleanUp callback");
      prevType.current = type;
    };
  }, [type, storyIndex, page]);

  console.log(storyItem);

  return (
    <>
      <div className="container mb-5">
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
          <nav>
            <ul className="pagination justify-content-center align-items-center">
              <li className="page-item cursor">
                <span
                  className="page-link"
                  onClick={() => {
                    setPage(1);
                  }}
                >
                  {"<<"}
                </span>
              </li>
              {getPagination(totalPages, page).map((pageOffset) => {
                return (
                  <li
                    key={pageOffset}
                    className={`page-item cursor ${
                      pageOffset === page ? "active" : ""
                    }`}
                  >
                    <span
                      className="page-link"
                      onClick={() => {
                        setPage(pageOffset);
                      }}
                    >
                      {pageOffset}
                    </span>
                  </li>
                );
              })}
              <li className="page-item cursor">
                <span
                  className="page-link"
                  onClick={() => {
                    setPage(totalPages);
                  }}
                >
                  {">>"}
                </span>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default Stories;
