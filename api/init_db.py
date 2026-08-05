import os
import psycopg2

os.environ['DATABASE_URL'] = 'postgresql://predictive_maintenance_db_afd5_user:YScYB9yj7trcKKw1kLtnBWYc4GqhKAVA@dpg-d9pjdndbedkc73c7ukmg-a.oregon-postgres.render.com/predictive_maintenance_db_afd5'

def init_db():
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id SERIAL PRIMARY KEY,
            machine_type VARCHAR(50),
            air_temp FLOAT,
            process_temp FLOAT,
            rotational_speed FLOAT,
            torque FLOAT,
            tool_wear FLOAT,
            prediction VARCHAR(100),
            confidence FLOAT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    conn.commit()
    cur.close()
    conn.close()
    print("✅ Table 'predictions' created successfully!")

if __name__ == "__main__":
    init_db()