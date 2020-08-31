import React from "react";
import { Link } from "react-router-dom";

import LogBookAPI from "../../Api/LogBookAPI";

const LogBookLink = ({ logBookId, title }) => (
  <li key={logBookId}>
    <Link to={`/logbook/${logBookId}`}>
      {logBookId}: {title}
    </Link>
  </li>
);

function FullLogBook() {
  return (
    <div>
      <h1>LogBook</h1>
      <div>
        <ul>{LogBookAPI.all().map((log) => LogBookLink(log))}</ul>
      </div>
    </div>
  );
}

export default FullLogBook;
