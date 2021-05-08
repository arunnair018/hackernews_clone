import React from "react";
import getPagination from "../../utilities/GetPagination";

const Pagination = ({ totalPages, page, setPage }) => {
  return (
    <>
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
    </>
  );
};

export default Pagination;
