import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import LogBook from './LogBook'
import Error from './Error'

function Main() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/logbook" component={LogBook} />
        <Route component ={Error} />
      </Switch>
    </main>
  );
}

export default Main