import React, { Component } from 'react';
import './App.css';
// Importing axios to make APIs req/res.
import axios from 'axios';
// Importing all components that we want to use in App.js:
import Header from './components/Header';
import Input from './components/Input';
import TweedrFeed from './components/TweedrFeed';
import {
        BrowserRouter as Router,
        Route
        } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    tweed: [ ]
    }
    this.showname = this.showname.bind(this);
    this.createTweed = this.createTweed.bind(this);
  }

createTweed(record){
    // this pushes a new obj into state.todos array
    axios.post('https://tweedr-api.herokuapp.com/api/tweedrfeed', {
    tweed: record
  })
  .then(function (res) {
    console.log(res);
    window.location.reload();
  })
  .catch(function (error) {
    console.log(error);
  });
  
  }

showname() {
  let targetURL = "https://tweedr-api.herokuapp.com/api/tweedrfeed";
    axios.get(targetURL)
  .then((res) => {
    this.setState({
      tweed: res.data.data
    })
    console.log(this.state.tweed);
  })
 }

componentDidMount(){
  this.showname();
}

  render() {
    return (
      <Router>
      <div className="App">
        <Route path="/tweedr/" component={() => (<Header />) }/>
        <Route path="/tweedr/" component={() => (<Input createTweed={this.createTweed}/>) }/>
      <div className="tweedr">
        <Route path="/tweedr/" component={() => 
            (<TweedrFeed showallTweeds={this.state.tweed}/>) }/>
      </div>
      </div>
      </Router>
    );
  }
}

export default App;