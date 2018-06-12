# GreProject

Python version 3.6
Database: postgres
## Dependencies
1. see requirements.txt for a full lists of current libraries
2. Setting up database on localhost
Download & install PostgreSQL
Set admin password to be Florence
Create a database called gre_db

The first time you run the program, it will create two tables in the gre_db: questions and answers. You need to mannually insert the records to these tables using records in questions.txt and answers.txt

3. running the project in virtual environment such as virtualenv/venv is recommended
## Installing dependencies
```
pip install -r requirements.txt
```
## Front end dev
```
use the following end points to get questions from database
GET http://127.0.0.1:5000/one_question to get one random question in JSON format
GET http://127.0.0.1:5000/questions to get all questions in database in JSON format
GET http://127.0.0.1:5000/answer/id replace id with question id to get the answer to a specific question  
POST http://127.0.0.1:5000/answer/id replace id with question id to post user answer to a specific question

Use the following json format for the POST request:
{
"usr_ans1": "blah",
"usr_ans2": blah"
}
```
Note that please don't use the routes for a RESTful API. 
Start the server by:
```
$python app.py 
```
You can also test out all the endpoints by installing postman plug-in and use the following collection link to get all
the tests for endpoints:
https://www.getpostman.com/collections/dc44c9a63e40b5982dd8
## Checking out the browser
Go to the localhost:port to interact with the webpage. The localhost is usually http://127.0.0.1:5000
