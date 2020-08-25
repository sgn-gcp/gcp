import React from 'react'

import LogBookAPI from '../../Api/LogBookAPI'

function LogEntry(props) {
  const logEntry = LogBookAPI.get(
    parseInt(props.match.params.logBookId, 10)
  )
  if (!logEntry) {
    return <div>Sorry, but that log was not found</div>
  }
  return (
    <div>
      <h1>#{logEntry.logBookId}: {logEntry.title}</h1>
      <p>{logEntry.description}</p>
    </div>
  )
}

export default LogEntry