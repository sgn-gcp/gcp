import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import {
  Button,
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
}) => {return (<PhoneEntry phoneBookId={phoneBookId}/>)}

class PhoneEntry extends React.Component {

  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      item: {},
      phoneBookId: this.props.phoneBookId
    };
  }
  
  fetchData = async () => {
    try {
      const response = await API.graphql(
        graphqlOperation(queries.getPhoneBookEntry, { id: this.state.phoneBookId })
      );
      this.setState({item: response.data.getPhoneBookEntry});
    } catch (err) {
      console.log(
        'Unfortuantely there was an error in getting the data: ' +
          JSON.stringify(err)
      );
      console.log(err);
    }
  }

  handleChange = (e, name) => {
    console.log(JSON.stringify(name))
    console.log((e))
    console.log((e))
  }

  render () {
    // if (!this.state.item) {
    //   return <div>Sorry, but that log was not found</div>;
    // }

    return (
      <div>
         <h1>
          PhoneBook &gt; {this.state.item.firstName || ''} {this.state.item.surname || ''}
        </h1>
        {/* <Fabric> */}
        <Form>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>First name</Label>
              <Input placeholder='First name' value={this.state.item.firstName} name='firstName' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <Label>Notes</Label>
              <TextArea placeholder='Notes' value={this.state.item.notes} name='notes' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Surname</Label>
              <Input placeholder='Surname' value={this.state.item.surname} name='surname' />
            </Form.Field>
            <Form.Field>
              <Label>Description</Label>
              <TextArea placeholder='Description' value={this.state.item.description} name='description' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Address</Label>
              <Input placeholder='Address' value={this.state.item.address} name='address' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>LDZ</Label>
              <Input placeholder='LDZ' value={this.state.item.ldz} name='ldz' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Office Number</Label>
              <Input placeholder='Office Number' value={this.state.item.officeNumber} name='officeNumber' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Mobile</Label>
              <Input placeholder='Surname' value={this.state.item.mobile} name='mobile' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Pager</Label>
              <Input placeholder='Pager' value={this.state.item.page} name='page' />
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Fax</Label>
              <Input placeholder='Fax' value={this.state.item.fax} name='fax' />
            </Form.Field>
          </Form.Group>

          <Form.Field control={Button}>SAVE</Form.Field>
        </Form>
      </div>
    );
  }
}

export default PhoneEntryFromRouter;
