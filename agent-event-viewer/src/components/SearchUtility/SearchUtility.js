import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from 'aws-northstar/layouts/Grid';
import Form from 'aws-northstar/components/Form';
import FormSection from 'aws-northstar/components/FormSection';
import FormField from 'aws-northstar/components/FormField';
import Select from 'aws-northstar/components/Select';
import Input from 'aws-northstar/components/Input';
import Button from 'aws-northstar/components/Button';

const useStyles = makeStyles(theme => ({
    datetimeSelect: {
        width: "25%",
        marginBottom: theme.spacing(2)
    },
    formSection: {
        width: "50%"
    },
    datetimeInput: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(1)
    }
}));

const agentEventOptions = 
    [
      { label: 'State Change', value: 'StateChange' },
      { label: 'Login/Logout', value: 'LoginLogout' },
      { label: 'Heart Beat', value: 'HeartBeat' }
    ];

const SearchUtility = ({ eventType, startTime, endTime, handleClick, handleEventTypeChange, handleStartTimeChange, handleEndTimeChange }) => {
    console.log(eventType);
    const classes = useStyles();

    return (
        <div>
            <Form
                actions = {
                    <Button variant="primary" onClick={() => handleClick()} >Submit</Button>
                }
                className={classes.datetimeSelect}
            >
                <FormSection header='Datetime Select'>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormField label='Start Time' className={classes.datetimeInput}>
                                <Input 
                                    type='text' 
                                    value={startTime} 
                                    controlId="startTime"
                                    onChange={(value) => handleStartTimeChange(value)} 
                                />
                            </FormField>
                        </Grid>
                        <Grid item xs={6}>
                            <FormField label='End Time' className={classes.datetimeInput}>
                                <Input 
                                    type='text' 
                                    value={endTime} 
                                    controlId="endTime" 
                                    onChange={(value) => handleEndTimeChange(value)}
                                />
                            </FormField>
                        </Grid>
                        <Grid item xs={6}>
                            <FormField label='Event Type'>
                                <Select
                                    controlId="eventType"
                                    options={agentEventOptions} 
                                    selectedOption={{value: eventType}}
                                    onChange={(event) => handleEventTypeChange(event)}
                                />
                            </FormField>
                        </Grid>
                    </Grid>
                </FormSection>
            </Form>
        </div>
    );
}

export default SearchUtility;