import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const listener = io("http://localhost:3000/");


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
    listener.on('tweets', (data) => {
      const newTweets = this.state.tweets;
      newTweets.push(data);
      this.setState({ tweets: newTweets})
    })
  }

  render() {
    console.log(this.state.tweets)
    return (
      <div className="App">
        <header>
          Tweets about <strong>servex</strong>
        </header>
        <hr/>
        <div>
          {
            this.state.tweets.map(tweet => <p>{tweet.user.name}: {tweet.text}</p>)
          }
        </div>
      </div>
    )

  }
}
/*
function App() {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    listener.on('tweets', (data) => {
      const newTweets = tweets;
      newTweets.push(data);
      console.log(newTweets)
      setTweets(newTweets);
    })
  }, [tweets]);
  console.log(tweets);
  return (
    <div className="App">
      <header>
        Tweets about <strong>servex</strong>
      </header>
      <hr/>
      <div>
        {
          tweets.map(tweet => <p>HOLA</p>)
        }
      </div>
    </div>
  );
}*/

export default App;
