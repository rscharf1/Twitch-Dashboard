import React, { Component } from "react";
import "./App.css";
import { Button } from "react-bootstrap";

import Header from "./MyHeader";
import SearchBar from "./MySearchBar";
var APIid = "2x21yf8b7p6a6z6agpbc4cdsf0cy8d";
var url = "https://api.twitch.tv/helix/streams?";
var newID = "";

// https://api.twitch.tv/helix/streams?
// https://api.twitch.tv/kraken/streams/
// https://api.twitch.tv/helix/streams?game_id=33214

class App extends Component {
  constructor(props) {
    super(props);
    this.search = this.search.bind(this);
    this.changeURL = this.changeURL.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.render = this.render.bind(this);
    this.state = {
      items: [],
      loading: false
    };
  }

  search(e) {
    // name of game has been entered
    e.preventDefault();
    console.log("running search method");
    const newSearch = document.getElementById("game-search").value;
    console.log("newSearch: ", newSearch);
    const test_access_token = () => {
      fetch("https://api.twitch.tv/helix/games/top", {
        headers: {
          "Client-Id": APIid
        }
      })
        .then(res => res.json())
        .then(response => {
          console.log("new search response: ", response);
          console.log("new search index 0", response.data[0]);
          var i = 0;
          for (i = 0; i <= 18; i++) {
            if (newSearch === response.data[i].name) {
              newID = response.data[i].id;
              console.log(newID);
              console.log("Found game id ");
            }
          }
        });
    };
    test_access_token();
    // compare newSearch with values in returned array
    console.log("end of new search");
    // changeURL(newID);
    window.setTimeout(this.changeURL, 1000);
  }

  changeURL() {
    console.log("NewID", newID);
    if (newID.length > 1) {
      url = url + "game_id=" + newID;
    }
    console.log("url: ", url);
    var element = document.getElementById("myBox");
    element.parentNode.removeChild(element);
    console.log("remove stuff");
    window.setTimeout(this.fetchData, 1000);
  }

  fetchData() {
    console.log("fetchData");
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
          this.setState({
            items: json.data,
            loading: false
          });
          console.log("new data json response: ", json);
          console.log("new data this.state response: ", this.state);
          console.log(
            "new data index zero name: ",
            this.state.items[0].user_name
          );
        });
    };
    test_access_token();
    window.setTimeout(this.render, 4000);
    console.log("trying to render again");
    this.setState({});
  }

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
    window.setTimeout(this.render, 1000);
  }

  render() {
    console.log("rendering");
    var { loading } = this.state;
    if (loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="box" id="myBox">
          <Header />
          {/* <SearchBar /> */}
          <form id="search-form" onSubmit={this.search}>
            <input
              id="game-search"
              value={this.props.input}
              onChange={this.props.onChange}
              type="text"
              placeholder="Search Game..."
            />
            <Button className="btn-sm" id="new-submit" onClick={this.search}>
              Go
            </Button>
          </form>
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
                      Playing
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
