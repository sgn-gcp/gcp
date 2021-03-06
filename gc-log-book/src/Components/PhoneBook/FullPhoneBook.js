import React, { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { Fabric } from '@fluentui/react';
import { Link } from 'react-router-dom'
import {
  DetailsList,
  DetailsListLayoutMode,
} from 'office-ui-fabric-react/lib/DetailsList';
import { useHistory } from 'react-router-dom';

function FullPhoneBook() {
  const [items, setItems] = useState([]);
  let history = useHistory();
  const columns = [
    {
      key: 'column1',
      name: 'First Name',
      fieldName: 'firstName',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column2',
      name: 'Surname',
      fieldName: 'surname',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column3',
      name: 'Address',
      fieldName: 'address',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column4',
      name: 'LDZ',
      fieldName: 'ldz',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column5',
      name: 'Office Number',
      fieldName: 'officeNumber',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column6',
      name: 'Mobile',
      fieldName: 'mobile',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column7',
      name: 'Pager',
      fieldName: 'page',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column8',
      name: 'Fax',
      fieldName: 'fax',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column9',
      name: 'Notes',
      fieldName: 'notes',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column10',
      name: 'Description',
      fieldName: 'description',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column11',
      name: 'Created',
      fieldName: 'createdAt',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column12',
      name: 'Updated',
      fieldName: 'updatedAt',
      maxWidth: 200,
      isResizable: true,
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await API.graphql(
          graphqlOperation(queries.listPhoneBookEntrys)
        );
        setItems(response.data.listPhoneBookEntrys.items);
      } catch (err) {
        console.log(
          'Unfortunately there was an error getting the data: ' +
            JSON.stringify(err)
        );
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>PhoneBook</h1>
      <h2 className="createLink"><Link to='/phonebook/create'>Create a Contact</Link></h2>
      <Fabric>
        <DetailsList
          items={items}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={0}
          onActiveItemChanged={(item, index) =>
            history.push(`/phonebook/${item.id}`)
          }
        />
      </Fabric>
    </div>
  );
}

export default FullPhoneBook;
