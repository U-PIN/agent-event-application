import React from 'react';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const AgentConfiguration = ({ configuration }) => {
    const _hierarchyGroups = configuration.AgentHierarchyGroups;

    let hierarchyGroups = ""
    if (_hierarchyGroups != null) {

        if (_hierarchyGroups["Level1"] != null)
            hierarchyGroups = hierarchyGroups + _hierarchyGroups["Level1"]["Name"] + "/";
        if (_hierarchyGroups["Level2"] != null)
            hierarchyGroups = hierarchyGroups + _hierarchyGroups["Level2"]["Name"] + "/";
        if (_hierarchyGroups["Level3"] != null)
            hierarchyGroups = hierarchyGroups + _hierarchyGroups["Level3"]["Name"] + "/";
        if (_hierarchyGroups["Level4"] != null)
            hierarchyGroups = hierarchyGroups + _hierarchyGroups["Level4"]["Name"] + "/";
        if (_hierarchyGroups["Level5"] != null)
            hierarchyGroups = hierarchyGroups + _hierarchyGroups["Level5"]["Name"];
        if (hierarchyGroups.length == 0)
            hierarchyGroups = "-";
        else
            hierarchyGroups = hierarchyGroups.slice(0, -1);
    } else {
        hierarchyGroups = "-";
    }

    return (
        <Container headingVariant='h4' title='Agent Configuration'>
            <ColumnLayout>
                <Column>
                    <Stack>
                        <KeyValuePair label="Agent Username" value={configuration.Username}></KeyValuePair>
                        <KeyValuePair label="Agent Name" value={configuration.FirstName + " " + configuration.LastName}></KeyValuePair>
                        <KeyValuePair label="Hierarchy Groups" value={hierarchyGroups}></KeyValuePair>
                    </Stack>
                </Column>
            </ColumnLayout>
        </Container>
    )
}

export default AgentConfiguration;