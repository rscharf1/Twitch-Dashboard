import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

import Header from "./MyHeader";
import SearchBar from "./MySearchBar";
var APIid = "2x21yf8b7p6a6z6agpbc4cdsf0cy8d";
var url = "https://api.twitch.tv/helix/streams?game_id=33214";
var games = [
  "Fortnite",
  "Grand Theft Auto V",
  "League of Legends",
  "Just Chatting",
  "Apex Legends",
  "Dota 2",
  "Counter - Strike: Global Offensiver",
  "Tom Clancy's The Division 2",
  "Overwatch",
  "Hearthstone",
  "World of Warcraft",
  "Path of Exile",
  "Player Unknown Battlegrounds",
  "Tom Clancy's Rainbow Six: Siege",
  "Dead by Daylight",
  "Sea of Thieves",
  "Old School RuneScape",
  "Special Events",
  "Call of Duty: Black Ops 4",
  "Dungeons & Dragons"
];
var gameIds = [
  33214,
  32982,
  21779,
  509658,
  511224,
  29595,
  32399,
  504463,
  488552,
  138585,
  18122,
  29307,
  493057,
  460630,
  491487,
  490377,
  459931,
  509663,
  504462,
  509577
];

// https://api.twitch.tv/helix/streams?
// https://api.twitch.tv/kraken/streams/
// https://api.twitch.tv/helix/streams?game_id=33214

class App extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      items: [],
      loading: false
    };
  }

  onChange(event) {
    this.setState({
      input: event.target.value
    });
    console.log("testtt");
  }

  componentDidMount() {
    this.setState({ loading: true });
    const test_access_token = () => {
      fetch(url, {
        headers: {
          "Client-Id": APIid
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({
            items: json.data,
            loading: false
          });
          console.log("json response: ", json);
          console.log("this.state response: ", this.state);
          console.log("Index zero name: ", this.state.items[0].user_name);
          console.log(games[gameIds.indexOf(33214)]);

          // { games[gameIds.indexOf(item.game_id)] }
        });
    };
    test_access_token();
  }

  search(event) {
    console.log("search method");
    event.preventDefault();
    var self = this;

    var newId;
  }

  render() {
    var { loading, items } = this.state;
    var myGame = games[gameIds.indexOf(33214)];
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
                    <img src={item.language} alt="" />
                    {/* Thumbnail image */}
                  </div>
                  <div className="stream-info col-sm-7">
                    <h5 className="name">{item.user_name}</h5>
                    <p className="game">
                      Playing {games[gameIds.indexOf(item.game_id)]}
                      {/* Not working  */}
                    </p>
                    <p className="viewers">Viewers: {item.viewer_count}</p>
                    <p className="description">Description: {item.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

export default App;

// Thumbnail picture
// Playing....
// Search
// When user enters a search, a function must run to change "url" variable and then refresh the whole app
// Map entered game with game id?
