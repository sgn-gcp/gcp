import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as mutations from '../../graphql/mutations';
import { DefaultButton, TextField, Stack } from '@fluentui/react';

const LogEntryFromRouter = ({
  match: {
    params: { logEntryId },
  },
}) => {return (<LogEntry logEntryId={logEntryId}/>)}

class LogEntry extends React.Component {

  constructor(props) {
    super(props);

    this.fetchData = this.fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      item: {},
      title: '',
      raisedBy: '',
      severity: '',
      notes: '',
      description: '',
      areaAffectd: '',
      createdAt: '',
      updatedAt: '',
      logEntryId: this.props.logEntryId || '',
      stackTokens: { childrenGap: 50 },
      stackStyles: { width: 650 },
      columnProps: {
        tokens: { childrenGap: 15 },
        styles: { root: { width: 300 } },
      }
    };
  }
  
  fetchData = async () => {
    console.log("render: " + this.state.logEntryId)
    try {
      const response = await API.graphql(
        graphqlOperation(queries.getLogBookEntry, { id: this.state.logEntryId })
      );
      let item = response.data.getLogBookEntry
      this.setState({
        title: item.title,
        raisedBy: item.raisedBy,
        severity: item.severity,
        notes: item.notes,
        description: item.description,
        areaAffectd: item.areaAffectd,
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
        id: this.state.logEntryId,
        title: this.state.title,
        raisedBy: this.state.raisedBy,
        notes: this.state.notes,
        severity: this.state.severity,
        description: this.state.description,
        areaAffectd: this.state.areaAffectd,
      }
    }
    API.graphql(graphqlOperation(mutations.updateLogBookEntry, data))
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
    console.log("render: " + this.state.logEntryId)
  }

  render () {
    return (
      <div>
         <h1>
          LogBook &gt; {this.state.title || ''}
        </h1>
        <Stack horizontal tokens={this.state.stackTokens} styles={this.state.stackStyles}>
          <Stack {...this.state.columnProps}>
            <TextField
              label='Title'
              required
              name='title'
              value={this.state.title || ''}
              onChange={this.handleChange}
            />
            <TextField
              label='Raised By'
              required
              name='raisedBy'
              value={this.state.raisedBy || ''}
              onChange={this.handleChange}
            />
            <TextField label='Severity' name='severity' value={this.state.severity || ''} onChange={this.handleChange} />
            <TextField label='Affected By' name='areaAffectd' value={this.state.areaAffectd || ''} onChange={this.handleChange} />
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

export default LogEntryFromRouter;
