import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FullPhoneBook from './PhoneBook/FullPhoneBook'
import PhoneEntry from './PhoneBook/PhoneEntry'

function PhoneBook() {
  return (
    <Switch>
      <Route exact path='/phonebook' component={FullPhoneBook}/>
      <Route path='/phonebook/:phoneBookId' component={PhoneEntry}/>
    </Switch>
  )
}

export default PhoneBook
