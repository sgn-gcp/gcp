import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="">
      <nav>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/logbook'>LogBook</Link></li>
          <li><Link to='/phonebook'>PhoneBook</Link></li>
          <li><Link to='/about'>About</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
