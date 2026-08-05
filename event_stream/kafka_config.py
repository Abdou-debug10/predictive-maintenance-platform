from kafka import KafkaProducer, KafkaConsumer
import json

KAFKA_SERVER = "kafka:9092"

TOPIC_NAME = "prediction-events"


def serializer(message):
    return json.dumps(message).encode("utf-8")


def deserializer(message):
    return json.loads(message.decode("utf-8"))