/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPhoneBookEntry = /* GraphQL */ `
  mutation CreatePhoneBookEntry(
    $input: CreatePhoneBookEntryInput!
    $condition: ModelPhoneBookEntryConditionInput
  ) {
    createPhoneBookEntry(input: $input, condition: $condition) {
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
export const updatePhoneBookEntry = /* GraphQL */ `
  mutation UpdatePhoneBookEntry(
    $input: UpdatePhoneBookEntryInput!
    $condition: ModelPhoneBookEntryConditionInput
  ) {
    updatePhoneBookEntry(input: $input, condition: $condition) {
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
export const deletePhoneBookEntry = /* GraphQL */ `
  mutation DeletePhoneBookEntry(
    $input: DeletePhoneBookEntryInput!
    $condition: ModelPhoneBookEntryConditionInput
  ) {
    deletePhoneBookEntry(input: $input, condition: $condition) {
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
