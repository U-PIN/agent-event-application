import React from 'react';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const AgentStatus = ({ agentStatus }) => {
    return (
        <Container headingVariant='h4' title='Agent Status'>
            <ColumnLayout>
                <Column>
                    <Stack>
                        <KeyValuePair label="Agent Status" value={agentStatus.Name}></KeyValuePair>
                        <KeyValuePair label="Status Start Timestamp" value={agentStatus.StartTimestamp}></KeyValuePair>
                        <KeyValuePair label="Status Type" value={agentStatus.Type}></KeyValuePair>
                        <KeyValuePair label="Status ARN" value={agentStatus.ARN}></KeyValuePair>
                    </Stack>
                </Column>
            </ColumnLayout>
        </Container>
    )
}

export default AgentStatus;