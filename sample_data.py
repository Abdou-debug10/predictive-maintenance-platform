import os
import psycopg2

os.environ['DATABASE_URL'] = 'postgresql://predictive_maintenance_db_afd5_user:YScYB9yj7trcKKw1kLtnBWYc4GqhKAVA@dpg-d9pjdndbedkc73c7ukmg-a.oregon-postgres.render.com/predictive_maintenance_db_afd5'

conn = psycopg2.connect(os.environ['DATABASE_URL'])
cursor = conn.cursor()

# بيانات تجريبية
sample_data = [
    ('High', 300.0, 310.0, 1500.0, 50.0, 120.0, 'Machine Healthy', 98.2),
    ('Low', 295.0, 305.0, 1400.0, 45.0, 80.0, 'Machine Healthy', 97.5),
    ('Medium', 310.0, 320.0, 1600.0, 65.0, 150.0, 'Machine Failure Predicted', 96.8),
    ('High', 305.0, 315.0, 1550.0, 55.0, 130.0, 'Machine Healthy', 98.0),
    ('Low', 290.0, 300.0, 1350.0, 40.0, 60.0, 'Machine Healthy', 99.1),
]

for data in sample_data:
    cursor.execute("""
        INSERT INTO predictions (machine_type, air_temp, process_temp, rotational_speed, torque, tool_wear, prediction, confidence)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, data)

conn.commit()
cursor.close()
conn.close()

print("✅ Sample data added successfully!")