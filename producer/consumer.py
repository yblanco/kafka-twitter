from kafka import KafkaConsumer
from time import sleep
import requests


URL = "http://localhost:3000/"
consumer = KafkaConsumer('servex', bootstrap_servers=['localhost:29092'])

for message in consumer:
    data = { 'tweet':message.value }
    requests.post(url = "http://localhost:3000/", data = data)
    print("Message propagated")
    sleep(1)
