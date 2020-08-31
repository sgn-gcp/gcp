import React from "react";

import LogBookAPI from "../../Api/LogBookAPI";

const LogEntryFromRouter = ({
  match: {
    params: { logBookId },
  },
}) => LogEntry(parseInt(logBookId, 10));

function LogEntry(logBookId) {
  const logEntry = LogBookAPI.get(logBookId);

  if (!logEntry) {
    return <div>Sorry, but that log was not found</div>;
  }

  return (
    <div>
      <h1>
        #{logEntry.logBookId}: {logEntry.title}
      </h1>
      <div>
        <p>{logEntry.description}</p>
      </div>
    </div>
  );
}

export default LogEntryFromRouter;
