from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from kafka import KafkaProducer

access_token = "84750401-1xH1WP8WeFcZLsYSs4Pf8JPhJwTaUPhEwzm3iJ8hF"
access_token_secret =  "DubuALnr8PJkhgHnlGloJ57vDqniFj53OekozUvdBzuRu"
consumer_key =  "XXTvfn6vnopYZSS2VlfItdTVN"
consumer_secret =  "vOo0I7aNAf0CS5E1npFeLAfNvsOOEFP4LEnf5q5eiLRUAiTrBw"

class StdOutListener(StreamListener):
    def __init__(self):
        #self.producer = SimpleProducer(KafkaClient("localhost:29092"))
        self.producer = KafkaProducer(bootstrap_servers=['localhost:29092'])

    def on_data(self, data):
        self.producer.send("servex", value=data.encode('utf-8'))
        print("Message sent")
        return True
    def on_error(self, status):
        print (status)

l = StdOutListener()
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)
stream = Stream(auth, l)
stream.filter(track="servex")
