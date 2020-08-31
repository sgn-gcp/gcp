import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Label,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react';

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

  const handleChange = (e, {name, value}) => {
    setItem({ [name]: value })
    console.log(value)
    console.log(name)
    console.log((e))
  }
  // handleChange = (e, { name, value }) => this.setState({ [name]: value })

  const ContactCard = () => {
    return (
      <>
        <h1>
          PhoneBook &gt; {item.firstName || ''} {item.surname || ''}
        </h1>
        {/* <Fabric> */}
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>First name</Label>
              <Input placeholder='First name' value={item.firstName} name='firstName' onChange={handleChange}/>
            </Form.Field>
            <Form.Field>
              <Label>Notes</Label>
              <TextArea placeholder='Notes' value={item.notes} name='notes' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Surname</Label>
              <Input placeholder='Surname' value={item.surname} name='surname' />
            </Form.Field>
            <Form.Field>
              <Label>Description</Label>
              <TextArea placeholder='Description' value={item.description} name='description' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Address</Label>
              <Input placeholder='Address' value={item.address} name='address' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>LDZ</Label>
              <Input placeholder='LDZ' value={item.ldz} name='ldz' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Office Number</Label>
              <Input placeholder='Office Number' value={item.officeNumber} name='officeNumber' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Mobile</Label>
              <Input placeholder='Surname' value={item.mobile} name='mobile' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Pager</Label>
              <Input placeholder='Pager' value={item.page} name='page' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Fax</Label>
              <Input placeholder='Fax' value={item.fax} name='fax' />
            </Form.Field>
          </Form.Group>

          <Form.Field control={Button}>SAVE</Form.Field>
        </Form>
      </>
    );
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
