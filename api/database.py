import psycopg2

try:
    conn = psycopg2.connect(
        host="postgres",
        database="predictive_db",
        user="postgres",
        password="postgres",
        port="5432"
    )

    print("Database Connected Successfully!")

    conn.close()

except Exception as e:
    print("Connection Error:")
    print(e)