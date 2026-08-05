import os
import psycopg2

def get_connection():
    # ← استخدام DATABASE_URL من Render
    database_url = os.environ.get("DATABASE_URL")
    
    if database_url:
        return psycopg2.connect(database_url)
    else:
        # ← fallback للتطوير المحلي
        return psycopg2.connect(
            host="postgres",
            database="predictive_db",
            user="postgres",
            password="postgres",
            port="5432"
        )


def save_prediction(
    machine_type,
    air_temp,
    process_temp,
    rotational_speed,
    torque,
    tool_wear,
    prediction,
    confidence
):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO predictions
        (
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear,
            prediction,
            confidence
        )
        VALUES
        (
            %s,%s,%s,%s,%s,%s,%s,%s
        )
        """,
        (
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear,
            prediction,
            confidence
        )
    )

    conn.commit()
    cursor.close()
    conn.close()


def get_predictions():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            id,
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear,
            prediction,
            confidence,
            created_at
        FROM predictions
        ORDER BY id DESC
        """
    )

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    return rows


def get_latest_prediction():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        SELECT
            machine_type,
            air_temp,
            process_temp,
            rotational_speed,
            torque,
            tool_wear,
            prediction,
            confidence
        FROM predictions
        ORDER BY id DESC
        LIMIT 1
        """
    )

    row = cursor.fetchone()
    cursor.close()
    conn.close()

    return row