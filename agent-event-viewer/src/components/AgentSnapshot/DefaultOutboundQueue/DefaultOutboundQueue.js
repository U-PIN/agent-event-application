import React from 'react';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const DefaultOutboundQueue = ({ defaultOutboundQueue }) => {

    let _channels = ""
    const channels = defaultOutboundQueue.Channels.map((channel, index) => {
            if (index == defaultOutboundQueue.Channels.length - 1) {
                _channels = _channels + channel;
            } else {
                _channels = _channels + channel + "/"
            }

            return <KeyValuePair label="Channels" value={_channels}></KeyValuePair>
        }
    );

    return (
        <Container headingVariant='h4' title='Default Outbound Queue'>
            <ColumnLayout>
                <Column>
                    <Stack>
                        <KeyValuePair label="Name" value={defaultOutboundQueue.Name}></KeyValuePair>
                        <KeyValuePair label="ARN" value={defaultOutboundQueue.ARN}></KeyValuePair>
                        { channels }
                    </Stack>
                </Column>
            </ColumnLayout>
        </Container>
    );
};

export default DefaultOutboundQueue;