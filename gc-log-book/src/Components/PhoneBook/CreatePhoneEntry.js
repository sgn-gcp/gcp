import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import {
  Button,
  Form,
  Input,
  Label,
  Radio,
  Select,
  TextArea,
} from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';

const PhoneEntryFromRouter = ({
  match: {
    params: { phoneBookId },
  },
}) => {return (<PhoneEntry phoneBookId={phoneBookId}/>)}

class PhoneEntry extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      item: {},
      firstName: '',
      surname: '',
      address: '',
      ldz: '',
      officeNumber: '',
      mobile: '',
      page: '',
      fax: '',
      notes: '',
      description: '',
      createdAt: '',
      updatedAt: '',
      phoneBookId: '',
      redirectPage: false
    };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value})
  }

  handleSumbit = () => {
    console.log("submit");
    const data = {
      input: {
        firstName: this.state.firstName,
        surname: this.state.surname,
        ldz: this.state.ldz,
        homeNumber: this.state.homeNumber,
        officeNumber: this.state.officeNumber,
        mobile: this.state.mobile,
        page: this.state.page,
        fax: this.state.fax,
        notes: this.state.notes,
        address: this.state.address,
        description: this.state.description,
      }
    }
    API.graphql(graphqlOperation(mutations.createPhoneBookEntry, data))
    .then((response) => {
      console.log(response)
      this.setState({
        phoneBookId: response.data.createPhoneBookEntry.id,
        redirectPage: true
      })
      // history.push(`/phonebook/${response.data.createPhoneBookEntry.id}`)
    })
    .catch((err) => {
      console.log("There was an error setting the data: " + err)
      console.log(err)
    })
  }

  componentDidMount = () => {
    // this.fetchData()
  }

  render () {
    // if (!this.state.item) {
    //   return <div>Sorry, but that log was not found</div>;
    // }
    if (this.state.redirectPage === true) {
      return <Redirect to={`/phonebook/${this.state.phoneBookId}`}/>
    }

    return (
      <div>
         <h1>
          PhoneBook &gt; {this.state.firstName || ''} {this.state.surname || ''}
        </h1>
        {/* <Fabric> */}
        <Form onSubmit={this.handleSumbit}>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>First name</Label>
              <Input placeholder='First name' value={this.state.firstName || ''} name='firstName' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <Label>Notes</Label>
              <TextArea placeholder='Notes' value={this.state.notes || ''} name='notes' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Surname</Label>
              <Input placeholder='Surname' value={this.state.surname || ''} name='surname' onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
              <Label>Description</Label>
              <TextArea placeholder='Description' value={this.state.description || ''} name='description' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Address</Label>
              <Input placeholder='Address' value={this.state.address || ''} name='address' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>LDZ</Label>
              <Input placeholder='LDZ' value={this.state.ldz || ''} name='ldz' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Office Number</Label>
              <Input placeholder='Office Number' value={this.state.officeNumber || ''} name='officeNumber' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Mobile</Label>
              <Input placeholder='Surname' value={this.state.mobile || ''} name='mobile' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Pager</Label>
              <Input placeholder='Pager' value={this.state.page || ''} name='page' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Fax</Label>
              <Input placeholder='Fax' value={this.state.fax || ''} name='fax' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>First Created</Label>
              <Input placeholder='First Created' value={this.state.createdAt || ''} name='createdAt' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field>
              <Label>Last Updated</Label>
              <Input placeholder='Last Updated' value={this.state.updatedAt} name='updatedAt' onChange={this.handleChange}/>
            </Form.Field>
          </Form.Group>

          <Form.Field control={Button}>SAVE</Form.Field>
        </Form>
      </div>
    );
  }
}

export default PhoneEntryFromRouter;
