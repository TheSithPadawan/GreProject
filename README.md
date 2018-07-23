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
updates:
Need to install angular bootstrap dependency:
```
npm install --save @ng-bootstrap/ng-bootstrap
```
Start the backend server by:
```
$ python app.py
```
Using json-server to test Notes Functionality
cd to the client/src folder
```
$ json-server --watch db/notes.json --port 8152
```


