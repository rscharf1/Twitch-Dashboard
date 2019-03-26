import React, { Component } from "react";
import "./App.css";
// import { Button } from "react-bootstrap";

import Header from "./MyHeader";
import SearchBar from "./MySearchBar";

const APIid = "2x21yf8b7p6a6z6agpbc4cdsf0cy8d";
let url = "https://api.twitch.tv/helix/streams?"; // comment out?
// var myURL = "https://api.twitch.tv/helix/streams?";
let newID = "";

// https://api.twitch.tv/helix/streams?
// https://api.twitch.tv/kraken/streams/
// https://api.twitch.tv/helix/streams?game_id=33214

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: false,
      games: [],
      search_value: "",
      moreInfo: []
    };
  }

  componentWillMount() {
    // get top games when app first loads in
    fetch("https://api.twitch.tv/helix/games/top", {
      headers: {
        "Client-Id": APIid
      }
    })
      .then(res => res.json())
      .then(response => {
        this.setState({ games: response });
        console.log("in will mount", this.state);
      });
  }

  search = e => {
    console.log("start of search");
    const newSearch = document.getElementById("game-search").value;
    console.log("Searching for", newSearch);
    if (document.getElementById("game-search").value === "Top Streams") {
      newID = "";
    } else {
      for (let i = 0; i <= 18; i++) {
        if (newSearch === this.state.games.data[i].name) {
          newID = this.state.games.data[i].id;
          console.log(newID);
          console.log("Found game id ");
        }
      }
    }
    if (newID.length > 1) {
      url = "https://api.twitch.tv/helix/streams?game_id=" + newID;
      // console.log("url: ", url);
    } else {
      url = "https://api.twitch.tv/helix/streams?";
    }
    console.log("new url", url);
    this.setState({ loading: true });
    const test_access_token = () => {
      fetch(url, {
        headers: {
          "Client-Id": APIid
        }
      })
        .then(res => res.json())
        .then(json => {
          for (let i = 0; i <= 19; i++) {
            console.log(json.data[i].game_id);
            for (let j = 0; j <= 18; j++) {
              if (json.data[i].game_id === this.state.games.data[j].id) {
                json.data[i].myGame = this.state.games.data[j].name;
              }
              if (!json.data[i].hasOwnProperty("myGame")) {
                json.data[i].myGame = "?";
              }
            }
          }
          this.setState({
            items: json.data,
            loading: false
          });
        });
    };
    test_access_token();
    this.setState({});
    console.log("end of search");
    //////////////
    // PICTURE
    let entire_data = this.state.items;
    console.log("entire_data 1", entire_data);
    for (let i = 0; i <= 18; i++) {
      let id = this.state.items[i].user_id;
      // use id to change endopint
      let endpoint = "https://api.twitch.tv/kraken/streams/" + id;
      // make/store get request
      const test_access_token = () => {
        fetch(endpoint, {
          headers: {
            "Client-Id": APIid,
            Accept: "application/vnd.twitchtv.v5+json"
          }
        })
          .then(res => res.json())
          .then(json => {
            entire_data[i].image = json.stream.channel.logo;
          });
      };
      test_access_token();
      // add data to entire_data to include additional info
      // setState for items: entire_data
    }
    console.log("entire_data 2", entire_data);
    this.setState({
      items: entire_data,
      loading: false
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    console.log(url);
    this.setState({ loading: true });
    const test_access_token = () => {
      fetch(url, {
        headers: {
          "Client-Id": APIid
        }
      })
        .then(res => res.json())
        .then(json => {
          for (let i = 0; i <= 19; i++) {
            console.log(json.data[i].game_id);
            for (let j = 0; j <= 18; j++) {
              if (json.data[i].game_id === this.state.games.data[j].id) {
                json.data[i].myGame = this.state.games.data[j].name;
              }
              if (!json.data[i].hasOwnProperty("myGame")) {
                json.data[i].myGame = "?";
              }
            }
          }
          this.setState({
            items: json.data,
            loading: false
          });
          console.log("json response: ", json);
          console.log("this.state response: ", this.state);
          console.log("Index zero name: ", this.state.items[0].user_name);
        });
    };
    test_access_token();
  }

  changeSearchValue = e => {
    const selectedGame = e.target.value;
    this.setState({ search_value: selectedGame });
    this.search();
  };

  render() {
    console.log("rendering", this.state);
    let { loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="box" id="myBox">
          <Header />
          <SearchBar change_search_value={this.changeSearchValue} />
          <div>
            {this.state.items.map((item, i) => (
              <div key={i} className="stream container">
                <div className="row">
                  <div className="stream-image col-sm-4">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="stream-info col-sm-7">
                    <h5 className="name">{item.user_name}</h5>
                    <p className="game">
                      Playing <b>{item.myGame}</b>
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
