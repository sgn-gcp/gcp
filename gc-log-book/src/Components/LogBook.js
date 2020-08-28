import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FullLogBook from './LogBook/FullLogBook'
import LogEntry from './LogBook/LogEntry'

function LogBook() {
  return (
    <Switch>
      <Route exact path='/logbook' component={FullLogBook}/>
      <Route path='/logbook/:logBookId' component={LogEntry}/>
    </Switch>
  )
}

export default LogBook
