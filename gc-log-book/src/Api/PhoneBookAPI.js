import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../graphql/queries'

const PhoneBookAPI = {
    phoneBookData: [
      { id: 1, firstName: "Adam", surname: "Sinnott", address: "New Cottage, The Park, Droxford, SO32 3QQ", homeNumber: "07555272085" },
    ],
    all: function() { API.graphql(graphqlOperation(queries.listPhoneBookEntrys))
    },
    // get: async function(id) {
    //   await API.graphql(graphqlOperation(queries.getPhoneBookEntry(id)))
    //   // const isPhoneBookEntry = phoneEntry => phoneEntry.phoneBookId === id
    //   // return this.phoneBookData.find(isPhoneBookEntry)
    // }
  }
  
  export default PhoneBookAPI