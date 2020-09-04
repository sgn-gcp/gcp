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
export const getLogBookEntry = /* GraphQL */ `
  query GetLogBookEntry($id: ID!) {
    getLogBookEntry(id: $id) {
      id
      title
      raisedBy
      areaAffectd
      severity
      description
      notes
      createdAt
      updatedAt
    }
  }
`;
export const listLogBookEntrys = /* GraphQL */ `
  query ListLogBookEntrys(
    $filter: ModelLogBookEntryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLogBookEntrys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        raisedBy
        areaAffectd
        severity
        description
        notes
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
