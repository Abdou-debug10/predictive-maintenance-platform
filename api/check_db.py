import os
import psycopg2

os.environ['DATABASE_URL'] = 'postgresql://predictive_maintenance_db_afd5_user:YScYB9yj7trcKKw1kLtnBWYc4GqhKAVA@dpg-d9pjdndbedkc73c7ukmg-a.oregon-postgres.render.com/predictive_maintenance_db_afd5'

conn = psycopg2.connect(os.environ['DATABASE_URL'])
cursor = conn.cursor()

cursor.execute("SELECT table_name FROM information_schema.tables WHERE table_schema='public'")
tables = cursor.fetchall()

print('Tables in database:')
for table in tables:
    print(f'  - {table[0]}')

cursor.close()
conn.close()