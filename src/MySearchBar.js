import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SearchBar extends Component {
  render() {
    return (
      <form id="seach-form" onSubmit={this.props.search}>
        <input
          id="game-search"
          value={this.props.input}
          onChange={this.props.onChange}
          type="text"
          placeholder="Search Game..."
        />
        <Button className="btn-sm" id="new-submit">
          Go
        </Button>
      </form>
    );
  }
}

export default SearchBar;
