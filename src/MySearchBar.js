import React, { Component } from "react";

class SearchBar extends Component {
  render() {
    return (
      <div>
        <select
          onChange={this.props.change_search_value}
          name="games"
          id="game-search"
        >
          <option value="Top Streams">Top Streams</option>
          <option value="Fortnite">Fortnite</option>
          <option value="Sekiro: Shadows Die Twice">
            Sekiro: Shadows Die Twice
          </option>
          <option value="League of Legends">League of Legends</option>
          <option value="Grand Theft Auto V">Grand Theft Auto V</option>
          <option value="Just Chatting">Just Chatting</option>
          <option value="PLAYERUNKNOWN'S BATTLEGROUNDS">
            PLAYERUNKNOWN'S BATTLEGROUNDS
          </option>
          <option value="Apex Legends">Apex Legends</option>
          <option value="Dota 2">Dota 2</option>
          <option value="Counter-Strike: Global Offensive">
            Counter-Strike: Global Offensive
          </option>
          <option value="Auto Chess">Auto Chess</option>
          <option value="World of Warcraft">World of Warcraft</option>
          <option value="Overwatch">Overwatch</option>
          <option value="Dead by Daylight">Dead by Daylight</option>
          <option value="Tom Clancy's The Division 2">
            Tom Clancy's The Division 2
          </option>
          <option value="Tom Clancy's Rainbow Six: Siege">
            Tom Clancy's Rainbow Six: Siege
          </option>
          <option value="Path of Exile">Path of Exile</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;
