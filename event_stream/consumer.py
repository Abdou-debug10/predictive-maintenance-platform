from kafka import KafkaConsumer
import json
import time

from api.services.db_service import save_prediction

print("🚀 Starting Consumer...")

consumer = None

while consumer is None:
    try:
        consumer = KafkaConsumer(
            "prediction-events",
            bootstrap_servers="kafka:9092",
            auto_offset_reset="latest",
            enable_auto_commit=True,
            group_id="prediction-group-v4",
            value_deserializer=lambda m: json.loads(m.decode("utf-8"))
        )

        print("✅ Connected to Kafka!")

    except Exception as e:
        print("Waiting for Kafka...", e)
        time.sleep(5)

print("📨 Waiting for messages...")

for message in consumer:

    print("=" * 40)
    print("Message Received")
    print(message.value)

    data = message.value

    save_prediction(
        data["prediction"],
        data["confidence"]
    )

    print("✅ Saved Successfully")