from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uuid
import boto3
from botocore.exceptions import ClientError
from dotenv import load_dotenv
import os

# -------- Load Environment Variables --------
load_dotenv()

AWS_ACCESS_KEY = os.getenv("AWS_ACCESS_KEY_ID")
AWS_SECRET_KEY = os.getenv("AWS_SECRET_ACCESS_KEY")
AWS_REGION = os.getenv("AWS_REGION")

# -------- Initialize DynamoDB Resource --------
dynamodb = boto3.resource(
    'dynamodb',
    region_name=AWS_REGION,
    aws_access_key_id=AWS_ACCESS_KEY,
    aws_secret_access_key=AWS_SECRET_KEY
)

table = dynamodb.Table('todos')

# -------- FastAPI App --------
app = FastAPI(title="Autoscaling To-Do App with DynamoDB")

class Todo(BaseModel):
    id: str
    title: str
    completed: bool = False


@app.get("/")
def home():
    return {"message": "Welcome to the Autoscaling To-Do App (with DynamoDB)!"}


@app.get("/todos", response_model=List[Todo])
def get_todos():
    try:
        response = table.scan()
        return response.get("Items", [])
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/todos", response_model=Todo)
def create_todo(title: str):
    todo = Todo(id=str(uuid.uuid4()), title=title, completed=False)
    try:
        table.put_item(Item=todo.dict())
        return todo
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/todos/{todo_id}", response_model=Todo)
def update_todo(todo_id: str, updated_todo: Todo):
    try:
        table.update_item(
            Key={"id": todo_id},
            UpdateExpression="set title=:t, completed=:c",
            ExpressionAttributeValues={
                ":t": updated_todo.title,
                ":c": updated_todo.completed
            }
        )
        return updated_todo
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/todos/{todo_id}")
def delete_todo(todo_id: str):
    try:
        table.delete_item(Key={"id": todo_id})
        return {"message": "Deleted successfully"}
    except ClientError as e:
        raise HTTPException(status_code=500, detail=str(e))
