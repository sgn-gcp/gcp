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

function FullLogBook() {
  const [items, setItems] = useState([]);
  let history = useHistory();
  const columns = [
    {
      key: 'column1',
      name: 'Title',
      fieldName: 'title',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column2',
      name: 'Raised By',
      fieldName: 'raisedBy',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column3',
      name: 'Severity',
      fieldName: 'severity',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column4',
      name: 'Notes',
      fieldName: 'notes',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column5',
      name: 'Description',
      fieldName: 'description',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column6',
      name: 'Area Affected',
      fieldName: 'areaAffectd',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column7',
      name: 'Created',
      fieldName: 'createdAt',
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: 'column8',
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
          graphqlOperation(queries.listLogBookEntrys)
        );
        setItems(response.data.listLogBookEntrys.items);
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
      <h1>LogBook</h1>
      <h2 className="createLink"><Link to='/logbook/create'>Create a Log Entry</Link></h2>
      <Fabric>
        <DetailsList
          items={items}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={0}
          onActiveItemChanged={(item, index) =>
            history.push(`/logbook/${item.id}`)
          }
        />
      </Fabric>
    </div>
  );
}

export default FullLogBook;
