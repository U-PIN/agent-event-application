import base64
import boto3
import datetime
import json
import os

state_change_table = "AgentStateChangeTable-AgentEventApplication"
login_logout_table = "AgentLoginLogoutTable-AgentEventApplication"
heart_beat_table = "AgentHeartBeatTable-AgentEventApplication"
region_name = os.environ.get('AWS_REGION')

def process_records(records, position):

    while position < len(records):
        record = records[position]
        payload = json.loads(base64.b64decode(record['kinesis']['data']).decode('utf8'))
        ddb_items = convert_payload(payload)

        now = datetime.datetime.now()
        now_ut = now.timestamp()
        ddb_items['Unixtime']['N'] = int(now_ut)
        
        event_type = ddb_items['EventType']['S']

        if event_type == 'STATE_CHANGE':
            table_name = state_change_table
        elif event_type == 'LOGIN' or event_type == 'LOGOUT':
            table_name = login_logout_table
        else:
            table_name = heart_beat_table

        dynamoDB = boto3.client('dynamodb', region_name = region_name)
        dynamoDB.put_item(TableName=table_name, Item=ddb_items)
        position = position + 1 

def convert_payload(payload):
    ddb_items = {}

    for key in payload.keys():
        if type(payload[key]) is dict:
            ddb_items[key] = {
                'S': json.dumps(payload[key])
            }
        else:
            ddb_items[key] = {
                'S': str(payload[key])
            }
    return ddb_items 
    
def lambda_handler(event, context):
    process_records(event['Records'], 0)