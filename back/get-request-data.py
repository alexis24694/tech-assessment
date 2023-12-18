import json
import csv
import boto3
from io import StringIO

def lambda_handler(event, context):
    bucket_name = 'tech-assessment-bucket-backend'
    file_key = 'request_data/requestData.csv'
    
    # Initialize S3 client
    s3 = boto3.client('s3')
    
    try:
        # Get CSV file from S3
        response = s3.get_object(Bucket=bucket_name, Key=file_key)
        csv_data = response['Body'].read().decode('utf-8-sig')

        # Parse CSV data
        csv_reader = csv.DictReader(StringIO(csv_data))
        data_list = [row for row in csv_reader]

        # Return data in JSON format
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps(data_list, ensure_ascii=False)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': json.dumps({'error': str(e)})
        }
