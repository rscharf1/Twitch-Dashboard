import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

import Header from "./MyHeader";
import SearchBar from "./MySearchBar";
import Stream from "./MyStream";
var APIid = "2x21yf8b7p6a6z6agpbc4cdsf0cy8d";
var myStreams = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false
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
            items: json.streams,
            loading: false
          });
          console.log("json response: ", json);
          console.log("this.state response: ", this.state);
          console.log("Index zero game: ", json.streams[0].game);
          console.log("Index zero game: ", this.state.items[0].game);
          console.log(this.state.items[2]);
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
          <div>
            {this.state.items.map(item => (
              <div className="stream container">
                <div className="row">
                  <div className="stream-image col-sm-4">
                    <img src={item.channel.logo} alt="" />
                  </div>
                  <div className="stream-info col-sm-7">
                    <h5 className="name">{item.channel.display_name}</h5>
                    <p className="game">{item.game}</p>
                    <p className="viewers">Viewers: {item.viewers}</p>
                    <p className="description">{item.channel.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      // return (
      //   <div className="box">
      //     <Header />
      //     <SearchBar />
      //     {myStreams}
      //     <Stream
      //       stream={{
      //         image: "test",
      //         name: "test",
      //         game: "Fort",
      //         viewers: "5",
      //         description: "test"
      //       }}
      //     />
      //     <Button bsstyle="success">Test Button</Button>
      //   </div>
      // );
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
