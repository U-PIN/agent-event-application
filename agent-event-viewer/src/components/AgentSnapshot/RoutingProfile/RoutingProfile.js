import React from 'react';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const RoutingProfile = ({ routingProfile }) => {

    const concurrency = routingProfile.Concurrency.map((con, index) => 
        <KeyValuePair label={con["Channel"] + " Concurrency"} value={con["MaximumSlots"]}></KeyValuePair>
    );

    return (
        <Container headingVariant='h4' title='Routing Profile'>
            <ColumnLayout>
                <Column>
                    <Stack>
                        <KeyValuePair label="Routing Profile Name" value={routingProfile.Name}></KeyValuePair>
                        <KeyValuePair label="Routing Profile ARN" value={routingProfile.ARN}></KeyValuePair>
                    </Stack>
                </Column>
                <Column>
                    {concurrency}
                </Column>
            </ColumnLayout>
        </Container>
    )
};

export default RoutingProfile;