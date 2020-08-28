/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPhoneBookEntry = /* GraphQL */ `
  query GetPhoneBookEntry($id: ID!) {
    getPhoneBookEntry(id: $id) {
      id
      firstName
      surname
      ldz
      homeNumber
      officeNumber
      mobile
      page
      fax
      notes
      address
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPhoneBookEntrys = /* GraphQL */ `
  query ListPhoneBookEntrys(
    $filter: ModelPhoneBookEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPhoneBookEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        surname
        ldz
        homeNumber
        officeNumber
        mobile
        page
        fax
        notes
        address
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
