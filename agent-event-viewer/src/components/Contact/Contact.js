import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Link from 'aws-northstar/components/Link';
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import ColumnLayout, { Column } from 'aws-northstar/layouts/ColumnLayout';
import KeyValuePair from 'aws-northstar/components/KeyValuePair';
import Stack from 'aws-northstar/layouts/Stack';

const Contact = ({ contacts }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const rows = contacts.map((contact, index) => 
        <Container headingVariant='h4' title={"Contact ID: " + contact.ContactId}>
            <ColumnLayout>
                <Column>
                    <Stack>
                        <KeyValuePair label="Contact ID" value={contact.ContactId}></KeyValuePair>
                        <KeyValuePair label="Channel" value={contact.Channel}></KeyValuePair>
                        <KeyValuePair label="State" value={contact.State}></KeyValuePair>
                    </Stack>
                </Column>
                <Column>
                    <Stack>
                        <KeyValuePair label="Initial Contact ID" value={contact.InitialContactId}></KeyValuePair>
                        <KeyValuePair label="Initiation Method" value={contact.InitiationMethod}></KeyValuePair>
                        <KeyValuePair label="Queue" value={contact.Queue.Name}></KeyValuePair>
                    </Stack>
                </Column>
                <Column>
                    <Stack>
                        <KeyValuePair label="Connected to Agent Timestamp" value={contact.ConnectedToAgentTimestamp}></KeyValuePair>
                        <KeyValuePair label="Queue Timestamp" value={contact.QueueTimestamp}></KeyValuePair>
                        <KeyValuePair label="State Start Timestamp" value={contact.StateStartTimestamp}></KeyValuePair>
                    </Stack>
                </Column>

            </ColumnLayout>
        </Container>
    );

    return (
        <div>
            <BrowserRouter>
                <Link href={"/" + contacts[0].ContactId } onClick={handleClickOpen}>
                    { contacts[0].State }
                </Link>
            </BrowserRouter>
            <Dialog
                fullWidth="true"
                maxWidth="md"
                open={open}
                onClose={handleClose}
            >
                <Container 
                    headingVariant='h2'
                    title={ "Contacts" }
                >
                    { rows }   
                </Container>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Contact;