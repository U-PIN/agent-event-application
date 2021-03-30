import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Link from 'aws-northstar/components/Link';
import Button from 'aws-northstar/components/Button';
import Container from 'aws-northstar/layouts/Container';
import AgentConfiguration from './AgentConfiguration/AgentConfiguration';
import AgentStatus from './AgentStatus/AgentStatus';
import RoutingProfile from './RoutingProfile/RoutingProfile';
import DefaultOutboundQueue from './DefaultOutboundQueue/DefaultOutboundQueue';
import InboundQueues from './InboundQueues/InboundQueues';

const CurrentAgentSnapshot = ({ agentEvent }) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BrowserRouter>
                <Link href={"/" + agentEvent.EventId } onClick={handleClickOpen}>
                    {agentEvent.CurrentAgentSnapshot.AgentStatus.Name}
                </Link>
            </BrowserRouter>
            <Dialog
                fullWidth="true"
                maxWidth="lg"
                open={open}
                onClose={handleClose}
            >
                <Container
                    headingVariant='h2'
                    title={ "Event ID: " + agentEvent.EventId }
                >
                    <AgentConfiguration configuration={agentEvent.CurrentAgentSnapshot.Configuration} />
                    <AgentStatus agentStatus={agentEvent.CurrentAgentSnapshot.AgentStatus} />
                    <RoutingProfile routingProfile={agentEvent.CurrentAgentSnapshot.Configuration.RoutingProfile} />
                    <DefaultOutboundQueue defaultOutboundQueue={agentEvent.CurrentAgentSnapshot.Configuration.RoutingProfile.DefaultOutboundQueue} />
                    <InboundQueues inboundQueues={agentEvent.CurrentAgentSnapshot.Configuration.RoutingProfile.InboundQueues} />
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

export default CurrentAgentSnapshot;
