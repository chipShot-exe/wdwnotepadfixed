import React, { useState } from "react";
import Collapse from "react-bootstrap/Collapse";

export default function DisneyCollapse({ children, title }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-2" style={{ transition: " 0.5s ease-in-out 0.5s;" }}>
      <button
        className="btn btn-link fw-bold p-0 text-decoration-none shadow-none"
        onClick={() => setOpen(!open)}
        aria-controls="disney-collapse-text"
        aria-expanded={open}
        type="button"
      >
        <span className="me-1">
          <i
            className={`bi ${
              open ? "bi-caret-down-fill" : "bi-caret-right-fill"
            }`}
          ></i>
        </span>
        {title}
      </button>

      <Collapse in={open}>
        <div id="disney-collapse-text">
          <div className=" text-light mt-1 p-1 px-2 small fw-normal">
            {children}
          </div>
        </div>
      </Collapse>
    </div>
  );
}
