import json
import csv
import boto3
import time
from io import StringIO
import traceback

def lambda_handler(event, context):
    try:
        json_data_string = event['body']
        json_data = json.loads(json_data_string)
        
        json_data = json_data['data']
        # Convert the JSON data to a list of rows
        rows = [json_data.keys(), json_data.values()]
    
    
        # Generate a unique filename with milliseconds to prevent overwriting
        timestamp = int(time.time() * 1000)  # Current time in milliseconds
        filename = f"data_{timestamp}.csv"
    
        # Specify the S3 bucket and key
        bucket_name = 'tech-assessment-bucket-backend'
        key = f'request_data/{filename}'
    
        # Create an in-memory CSV buffer
        csv_buffer = StringIO()
        csv_writer = csv.writer(csv_buffer)
    
        # Write rows to the CSV buffer
        csv_writer.writerows(rows)
    
        # Create an S3 client
        s3 = boto3.client('s3')
    
        # Upload the CSV data to S3
        s3.put_object(
            Body=csv_buffer.getvalue().encode('utf-8'),
            Bucket=bucket_name,
            Key=key,
            ContentType='text/csv; charset=utf-8',
            ContentEncoding='utf-8'
        )
    
        # Close the buffer
        csv_buffer.close()
    
        print(f'CSV data uploaded to S3: s3://{bucket_name}/{key}')
    
        return {
            'statusCode': 200,
            'body': 'CSV data uploaded to S3'
        }
    except Exception as e:
        # Return error details in case of failure
        traceback.print_exc()
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }