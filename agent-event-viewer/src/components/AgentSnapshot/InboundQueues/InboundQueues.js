import React from 'react';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const Channels = channels => {
    let _channels = "";
    channels.forEach((channel, index) => {
        if (index == channels.length - 1) {
            _channels = _channels + channel;
        } else {
            _channels = _channels + channel + "/";
        }
    });
    return _channels;
};

const InboundQueues = ({ inboundQueues }) => {
    const rows = inboundQueues.map((inboundQueue, index) => 
        inboundQueue.Name != null ? <KeyValuePair label={inboundQueue.Name} value={Channels(inboundQueue.Channels)}></KeyValuePair> : ""
    );

    return (
        <Container headingVariant='h4' title='Default Outbound Queue'>
            <ColumnLayout>
                <Column>
                    <Stack>
                        { rows }
                    </Stack>
                </Column>
            </ColumnLayout>
        </Container>
    )
}

export default InboundQueues;