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
## Running the program
```
python start.py
```
## Checking out the browser
Go to the localhost:port to interact with the webpage. The localhost is usually http://127.0.0.1:5000
