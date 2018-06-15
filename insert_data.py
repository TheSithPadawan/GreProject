import psycopg2
import csv

conn_string = "host='localhost' dbname='gre_db' user='postgres' password='Florence'"
conn = psycopg2.connect(conn_string)
cursor = conn.cursor()
# with open('./contents/questions.csv') as csvfile:
#     reader = csv.DictReader(csvfile)
#     for row in reader:
#         ID = row['id']
#         if int(ID) <= 4:
#             continue
#         text = row['text']
#         A = row['a']
#         B = row['b']
#         C = row['c']
#         D = row['d']
#         E = row['e']
#         F = row['f']
#         cursor.execute("INSERT INTO question VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (ID, text, A, B, C, D, E, F))


with open ('./contents/answers.csv') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        ID = row['id']
        if int(ID) <= 4:
            continue
        ans1 = row['ans1']
        ans2 = row['ans2']
        questionID = row['questionID']
        cursor.execute("INSERT INTO answer VALUES (%s, %s, %s, %s)", (ID, ans1, ans2, questionID))

conn.commit()
conn.close()