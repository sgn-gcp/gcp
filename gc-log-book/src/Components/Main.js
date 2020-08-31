import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Home'
import About from './About'
import LogBook from './LogBook'
import Error from './Error'
import PhoneBook from './PhoneBook'

function Main() {
  return (
    <main className="mainWrapper">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/logbook" component={LogBook} />
        <Route path="/phonebook" component={PhoneBook} />
        <Route component ={Error} />
      </Switch>
    </main>
  );
}

export default Main
