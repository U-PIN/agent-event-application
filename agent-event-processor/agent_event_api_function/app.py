import ast
import boto3
import json
import os 

state_change_table = "AgentStateChangeTable-AgentEventApplication"
login_logout_table = "AgentLoginLogoutTable-AgentEventApplication"
heart_beat_table = "AgentHeartBeatTable-AgentEventApplication"
region_name = os.environ.get('AWS_REGION')

dynamodb = boto3.client("dynamodb", region_name=region_name)

def get_all_events(table_name, **kwargs):
    all_events = []

    while True:
        response = dynamodb.scan(TableName=table_name, **kwargs)
        
        for item in response['Items']:
            all_events.append(item)

        if 'LastEvaluatedKey' not in response:
            break
        
        kwargs.update(ExclusiveStartKey=response['LastEvaluatedKey'])

    return all_events


def lambda_handler(event, context):

    start_time = event["queryStringParameters"]["StartTime"]
    end_time = event["queryStringParameters"]["EndTime"]
    event_type = event["queryStringParameters"]["EventType"]

    if event_type == 'StateChange':
        table_name = state_change_table
    elif event_type == 'LoginLogout':
        table_name = login_logout_table
    else:
        table_name = heart_beat_table

    all_events = get_all_events(table_name=table_name)
    agent_event_list = []

    for item in all_events:
        agent_event = {}
        if start_time <= item["EventTimestamp"]["S"] <= end_time: 
            for key in item:
                try:
                    agent_event[key] = ast.literal_eval(item[key]["S"].replace('null', 'None'))
                    
                except:
                    agent_event[key] = item[key]["S"]

            agent_event_list.append(agent_event)

    return {
        "statusCode": 200,
        "headers": {
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "agent_event_list": agent_event_list
        })
    }
