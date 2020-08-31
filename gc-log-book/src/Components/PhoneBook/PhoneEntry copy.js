import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { Fabric, DefaultButton, TextField, Stack } from '@fluentui/react';

const PhoneEntryFromRouter = ({
  match: {
    params: { phoneBookId },
  },
}) => PhoneEntry(phoneBookId);

function PhoneEntry(phoneBookId) {
  // const phoneEntry = PhoneBookAPI.get(phoneBookId);
  // initializeIcons();
  console.log('render');
  const [item, setItem] = useState();
  const stackTokens = { childrenGap: 50 };
  const stackStyles = { width: 650 };
  // const iconProps = { iconName: 'Calendar' };
  const columnProps = {
    tokens: { childrenGap: 15 },
    styles: { root: { width: 300 } },
  };

  useEffect(() => {
    console.log('Usefeffect');
    async function fetchData() {
      try {
        const response = await API.graphql(
          graphqlOperation(queries.getPhoneBookEntry, { id: phoneBookId })
        );
        setItem(response.data.getPhoneBookEntry);
      } catch (err) {
        console.log(
          'Unfortuantely there was an error in getting the data: ' +
            JSON.stringify(err)
        );
        console.log(err);
      }
    }
    fetchData();
  }, [phoneBookId]);

  const ContactCard = () => {
    return (
      <>
        <h1>
          PhoneBook &gt; {item.firstName || ''} {item.surname || ''}
        </h1>
        {/* <Fabric> */}
        <Stack horizontal tokens={stackTokens} styles={stackStyles}>
          <Stack {...columnProps}>
            <TextField
              label='First Name'
              required
              defaultValue={item.firstName}
            />
            <TextField
              label='Surname'
              required
              value={item.surname || ''}
              onChange={handleChange}
            />
            <TextField label='Address' value={item.address || ''} />
            <TextField label='LDZ' defaultValue={item.ldz} />
            <TextField label='Office Number' defaultValue={item.officeNumber} />
            <TextField label='Mobile' defaultValue={item.mobile} />
            <TextField label='Pager' defaultValue={item.page} />
            <TextField label='Fax' defaultValue={item.fax} />
          </Stack>
          <Stack {...columnProps}>
            <TextField label='Notes' defaultValue={item.notes} />
            <TextField label='Description' defaultValue={item.description} />
            <TextField
              label='First Created'
              disabled
              defaultValue={item.createdAt}
            />
            <TextField
              label='Last Updated'
              disabled
              defaultValue={item.updatedAt}
            />
            <DefaultButton
              text='SAVE'
              // onClick={}
              allowDisabledFocus
              // disabled={}
              // checked={}
            />
          </Stack>
        </Stack>
        {/* </Fabric> */}
      </>
    );
  };

  const handleChange = (e) => {
    console.log('e');
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    console.log('Name: ' + name);
    setItem((prevItem) => {
      return { ...prevItem, surname: value };
    });
  };

  if (!item) {
    return <div>Sorry, but that log was not found</div>;
  }

  return (
    <div>
      <ContactCard />
    </div>
  );
}

export default PhoneEntryFromRouter;
