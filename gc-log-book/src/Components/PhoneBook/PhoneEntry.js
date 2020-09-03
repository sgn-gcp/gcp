import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { DefaultButton, TextField, Stack } from '@fluentui/react';

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
      phoneBookId: this.props.phoneBookId || '',
      stackTokens: { childrenGap: 50 },
      stackStyles: { width: 650 },
      columnProps: {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
      }
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

  handleChange = (e, value) => {
    this.setState({ [e.target.name]: value})
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
    return (
      <div>
         <h1>
          PhoneBook &gt; {this.state.firstName || ''} {this.state.surname || ''}
        </h1>
        <Stack horizontal tokens={this.state.stackTokens} styles={this.state.stackStyles}>
          <Stack {...this.state.columnProps}>
            <TextField
              label='First Name'
              required
              name='firstName'
              value={this.state.firstName || ''}
              onChange={this.handleChange}
            />
            <TextField
              label='Surname'
              required
              name='surname'
              value={this.state.surname || ''}
              onChange={this.handleChange}
            />
            <TextField label='Address' name='address' value={this.state.address || ''} onChange={this.handleChange} />
            <TextField label='LDZ' name='ldz' value={this.state.ldz || ''} onChange={this.handleChange} />
            <TextField label='Office Number' name='officeNumber' value={this.state.officeNumber || ''} onChange={this.handleChange} />
            <TextField label='Mobile' name='mobile' value={this.state.mobile || ''} onChange={this.handleChange} />
            <TextField label='Pager' name='page' value={this.state.page || ''} onChange={this.handleChange} />
            <TextField label='Fax' name='fax' value={this.state.fax || ''} onChange={this.handleChange} />
          </Stack>
          <Stack {...this.state.columnProps}>
            <TextField label='Notes' name='notes' value={this.state.notes || ''} onChange={this.handleChange} />
            <TextField label='Description' name='description' value={this.state.description || ''} onChange={this.handleChange} />
            <TextField
              label='First Created'
              disabled
              name='createdAt' 
              value={this.state.createdAt}
              onChange={this.handleChange}
            />
            <TextField
              label='Last Updated'
              disabled
              name='updatedAt' 
              value={this.state.updatedAt}
              onChange={this.handleChange}
            />
            <DefaultButton
              text='SAVE'
              onClick={this.handleSumbit}
              allowDisabledFocus
            />
          </Stack>
        </Stack>
      </div>
    );
  }
}

export default PhoneEntryFromRouter;
