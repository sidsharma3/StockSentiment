import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
var Sentiment = require('sentiment');
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca()

alpaca.createOrder({
    symbol: 'AAPL',
    qty: 1,
    side: 'buy',
    type: 'market',
    time_in_force: 'day'
})

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
    }
  }

onInputChange = (event) => {
  this.setState({input: event.target.value})
}

onButtonSubmit = (event) => {
  var sentiment = new Sentiment();
  var result = sentiment.analyze(this.state.input);
  console.log(typeof result["comparative"]);
  this.setState({imageURL: result["comparative"]});
  if (result["compartive"] > 0) {
      alpaca.createOrder({
        symbol: 'AAPL',
        qty: 1,
        side: 'buy',
        type: 'market',
        time_in_force: 'day'
    })
  }
}

  render() {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(this.state.input);

    return (
      <div className="App">
        <Navigation />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition 
        onButtonSubmit={this.onButtonSubmit}
        imageURL={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;
