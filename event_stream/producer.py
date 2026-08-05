from kafka import KafkaProducer
from event_stream.kafka_config import (
    KAFKA_SERVER,
    TOPIC_NAME,
    serializer
)

producer = None


def get_producer():
    global producer

    if producer is None:
        producer = KafkaProducer(
            bootstrap_servers=KAFKA_SERVER,
            value_serializer=serializer
        )

    return producer


def send_prediction(prediction, confidence):

    message = {
        "prediction": prediction,
        "confidence": confidence
    }

    kafka_producer = get_producer()

    kafka_producer.send(
        TOPIC_NAME,
        message
    )

    kafka_producer.flush()

    print("Prediction Event Sent:")
    print(message)