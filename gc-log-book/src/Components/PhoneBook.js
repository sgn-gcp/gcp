import React from 'react'
import { Route, Switch } from 'react-router-dom'

import FullPhoneBook from './PhoneBook/FullPhoneBook'
import PhoneEntry from './PhoneBook/PhoneEntry'
import CreatePhoneEntry from './PhoneBook/CreatePhoneEntry'

function PhoneBook() {
  return (
    <Switch>
      <Route exact path='/phonebook' component={FullPhoneBook}/>
      <Route path='/phonebook/create' component={CreatePhoneEntry}/>
      <Route path='/phonebook/:phoneBookId' component={PhoneEntry}/>
    </Switch>
  )
}

export default PhoneBook
