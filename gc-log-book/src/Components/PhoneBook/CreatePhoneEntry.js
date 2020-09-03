import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as mutations from '../../graphql/mutations';
import { DefaultButton, TextField, Stack } from '@fluentui/react';
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
      redirectPage: false,
      stackTokens: { childrenGap: 50 },
      stackStyles: { width: 650 },
      columnProps: {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
      }
    };
  }

  handleChange = (e, value) => {
    this.setState({ [e.target.name]: value})
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
    })
    .catch((err) => {
      console.log("There was an error setting the data: " + err)
      console.log(err)
    })
  }

  render () {
    if (this.state.redirectPage === true) {
      return <Redirect to={`/phonebook/${this.state.phoneBookId}`}/>
    }

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
              value={this.state.firstName}
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
            <TextField label='LDZ' name='ldz' value={this.state.ldz} onChange={this.handleChange} />
            <TextField label='Office Number' name='officeNumber' value={this.state.officeNumber} onChange={this.handleChange} />
            <TextField label='Mobile' name='mobile' value={this.state.mobile} onChange={this.handleChange} />
            <TextField label='Pager' name='page' value={this.state.page} onChange={this.handleChange} />
            <TextField label='Fax' name='fax' value={this.state.fax} onChange={this.handleChange} />
          </Stack>
          <Stack {...this.state.columnProps}>
            <TextField label='Notes' name='notes' value={this.state.notes} onChange={this.handleChange} />
            <TextField label='Description' name='description' value={this.state.description} onChange={this.handleChange} />
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
