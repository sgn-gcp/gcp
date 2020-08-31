import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { Redirect } from 'react-router-dom';
import * as mutations from '../../graphql/mutations';
import {
  Button,
  Form,
  Input,
  Label,
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
      phoneBookId: this.props.phoneBookId,
    };
  }
  
  fetchData = async () => {
    console.log("render")
    try {
      const response = await API.graphql(
        graphqlOperation(queries.getPhoneBookEntry, { id: this.state.phoneBookId })
      );
      let item = response.data.getPhoneBookEntry
      this.setState({
        firstName: item.firstName,
        surname: item.surname,
        address: item.address,
        ldz: item.ldz,
        officeNumber: item.officeNumber,
        mobile: item.mobile,
        page: item.page,
        fax: item.fax,
        notes: item.notes,
        description: item.description,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      });
    } catch (err) {
      console.log(
        'Unfortuantely there was an error in getting the data: ' +
          JSON.stringify(err)
      );
      console.log(err);
    }
  }

  handleChange = (e, { name, value }) => {
       this.setState({ [name]: value})
  }

  handleSumbit = () => {
    console.log("submit");
    const data = {
      input: {
        id: this.state.phoneBookId,
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
    API.graphql(graphqlOperation(mutations.updatePhoneBookEntry, data))
    .then((response) => {
      console.log(response)
      this.fetchData()
    })
    .catch((err) => {
      console.log("There was an error setting the data: " + err)
      console.log(err)
    })
  }

  componentDidMount = () => {
    this.fetchData()
  }

  render () {
    // if (!this.state.item) {
    //   return <div>Sorry, but that log was not found</div>;
    // }

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
