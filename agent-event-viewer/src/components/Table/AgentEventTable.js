import React from 'react';
import Table from 'aws-northstar/components/Table';
import CurrentAgentSnapshot from '../AgentSnapshot/CurrentAgentSnapshot';
import PreviousAgentSnapshot from '../AgentSnapshot/PreviousAgentSnapshot';
import Contact from '../Contact/Contact';

const columnDefinitions = [
    {
        id: 'EventId',
        width: 300,
        Header: 'Event ID',
        accessor: 'EventId',
    },
    {
        id: 'EventTimestamp',
        width: 200,
        Header: 'Event Timestamp',
        accessor: 'EventTimestamp'
    },
    {
        id: 'EventType',
        width: 150,
        Header: 'Event Type',
        accessor: 'EventType'
    },
    {
        id: 'CurrentAgentSnapshot.AgentStatus.Name',
        width: 200,
        Header: 'Current Agent Snapshot',
        accessor: 'CurrentAgentSnapshot.AgentStatus.Name',
        Cell: ({row}) => {
            if (row && row.original) {
                return <CurrentAgentSnapshot agentEvent={row.original} />
            }
        }
    },
    {
        id: 'PreviousAgentSnapshot.AgentStatus.Name',
        width: 200,
        Header: 'Previous Agent Snapshot',
        accessor: 'PreviousAgentSnapshot.AgentStatus.Name',
        Cell: ({row}) => {
            if (row && row.original) {
                return <PreviousAgentSnapshot agentEvent={row.original} />
            }
        }
    },
    {
        id: 'CurrentAgentSnapshot.Configuration.Username',
        width: 150,
        Header: 'Agent Username',
        accessor: 'CurrentAgentSnapshot.Configuration.Username'
    },
    {
        id: 'CurrentAgentSnapshot.Configuration.RoutingProfile.Name',
        width: 250,
        Header: 'Routing Profile',
        accessor: 'CurrentAgentSnapshot.Configuration.RoutingProfile.Name'
    },
    {
        id: 'CurrentAgentSnapshot.Contacts[0].State',
        width: 170,
        Header: 'Current Contacts',
        accessor: 'CurrentAgentSnapshot.Contacts[0].State',
        Cell: ({row}) => {
            if (row && row.original.CurrentAgentSnapshot.Contacts.length > 0) {
                return <Contact contacts={row.original.CurrentAgentSnapshot.Contacts} />
            }
            else {
                return ""
            }
        }
    },
    {
        id: 'PreviousAgentSnapshot.Contacts[0].State',
        width: 170,
        Header: 'Previous Contacts',
        accessor: 'PreviousAgentSnapshot.Contacts[0].State',
        Cell: ({row}) => {
            if (row && row.original.PreviousAgentSnapshot.Contacts.length > 0) {
                return <Contact contacts={row.original.PreviousAgentSnapshot.Contacts} />
            }
            else {
                return ""
            }
        }
    }
]

const AgentEventTable = ({ agentEventList, isLoading }) => {
    return (
        <div>
            <Table 
                tableTitle='Contact Trace Records'
                disableRowSelect={true}
                columnDefinitions={columnDefinitions}
                loading={isLoading}
                items={agentEventList}
                pageSizes={[50, 100, 150]}
                defaultPageSize={50}
                sortBy={[{
                  id: 'EventTimestamp',
                  desc: true
                }]}
                getRowId={React.useCallback(data => data.EventId, [])}
            />
        </div>
    );
}

export default AgentEventTable;