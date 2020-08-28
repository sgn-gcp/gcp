import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'

const PhoneEntryFromRouter = ({
  match: {
    params: { phoneBookId },
  },
}) => PhoneEntry(phoneBookId);

function PhoneEntry(phoneBookId) {
  // const phoneEntry = PhoneBookAPI.get(phoneBookId);
  const [item, setItem] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.graphql(graphqlOperation(
          queries.getPhoneBookEntry, 
          {id: phoneBookId }))
        setItem(response.data.getPhoneBookEntry)
      } catch (err) {
        console.log("Unfortuantely there was an error in getting the data: " + JSON.stringify(err))
        console.log(err)
      }
    }
    fetchData()
  }, [phoneBookId])

  if (!item) {
    return <div>Sorry, but that log was not found</div>;
  }

  return (
    <div>
      <h1>
        #Name {item.firstName} {item.surname}
      </h1>
      <p>Address: {item.address}</p>
      <p>Home Number: {item.homeNumber}</p>
      <p>LDZ: {item.ldz}</p>
      <p>Office Number:{item.officeNumber}</p>
      <p>Mobile: {item.mobile}</p>
      <p>Pager: {item.page}</p>
      <p>Fax: {item.fax}</p>
      <p>Notes: {item.notes}</p>
      <p>Description: {item.description}</p>
      <p>First Created: {item.createdAt}</p>
      <p>Last Updated: {item.updatedAt}</p>
    </div>
  );
}

export default PhoneEntryFromRouter;
