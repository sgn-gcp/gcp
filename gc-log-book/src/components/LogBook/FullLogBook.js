import React from 'react'
import { Link } from 'react-router-dom'

import LogBookAPI from '../../Api/LogBookAPI'

function FullLogBook() {
  return (
    <div>
      <ul>
        {
          LogBookAPI.all().map(log => (
            <li key={log.logBookId}>
              <Link to={`/logbook/${log.logBookId}`}>{log.logBookId}: {log.title}</Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FullLogBook