import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

import Header from "./MyHeader";
import SearchBar from "./MySearchBar";
import Stream from "./MyStream";
var APIid = "2x21yf8b7p6a6z6agpbc4cdsf0cy8d";
var array1 = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      items: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const test_access_token = () => {
      fetch("https://api.twitch.tv/kraken/streams/", {
        headers: {
          "Client-Id": APIid
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            loading: false,
            items: json
          });
          console.log("response: ", json);
          console.log("Index zero game: ", json.streams[0].game);
          console.log("Items: ", this.state.items.streams[0].game);
          console.log(this.state.items.streams);
          array1 = this.state.items.streams;
          console.log("array1 ", array1);
          console.log("array1 ", array1[0].game);
        });
    };
    test_access_token();
  }

  render() {
    var { loading, items } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="box">
          <Header />
          <SearchBar />
          <Stream
            stream={{
              image: "test",
              name: "test",
              game: "Fort",
              viewers: "5",
              description: "test"
            }}
          />
          <Button bsstyle="success">Test Button</Button>
        </div>
      );
    }
  }
}

export default App;

// The stream needs to be passed attributes
// <Stream
//    stream={{image:"" name:"" game:"" viewers:"" description:""}}
// />

// Info above is usually coming from a JSON file, so passing it as a single prop (in this case "stream") is useful

// Take an array of raw data and turn it into a number of components (1:41 in video)
// const nums = [1, 2, 3, 4, 5]
// const doubled = nums.map(function(num) {      function receives each individual number in the array
//  return num*2                                  map function creates new array
// })

// streamData.js is a file
// function App {
// const streamComponents = streamData.map(stream => {      // returns an array of stream components
//   return (
//    <Stream key={stream.id} image={stream.image} name={stream.name} game={stream.game} viewers={stream.viewers} description={stream.description}/>
//   )
// })
//
// return (
//   <div>
//     {streamComponents}
//   </div>
// )
// export default App
