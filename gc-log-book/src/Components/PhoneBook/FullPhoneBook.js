import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'

const PhoneBookLink = ( phoneBookEntry, index ) => (
  <li key={phoneBookEntry.id}>
    <Link to={`/phonebook/${phoneBookEntry.id}`}>
      {index+1}: {phoneBookEntry.firstName} {phoneBookEntry.surname}
    </Link>
  </li>
);

function FullPhoneBook() {
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.graphql(graphqlOperation(queries.listPhoneBookEntrys));
        setItems(response.data.listPhoneBookEntrys.items)
      } catch (err) {
        console.log("Unfortunately there was an error getting the data: " + JSON.stringify(err))
        console.log(err)
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <ul>{
        items.map((item, index) => {
          return PhoneBookLink(item, index)
        })
      }</ul>
    </div>
  );
}

export default FullPhoneBook;
