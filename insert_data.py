import psycopg2
import csv

conn_string = "host='localhost' dbname='gre_db' user='postgres' password='Florence'"
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()
with open('./contents/questions.csv', 'r') as csvfile:
    next(csvfile)
    cursor.copy_from(csvfile, 'question', sep = ',')

with open ('./contents/answers.csv') as csvfile:
    next(csvfile)
    cursor.copy_from(csvfile, 'answer', sep = ',')

conn.commit()
conn.close()